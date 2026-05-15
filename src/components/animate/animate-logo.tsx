'use client';

import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import { keyframes } from '@mui/material';

import { varAlpha } from 'src/theme/styles';

import { useProductIdea } from 'src/app/product-idea-provider';
import { Logo } from '../logo';

// ----------------------------------------------------------------------

// CSS keyframes replace the previous framer-motion animations. Loading
// the framer-motion runtime here would put it in `app/loading.tsx`'s
// chunk — which Next.js loads for every route as the global suspense
// fallback — and that chunk is in turn pre-loaded as `<script async>`
// on the landing critical path. CSS animations run entirely off the
// main JS thread so they don't add to TBT either.

const logoPulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  20% { transform: scale(0.9); opacity: 0.48; }
  60% { transform: scale(0.9); opacity: 0.48; }
  80% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const outerOrbit = keyframes`
  0% { transform: rotate(270deg) scale(1.6); opacity: 0.25; border-radius: 25%; }
  20% { transform: rotate(0deg) scale(1); opacity: 1; border-radius: 25%; }
  40% { transform: rotate(0deg) scale(1); opacity: 1; border-radius: 50%; }
  60% { transform: rotate(0deg) scale(1); opacity: 1; border-radius: 50%; }
  80% { transform: rotate(270deg) scale(1.6); opacity: 0.25; border-radius: 25%; }
  100% { transform: rotate(270deg) scale(1.6); opacity: 0.25; border-radius: 25%; }
`;

const innerOrbit = keyframes`
  0% { transform: rotate(0deg) scale(1); opacity: 1; border-radius: 25%; }
  20% { transform: rotate(270deg) scale(1.2); opacity: 0.25; border-radius: 25%; }
  40% { transform: rotate(270deg) scale(1.2); opacity: 0.25; border-radius: 50%; }
  60% { transform: rotate(0deg) scale(1); opacity: 0.25; border-radius: 50%; }
  80% { transform: rotate(0deg) scale(1); opacity: 1; border-radius: 25%; }
  100% { transform: rotate(0deg) scale(1); opacity: 1; border-radius: 25%; }
`;

export type AnimateLogoProps = BoxProps;

export function AnimateLogo({ sx, ...other }: AnimateLogoProps) {
  const { themeColor, logo, name: productName } = useProductIdea();

  return (
    <Box
      sx={{
        width: 120,
        height: 120,
        alignItems: 'center',
        position: 'relative',
        display: 'inline-flex',
        justifyContent: 'center',
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          display: 'inline-flex',
          animation: `${logoPulse} 3s ease-in-out infinite`,
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      >
        {logo && (
          <Logo
            width={64}
            height={64}
            themeColor={themeColor}
            logo={logo}
            productName={productName}
          />
        )}
      </Box>

      <Box
        sx={{
          position: 'absolute',
          width: 'calc(100% - 20px)',
          height: 'calc(100% - 20px)',
          border: (theme) => `solid 3px ${varAlpha(theme.vars.palette.primary.darkChannel, 0.24)}`,
          animation: `${outerOrbit} 3.2s linear infinite`,
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      />

      <Box
        sx={{
          width: 1,
          height: 1,
          position: 'absolute',
          border: (theme) => `solid 8px ${varAlpha(theme.vars.palette.primary.darkChannel, 0.24)}`,
          animation: `${innerOrbit} 3.2s linear infinite`,
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      />
    </Box>
  );
}
