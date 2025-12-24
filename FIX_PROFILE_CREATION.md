# Fix Profile Creation Error

## Problem
New users can sign up, but profile creation fails with: "Error creating profile: {}"

## Root Cause
The `user_profiles` table has Row Level Security (RLS) enabled, but is missing an INSERT policy. Users can SELECT and UPDATE their profiles, but cannot INSERT (create) them.

## Solution

### Step 1: Run the SQL Migration

1. Open your **Supabase Dashboard**
2. Go to **SQL Editor**
3. Open the file: `supabase-migrations/add-user-profiles-insert-policy.sql`
4. Copy the entire contents
5. Paste into SQL Editor
6. Click **Run**

### Step 2: Verify the Policy

After running the migration, verify the policy exists:

1. Go to **Database** → **Tables** → `user_profiles`
2. Click on **Policies** tab
3. You should see three policies:
   - ✅ Users can view own profile (SELECT)
   - ✅ Users can update own profile (UPDATE)
   - ✅ Users can insert own profile (INSERT) ← **NEW**

### Step 3: Test

1. Sign up a new user
2. Check the browser console - you should see: "ProfileScreen: Profile created successfully"
3. The profile should now be created in the database

## What the Migration Does

The SQL migration adds an INSERT policy that:
- Allows authenticated users to insert their own profile
- Ensures users can only create profiles with their own user ID
- Uses `auth.uid()::text = id::text` to match the authenticated user's ID with the profile ID

## Alternative: Manual SQL

If you prefer to run it manually, use this SQL:

```sql
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT 
  WITH CHECK (auth.uid()::text = id::text);
```

## Troubleshooting

If you still get errors after adding the policy:

1. **Check RLS is enabled:**
   ```sql
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE tablename = 'user_profiles';
   ```
   Should return `rowsecurity = true`

2. **Check policies exist:**
   ```sql
   SELECT policyname, cmd 
   FROM pg_policies 
   WHERE tablename = 'user_profiles';
   ```
   Should show SELECT, UPDATE, and INSERT policies

3. **Check user is authenticated:**
   - Make sure `auth.uid()` returns a value
   - User must be signed in when creating profile

4. **Check error logs:**
   - The updated code now logs full error details
   - Check browser console for specific error messages

