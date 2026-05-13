import 'src/global.css';

// ----------------------------------------------------------------------

import type { Viewport } from 'next';

import { barlow, nunitoSans } from './fonts';
import { ClientAppShell } from './client-app-shell';

/**
 * Root layout — now fully static. All dynamic providers (i18n, theme,
 * product-idea context, analytics) live inside `ClientAppShell` so this
 * layout never calls `headers()` or `cookies()`. The response avoids
 * `Cache-Control: no-store`, enabling back/forward cache (bfcache) and
 * ISR caching.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#7A44D4',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${barlow.variable} ${nunitoSans.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/assets/background/background-3.webp"
          type="image/webp"
          fetchPriority="high"
        />
        {rawProductIdea?.name === PRODUCT_IDEA_NAMES.ENVY && (
          <>
            {/* @ts-expect-error: impact specifically requests 'value' attribute */}
            <meta name="impact-site-verification" value="264b8bdb-8b2d-424f-bec6-5c55a7306a39" />
            <meta name="fo-verify" content="f3a44355-3cf6-4dd8-a9ae-4cc39d425637" />
            <meta name="mylead-verification" content="b29df0cc12dd544d785a848089b958d2" />
          </>
        )}
      </head>
      <body>
        <ClientAppShell>{children}</ClientAppShell>
      </body>
    </html>
  );
}
