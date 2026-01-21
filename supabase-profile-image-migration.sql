-- Profile Image Migration for Sun44 App
-- Run this in your Supabase SQL Editor to enable profile picture functionality

-- Add profile_image_url column to user_profiles table
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS profile_image_url TEXT;

-- Create a storage bucket for profile images (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('profile-images', 'profile-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for users to upload their own profile images
CREATE POLICY "Users can upload own profile images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'profile-images' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create storage policy for users to update their own profile images
CREATE POLICY "Users can update own profile images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'profile-images' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create storage policy for users to delete their own profile images
CREATE POLICY "Users can delete own profile images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'profile-images' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create storage policy for public read access to profile images
CREATE POLICY "Public can view profile images" ON storage.objects
FOR SELECT USING (bucket_id = 'profile-images');

-- Add index for better query performance (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_user_profiles_image_url ON user_profiles(profile_image_url) 
WHERE profile_image_url IS NOT NULL;





