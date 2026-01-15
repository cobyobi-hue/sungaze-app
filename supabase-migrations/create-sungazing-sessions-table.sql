-- Create sungazing_sessions Table for Session Logging System
-- Run this in your Supabase SQL Editor

-- Create enum types for session_type, mood_before, and mood_after
CREATE TYPE session_type_enum AS ENUM ('sunrise', 'sunset', 'practice');
CREATE TYPE mood_enum AS ENUM ('energized', 'calm', 'tired', 'stressed', 'neutral');

-- Create sungazing_sessions table
CREATE TABLE IF NOT EXISTS sungazing_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_session_id TEXT UNIQUE, -- client-generated id for idempotent sync/retries
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_type session_type_enum NOT NULL DEFAULT 'practice',
  duration_seconds INTEGER NOT NULL,
  planned_duration_seconds INTEGER,
  completed BOOLEAN NOT NULL DEFAULT false,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  sun_altitude DECIMAL(5, 2),
  weather_conditions TEXT,
  mood_before mood_enum,
  mood_after mood_enum,
  notes TEXT,
  techniques_used JSONB DEFAULT '[]',
  session_time TEXT, -- Format: "HH:MM" - when session started
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_sungazing_sessions_user_id ON sungazing_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sungazing_sessions_session_date ON sungazing_sessions(session_date);
CREATE INDEX IF NOT EXISTS idx_sungazing_sessions_user_date ON sungazing_sessions(user_id, session_date DESC);
CREATE INDEX IF NOT EXISTS idx_sungazing_sessions_session_type ON sungazing_sessions(session_type);
CREATE INDEX IF NOT EXISTS idx_sungazing_sessions_completed ON sungazing_sessions(completed);
CREATE INDEX IF NOT EXISTS idx_sungazing_sessions_client_session_id ON sungazing_sessions(client_session_id);

-- Create GIN index for JSONB techniques_used
CREATE INDEX IF NOT EXISTS idx_sungazing_sessions_techniques ON sungazing_sessions USING GIN (techniques_used);

-- Enable Row Level Security
ALTER TABLE sungazing_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can view their own sessions
CREATE POLICY "Users can view own sessions" ON sungazing_sessions
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own sessions
CREATE POLICY "Users can insert own sessions" ON sungazing_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own sessions
CREATE POLICY "Users can update own sessions" ON sungazing_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own sessions
CREATE POLICY "Users can delete own sessions" ON sungazing_sessions
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_sungazing_sessions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_sungazing_sessions_updated_at ON sungazing_sessions;
CREATE TRIGGER update_sungazing_sessions_updated_at
  BEFORE UPDATE ON sungazing_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_sungazing_sessions_updated_at();

-- Add comments for documentation
COMMENT ON TABLE sungazing_sessions IS 'Stores user sungazing session logs with detailed tracking information';
COMMENT ON COLUMN sungazing_sessions.session_type IS 'Type of session: sunrise, sunset, or practice';
COMMENT ON COLUMN sungazing_sessions.duration_seconds IS 'Actual session duration in seconds';
COMMENT ON COLUMN sungazing_sessions.planned_duration_seconds IS 'Intended session duration in seconds';
COMMENT ON COLUMN sungazing_sessions.completed IS 'Whether the user completed the full planned session';
COMMENT ON COLUMN sungazing_sessions.techniques_used IS 'JSONB array of techniques used (breathing, mantras, etc.)';
COMMENT ON COLUMN sungazing_sessions.session_time IS 'Time when session started (HH:MM format)';
COMMENT ON COLUMN sungazing_sessions.client_session_id IS 'Client-generated id for idempotent sync and retry without duplicates';

