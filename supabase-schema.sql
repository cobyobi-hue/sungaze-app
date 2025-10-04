-- Sun44 App Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  tier TEXT NOT NULL DEFAULT 'free',
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

-- Create founder_slots table
CREATE TABLE IF NOT EXISTS founder_slots (
  id SERIAL PRIMARY KEY,
  sold INTEGER DEFAULT 0,
  remaining INTEGER DEFAULT 444,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial founder slots data (if not exists)
INSERT INTO founder_slots (sold, remaining) 
SELECT 37, 407
WHERE NOT EXISTS (SELECT 1 FROM founder_slots);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Create a function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_tier ON user_profiles(tier);
CREATE INDEX IF NOT EXISTS idx_user_profiles_stripe_customer ON user_profiles(stripe_customer_id);

-- Create meditations table for guided audio tracks
CREATE TABLE IF NOT EXISTS meditations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  duration_sec INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  is_premium BOOLEAN DEFAULT false,
  category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert the 6 meditation tracks
INSERT INTO meditations (id, title, duration_sec, storage_path, is_premium, category, description) VALUES
        ('sunrise_5', 'Sunrise Meditation - 5 Minutes', 300, 'Voice Audio/sunrise_5.m4a', false, 'sunrise', 'Gentle guided meditation for morning sungazing practice'),
        ('sunrise_10', 'Sunrise Meditation - 10 Minutes', 600, 'Voice Audio/sunrise_10.m4a', true, 'sunrise', 'Extended morning sungazing meditation'),
        ('sunset_5', 'Sunset Meditation - 5 Minutes', 300, 'Voice Audio/sunset_5.m4a', false, 'sunset', 'Calming guided meditation for evening sungazing practice'),
        ('sunset_10', 'Sunset Meditation - 10 Minutes', 600, 'Voice Audio/sunset_10.m4a', true, 'sunset', 'Extended evening sungazing meditation'),
        ('candle_10', 'Candle Gazing - 10 Minutes', 600, 'Voice Audio/candle_10.m4a', true, 'trataka', 'Focused candle gazing practice for concentration'),
        ('breath_5', 'Breathwork - 5 Minutes', 300, 'Voice Audio/breath_5.m4a', true, 'pranayama', 'Guided breathing exercises for energy and clarity')
ON CONFLICT (id) DO NOTHING;

-- Create index for meditations
CREATE INDEX IF NOT EXISTS idx_meditations_category ON meditations(category);
CREATE INDEX IF NOT EXISTS idx_meditations_premium ON meditations(is_premium);

-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public) VALUES ('Voice Audio', 'Voice Audio', false);

-- Create storage policy for audio files
CREATE POLICY "Allow public read access to audio files" ON storage.objects
FOR SELECT USING (
  bucket_id = 'Voice Audio' 
  AND (storage.extension(name) = 'm4a' OR storage.extension(name) = 'mp3')
);

