import { Barlow, Nunito_Sans } from 'next/font/google';

export const barlow = Barlow({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-secondary',
  preload: true,
});

export const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-primary',
  preload: true,
  // Next.js 14 lacks built-in metric overrides for Nunito Sans, which prints
  // a build-time warning. Disable the auto-fallback metrics; `display: swap`
  // already keeps text visible during the font load.
  adjustFontFallback: false,
});
