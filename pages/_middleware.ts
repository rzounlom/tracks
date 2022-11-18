// this middleware with fire any route specified: NOTE not in a NODE environment. More like a webworker. Browser/db/server not available in the EDGE function env
// avoids using resources from server

import { NextResponse } from 'next/server'

// create array of routes to protext
const signinPages = ['/', '/playlist', '/library']

export default function middleware(req) {
  if (signinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN

    if (!token) {
      return NextResponse.redirect('/signin')
    }
  }
}
