import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookieName, fallbackLng, languages } from './locales/config-locales';
import type { LanguageValue } from './locales/config-locales';

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const langParam = searchParams.get('lang');
  const langCookie = request.cookies.get(cookieName)?.value;
  const acceptLang = request.headers.get('accept-language')?.split(',')?.[0]?.split('-')?.[0];

  // Priority: 1. query param, 2. cookie, 3. accept-language, 4. fallback
  const isLang = (v: string | null | undefined): v is LanguageValue =>
    languages.includes(v as LanguageValue);

  let resolvedLang: LanguageValue = fallbackLng;
  if (isLang(langParam)) resolvedLang = langParam;
  else if (isLang(langCookie)) resolvedLang = langCookie;
  else if (isLang(acceptLang)) resolvedLang = acceptLang;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-lang', resolvedLang);

  // If a ?lang= param was explicitly passed, set the cookie AND redirect
  // to the clean URL so the query param doesn't linger in the address bar.
  if (langParam) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete('lang');

    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(cookieName, resolvedLang, {
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

// Only run on page routes, not on assets/api
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo|assets).*)'],
};
