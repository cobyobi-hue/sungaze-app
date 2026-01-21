-- Add Settings Columns to user_profiles Table
-- Run this in your Supabase SQL Editor to enable persistent settings storage

-- Add notification_settings column (JSONB) to store notification preferences
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS notification_settings JSONB DEFAULT '{}';

-- Add permission_settings column (JSONB) to store permission preferences
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS permission_settings JSONB DEFAULT '{}';

-- Add account_settings column (JSONB) to store account information
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS account_settings JSONB DEFAULT '{}';

-- Create indexes for better query performance (GIN indexes for JSONB)
CREATE INDEX IF NOT EXISTS idx_user_profiles_notification_settings 
ON user_profiles USING GIN (notification_settings);

CREATE INDEX IF NOT EXISTS idx_user_profiles_permission_settings 
ON user_profiles USING GIN (permission_settings);

CREATE INDEX IF NOT EXISTS idx_user_profiles_account_settings 
ON user_profiles USING GIN (account_settings);

-- Add comment for documentation
COMMENT ON COLUMN user_profiles.notification_settings IS 'Stores user notification preferences (push, email, SMS settings)';
COMMENT ON COLUMN user_profiles.permission_settings IS 'Stores user permission preferences and status';
COMMENT ON COLUMN user_profiles.account_settings IS 'Stores user account information (name, username, phone, place, aboutMe, birthday)';




