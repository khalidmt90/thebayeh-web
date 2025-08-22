import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({ breeds: [] })
  }
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from('breeds').select('id,name').limit(5)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ breeds: data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
