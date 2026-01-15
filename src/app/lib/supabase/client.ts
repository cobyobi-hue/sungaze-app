import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your_supabase_project_url' || supabaseAnonKey === 'your_supabase_anon_key') {
    console.warn('Supabase environment variables not configured. Using mock data mode.')
    return null
  }

  // Keep a stable singleton in the browser so auth persists cleanly.
  const hasWindow = typeof window !== 'undefined'
  const w = hasWindow ? (window as any) : null
  if (w?.__sun44_supabase) return w.__sun44_supabase as SupabaseClient

  const client = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })

  if (w) w.__sun44_supabase = client
  return client
}
