import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createServerClient()
  const { data: sessionData } = await supabase.auth.getSession()
  const uid = sessionData.session?.user.id
  if (!uid) return NextResponse.json({ roles: [] })
  const { data, error } = await supabase.from('user_roles').select('role').eq('user_id', uid)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ roles: data?.map(r=> r.role) || [] })
}
