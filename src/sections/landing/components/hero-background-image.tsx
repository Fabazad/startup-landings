'use client';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { CONFIG } from 'src/config-global';
import { varAlpha, stylesMode } from 'src/theme/styles';

/**
 * Hero background layer. Uses a plain <img> (not next/image) so the asset URL
 * matches the explicit <link rel="preload"> declared in the root layout head,
 * letting the browser fetch the LCP resource the moment HTML parsing reaches
 * it — without waiting for React hydration or the Next/Image optimization
 * route.
 */
export function HeroBackgroundImage() {
  const theme = useTheme();
  const src = `${CONFIG.assetsDir}/assets/background/background-3.webp`;

  return (
    <Box
      aria-hidden
      sx={{
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        zIndex: -1,
        position: 'absolute',
        overflow: 'hidden',
        [stylesMode.dark]: {
          backgroundImage: `url('${CONFIG.assetsDir}/assets/background/background-3-blur.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        },
      }}
    >
      <Box
        component="img"
        src={src}
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
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${theme.vars.palette.background.default} 12%, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.92)} 50%, ${theme.vars.palette.background.default} 88%)`,
          [stylesMode.dark]: {
            background: `linear-gradient(180deg, ${theme.vars.palette.background.default} 12%, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.96)} 50%, ${theme.vars.palette.background.default} 88%)`,
          },
        }}
      />
    </Box>
  );
}
