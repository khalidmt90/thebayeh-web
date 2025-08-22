import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'
import { cookies } from 'next/headers'

export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) throw new Error('Missing Supabase public env (server)')
  // Attach cookie store to support auth helpers (future enhancement)
  return createClient<Database>(url, anon, {
    auth: {
      persistSession: false,
      detectSessionInUrl: false,
      storage: { // ephemeral storage to prevent accidental persistence server-side
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {}
      }
    },
    global: { headers: { 'X-Client-Info': 'thebayeh-web/phase5' } }
  })
}

// Service role client (NEVER import in client components) – use only for privileged server actions.
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) throw new Error('Missing service role env vars')
  return createClient<Database>(url, serviceKey, { auth: { persistSession: false } })
}

export async function getServerSession() {
  // Minimal session check – uses anon client; can be replaced with supabase auth helpers
  const supabase = createServerClient()
  const { data } = await supabase.auth.getSession()
  return data.session || null
}

