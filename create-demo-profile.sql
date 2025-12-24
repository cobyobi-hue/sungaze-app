-- Create demo user profile
-- Copy the UID from your Supabase dashboard for the demo@sungaze.app user
-- Replace 'e175d164-ea50-4f57-b39c-a1bef8e085e9' with the actual UID from your dashboard

INSERT INTO user_profiles (
  id,
  email,
  tier,
  badges,
  seals,
  created_at,
  updated_at,
  subscription_status
) VALUES (
  'e175d164-ea50-4f57-b39c-a1bef8e085e9',  -- Replace with actual UID
  'demo@sungaze.app',
  'premium',  -- Give demo account premium access
  ARRAY['Founder', 'Solar Veteran'],  -- Give demo account cool badges
  ARRAY[],
  NOW(),
  NOW(),
  'active'
) ON CONFLICT (id) DO UPDATE SET
  tier = 'premium',
  badges = ARRAY['Founder', 'Solar Veteran'],
  updated_at = NOW();

















