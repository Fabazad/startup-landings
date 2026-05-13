import { Box, BoxProps, keyframes } from '@mui/material';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
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
        animation: `${fadeIn} 400ms ease-out both`,
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
