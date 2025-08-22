import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

// Dynamic settings fetch
export async function GET(_: Request, { params }: { params: { key: string } }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({ setting: null })
  }
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from('app_settings').select('key,value,description').eq('key', params.key).maybeSingle()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ setting: data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
