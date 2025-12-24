# Profile Creation Error Fix

## Problem
Error: "Error creating profile: {}" in ProfileScreen.tsx line 122

## Root Causes Identified

### 1. **Missing INSERT RLS Policy** (PRIMARY ISSUE)
The database schema only has SELECT and UPDATE policies, but **NO INSERT policy**. This means Row Level Security (RLS) is blocking profile creation.

**Current policies in schema:**
- ✅ SELECT policy: Users can view own profile
- ✅ UPDATE policy: Users can update own profile  
- ❌ **INSERT policy: MISSING** - Users cannot insert their own profile

### 2. **Insufficient Error Logging**
The error object was being logged as `{}` because:
- Error details weren't being extracted properly
- No specific error code checking
- No handling for different error types

### 3. **Missing Required Fields**
The insert was missing some optional but recommended fields that might cause issues:
- `founder_number: null`
- `founder_region: null`
- `stripe_customer_id: null`
- `subscription_id: null`

## Database Schema

From `supabase-schema.sql`:

```sql
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,           -- REQUIRED
  tier TEXT NOT NULL DEFAULT 'free',    -- REQUIRED (has default)
  founder_number INTEGER,
  founder_region TEXT,
  badges TEXT[] DEFAULT '{}',
  seals TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  purchase_date TIMESTAMPTZ,
  expiration_date TIMESTAMPTZ,
  subscription_status TEXT DEFAULT 'active',
  stripe_customer_id TEXT,
  subscription_id TEXT
);

-- RLS Policies (MISSING INSERT!)
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid()::text = id::text);

-- ❌ NO INSERT POLICY!
```

## Fixed Code

The profile creation in `ProfileScreen.tsx` now includes:
1. ✅ Enhanced error logging with full error details
2. ✅ Specific error code checking (permissions, duplicates)
3. ✅ All required and optional fields included
4. ✅ Proper snake_case field names for database
5. ✅ Fallback handling for duplicate errors
6. ✅ Email validation before insert

## Required Database Fix

**You MUST add this INSERT policy to your Supabase database:**

```sql
-- Add INSERT policy for user_profiles
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT 
  WITH CHECK (auth.uid()::text = id::text);
```

**To apply:**
1. Go to Supabase Dashboard → SQL Editor
2. Run the above SQL command
3. This will allow users to create their own profiles

## What Was Causing the Error

1. **RLS Blocking Insert**: Without an INSERT policy, Supabase RLS was silently blocking the insert operation
2. **Empty Error Object**: The error wasn't being properly logged, showing as `{}`
3. **No Error Handling**: The code didn't check for specific error types (permissions, duplicates, etc.)

## Testing

After adding the INSERT policy:
1. Sign up a new user
2. Check console logs for detailed error information
3. Profile should be created successfully
4. If duplicate error occurs, code will now fetch existing profile

