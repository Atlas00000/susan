import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Cache static assets aggressively
  const url = req.nextUrl
  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/_next/image') || url.pathname.startsWith('/images/')) {
    res.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  return res
}

export const config = {
  matcher: [
    '/_next/static/:path*',
    '/_next/image',
    '/images/:path*',
  ],
}


