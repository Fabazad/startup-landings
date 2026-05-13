import Box from '@mui/material/Box';

import { CONFIG } from 'src/config-global';

/**
 * LCP hero background image. Server-component-safe — no hooks.
 *
 * Uses a plain <img> (not next/image) so the asset URL matches the
 * HTTP Link-header preload (set in next.config.mjs) and the
 * <link rel="preload"> in the root layout head. The browser can
 * start fetching the LCP resource the moment it sees the Link header
 * (at TTFB), well before React hydration begins.
 */
export function HeroBackgroundImage() {
  return (
    <Box
      component="img"
      src={`${CONFIG.assetsDir}/assets/background/background-3.webp`}
      alt=""
      aria-hidden
      fetchPriority="high"
      decoding="async"
      sx={{
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
