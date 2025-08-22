import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

// Simple server-side route to validate server client isolation.
export async function GET() {
  const supabase = createServiceClient()
  const { data: now } = await supabase.rpc('now') // optional if a "now" RPC exists; else will just error silently in Phase 0
  return NextResponse.json({ ok: true, now: now ?? null })
}
