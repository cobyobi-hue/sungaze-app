-- Migration: Add INSERT policy for user_profiles table
-- Date: 2025-01-XX
-- Description: Allows users to insert their own profile records
-- 
-- This fixes the "Error creating profile: {}" issue where new users
-- couldn't create profiles due to missing Row Level Security (RLS) INSERT policy.
--
-- To apply:
-- 1. Go to Supabase Dashboard → SQL Editor
-- 2. Copy and paste this entire file
-- 3. Click "Run" to execute

-- Drop the policy if it already exists (idempotent)
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;

-- Create INSERT policy for user_profiles
-- This allows authenticated users to insert their own profile
-- The policy checks that the user's auth.uid() matches the profile id
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT 
  WITH CHECK (auth.uid()::text = id::text);

-- Verify the policy was created
-- You can check this in Supabase Dashboard → Authentication → Policies
-- You should now see three policies:
-- 1. Users can view own profile (SELECT)
-- 2. Users can update own profile (UPDATE)
-- 3. Users can insert own profile (INSERT) ← NEW

