'use client';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';

import { CONFIG } from 'src/config-global';
import { varAlpha, stylesMode } from 'src/theme/styles';

/**
 * Lightweight image layer for the hero. This uses an actual high-priority
 * image instead of a CSS background so the browser discovers the LCP resource
 * from HTML and can fetch it before the generated CSS is parsed.
 */
export function HeroBackgroundImage() {
  const theme = useTheme();

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
      <Image
        src={`${CONFIG.assetsDir}/assets/background/background-3.webp`}
        alt=""
        aria-hidden
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        style={{ objectFit: 'cover' }}
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
