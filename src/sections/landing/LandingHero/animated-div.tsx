'use client';

import { Box, BoxProps, keyframes } from '@mui/material';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translate3d(0, 24px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
`;

/**
 * Lightweight CSS-driven replacement for the framer-motion fade-in used
 * across the hero. Each hero AnimatedDiv previously hydrated a framer-motion
 * component with variants — multiplied by 4 (Heading, HeroDescription,
 * Ratings, Buttons) that work happened during the Total Blocking Time
 * window. A CSS animation runs entirely off the main JS thread.
 */
export function AnimatedDiv({ children, sx, ...other }: BoxProps & { children: React.ReactNode }) {
  return (
    <Box
      {...other}
      sx={{
        animation: `${fadeInUp} 640ms cubic-bezier(0.43, 0.13, 0.23, 0.96) both`,
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
