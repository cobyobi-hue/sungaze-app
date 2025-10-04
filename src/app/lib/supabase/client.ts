import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Debug log to see what's being read
  console.log('Supabase Config Check:', {
    url: supabaseUrl,
    anonKeyPrefix: supabaseAnonKey?.substring(0, 20) + '...',
    hasUrl: !!supabaseUrl,
    hasAnonKey: !!supabaseAnonKey,
    isPlaceholderUrl: supabaseUrl === 'your_supabase_project_url',
    isPlaceholderKey: supabaseAnonKey === 'your_supabase_anon_key'
  })

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_project_url' || supabaseAnonKey === 'your_supabase_anon_key') {
    console.warn('Supabase environment variables not configured. Using mock data mode.')
    return null
  }

  console.log('Supabase client created successfully')

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
