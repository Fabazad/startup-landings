'use client';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { CONFIG } from 'src/config-global';
import { varAlpha, stylesMode } from 'src/theme/styles';

/**
 * Lightweight background image layer for the hero. Rendered on the server so
 * the preloaded `background-3.webp` paints into the viewport as soon as it
 * arrives, instead of waiting for the deferred SVG decoration to mount.
 * Improves Speed Index by filling visible viewport content earlier.
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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `linear-gradient(180deg, ${theme.vars.palette.background.default} 12%, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.92)} 50%, ${theme.vars.palette.background.default} 88%), url('${CONFIG.assetsDir}/assets/background/background-3.webp')`,
        [stylesMode.dark]: {
          backgroundImage: `url('${CONFIG.assetsDir}/assets/images/home/hero-blur.webp'), linear-gradient(180deg, ${theme.vars.palette.background.default} 12%, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.96)} 50%, ${theme.vars.palette.background.default} 88%), url('${CONFIG.assetsDir}/assets/background/background-3.webp')`,
        },
      }}
    />
  );
}
