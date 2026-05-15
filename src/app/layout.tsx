import 'src/global.css';

// ----------------------------------------------------------------------

import type { Viewport } from 'next';

import { detectLanguage } from 'src/locales/server';

import { barlow, nunitoSans } from './fonts';
import { ClientAppShell } from './client-app-shell';
import { getRawProductIdea } from './getProductIdea';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#7A44D4',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [rawProductIdea, lang] = await Promise.all([getRawProductIdea(), detectLanguage()]);

  return (
    <html lang={lang} className={`${barlow.variable} ${nunitoSans.variable}`}>
      <head>
        {/*
          Preload the LCP hero background. The responsive variants below
          let the browser pick the small mobile-optimised version (≈5 KB)
          on phones and the desktop-quality version (≈15 KB) elsewhere
          — matching the `srcset` on `<HeroBackgroundImage />`. `href`
          is required by Safari/Firefox as the fallback.
        */}
        <link
          rel="preload"
          as="image"
          href="/assets/background/background-3.webp"
          imageSrcSet="/assets/background/background-3-mobile.webp 750w, /assets/background/background-3.webp 1440w"
          imageSizes="(max-width: 900px) 100vw, 1440px"
          type="image/webp"
          fetchPriority="high"
        />
        {/* @ts-expect-error: impact specifically requests 'value' attribute */}
        <meta name="impact-site-verification" value="264b8bdb-8b2d-424f-bec6-5c55a7306a39" />
        <meta name="fo-verify" content="f3a44355-3cf6-4dd8-a9ae-4cc39d425637" />
        <meta name="mylead-verification" content="b29df0cc12dd544d785a848089b958d2" />
      </head>
      <body>
        <ClientAppShell lang={lang} rawProductIdea={rawProductIdea}>
          {children}
        </ClientAppShell>
      </body>
    </html>
  );
}
