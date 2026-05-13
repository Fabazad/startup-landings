'use client';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { varAlpha, stylesMode } from 'src/theme/styles';

/**
 * Gradient overlay for the hero background. Kept as a tiny client
 * component because it reads theme colours; the actual LCP image
 * (<HeroBackgroundImage/>) stays in a server component so it paints
 * without waiting for React hydration.
 */
export function HeroBackgroundGradient() {
  const theme = useTheme();
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: `linear-gradient(180deg, ${theme.vars.palette.background.default} 12%, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.92)} 50%, ${theme.vars.palette.background.default} 88%)`,
        [stylesMode.dark]: {
          background: `linear-gradient(180deg, ${theme.vars.palette.background.default} 12%, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.96)} 50%, ${theme.vars.palette.background.default} 88%)`,
        },
      }}
    />
  );
}
