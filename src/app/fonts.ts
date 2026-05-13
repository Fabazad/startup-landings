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
});
