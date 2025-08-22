import { NextResponse } from 'next/server'

// Simple server-side route to validate server client isolation.
export async function GET() {
  return NextResponse.json({ ok: true, ts: Date.now() })
}
