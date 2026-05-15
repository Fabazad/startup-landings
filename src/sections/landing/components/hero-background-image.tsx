import { CONFIG } from 'src/config-global';

/**
 * LCP hero background image. Server-component-safe — no hooks.
 *
 * Uses a plain <img> (not next/image or MUI Box) so the asset URLs match
 * the HTTP Link-header preload (set in next.config.mjs) and the
 * `<link rel="preload">` tags in the root layout head. The browser can
 * start fetching the LCP resource the moment it sees the Link header
 * (at TTFB), well before React hydration begins.
 *
 * `srcset` + `sizes` lets the browser pick the small mobile-optimised
 * variant (≈5 KB) on phones rather than the desktop-quality version
 * (≈15 KB), which is the dominant LCP cost under simulated mobile
 * 4G throttling.
 *
 * Inline styles avoid MUI Box overhead and ensure `fetchpriority` is
 * correctly forwarded to the DOM — MUI's styled() wrapper can strip
 * non-standard HTML attributes in some configurations.
 */
export function HeroBackgroundImage() {
  const desktopSrc = `${CONFIG.assetsDir}/assets/background/background-3.webp`;
  const mobileSrc = `${CONFIG.assetsDir}/assets/background/background-3-mobile.webp`;

  return (
    <img
      src={desktopSrc}
      srcSet={`${mobileSrc} 750w, ${desktopSrc} 1440w`}
      sizes="(max-width: 900px) 100vw, 1440px"
      alt=""
      aria-hidden
      fetchPriority="high"
      decoding="async"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
      }}
    />
  );
}
