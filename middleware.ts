import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Phase 6 middleware scaffold: no-op role guard (placeholder for future admin gating)
export function middleware(req: NextRequest) {
  // Example future path guard:
  // if (req.nextUrl.pathname.startsWith('/admin')) { /* check role cookie / token */ }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
