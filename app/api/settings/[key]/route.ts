import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

// Dynamic settings fetch
export async function GET(_: Request, { params }: { params: { key: string } }) {
  const supabase = createServerClient()
  const { data, error } = await supabase.from('app_settings').select('key,value,description').eq('key', params.key).maybeSingle()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ setting: data })
}
