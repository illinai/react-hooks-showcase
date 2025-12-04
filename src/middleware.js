import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  // Add a visit timestamp to the response
  const visitTime = new Date().toLocaleString();
  response.cookies.set('lastVisit', visitTime);
  
  // Log which hook page was visited
  const path = request.nextUrl.pathname;
  if (path.startsWith('/use-')) {
    const hookName = path.replace('/use-', '').replace('-', '');
    console.log(`✅ User visited: ${hookName} hook at ${visitTime}`);
  }
  
  return response;
}

export const config = {
  matcher: [
    '/use-state',
    '/use-effect',
    '/use-ref',
    '/use-context',
    '/use-reducer',
    '/use-memo',
    '/use-callback',
  ],
};