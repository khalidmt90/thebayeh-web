import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Singleton pattern (module scope) to avoid re-instantiation on RSC boundaries.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!url || !anon) {
  // Log once in dev (silent in production)
  if (process.env.NODE_ENV !== 'production') console.warn('Supabase env vars missing (browser).')
}

export const supabaseBrowser = createClient<Database>(
  url || 'http://localhost',
  anon || 'anon-key',
  { auth: { persistSession: true, detectSessionInUrl: true } }
)

