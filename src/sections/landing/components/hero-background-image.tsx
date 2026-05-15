import { CONFIG } from 'src/config-global';

/**
 * LCP hero background image. Server-component-safe — no hooks.
 *
 * Uses a plain <img> (not next/image or MUI Box) so the asset URL matches
 * the HTTP Link-header preload (set in next.config.mjs) and the
 * <link rel="preload"> in the root layout head. The browser can
 * start fetching the LCP resource the moment it sees the Link header
 * (at TTFB), well before React hydration begins.
 *
 * Inline styles avoid MUI Box overhead and ensure `fetchpriority` is
 * correctly forwarded to the DOM — MUI's styled() wrapper can strip
 * non-standard HTML attributes in some configurations.
 */
export function HeroBackgroundImage() {
  return (
    <img
      src={`${CONFIG.assetsDir}/assets/background/background-3.webp`}
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
