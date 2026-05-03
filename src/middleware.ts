import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookieName, languages } from './locales/config-locales';

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const langParam = searchParams.get('lang');

  // If lang param is present and valid
  if (langParam && languages.includes(langParam as any)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-lang', langParam);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // Set the cookie so the server-side detectLanguage() can pick it up for future requests
    response.cookies.set(cookieName, langParam, {
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  }

  return NextResponse.next();
}

// Only run on page routes, not on assets/api
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo|assets).*)'],
};
