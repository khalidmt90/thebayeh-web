import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const runtime = 'edge'

export async function GET() {
  const supabase = createServerClient()
  const { data, error } = await supabase.from('side_dishes').select('id,name,price,active,order_index').order('order_index', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ side_dishes: data })
}
