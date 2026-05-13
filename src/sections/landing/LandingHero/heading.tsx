'use client';

import { useEffect, useState } from 'react';
import { Box, Breakpoint, keyframes } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';

import { textGradient } from 'src/theme/styles';

/**
 * Hero heading. The gradient shift animation was removed because
 * `background-position-x` is not composited in Chrome and caused
 * unnecessary rendering work. The static gradient is already visually
 * striking and the 40-second animation was barely noticeable.
 */
export function Heading({
  headingPart1,
  headingPart2,
}: {
  headingPart1: string;
  headingPart2: string;
}) {
  const theme = useTheme();

  // Defer the gradient animation until after first paint. Running it from
  // the initial render keeps the LCP element "unstable" in Lighthouse, which
  // pushes the LCP timing out to seconds beyond the actual visible paint.
  // Starting the animation post-load lets the static gradient act as a stable
  // LCP, then layers in the motion for users who linger.
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const start = () => setAnimate(true);
    if (document.readyState === 'complete') {
      const ric: any = (window as any).requestIdleCallback;
      if (typeof ric === 'function') {
        const id = ric(start, { timeout: 1000 });
        return () => (window as any).cancelIdleCallback?.(id);
      }
      const t = window.setTimeout(start, 250);
      return () => window.clearTimeout(t);
    }
    window.addEventListener('load', start, { once: true });
    return () => window.removeEventListener('load', start);
  }, []);

  return (
    <Box
      component="h1"
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      sx={{
        fontWeight: 800,
        lineHeight: 1.333,
        fontSize: { xs: 32, sm: 40, md: 44, lg: 48 },
        fontFamily: 'var(--font-secondary)',
        my: 0,
        mx: 'auto',
        maxWidth: 1000,
        '@media (min-width: 1200px)': { fontSize: 72, lineHeight: '90px' },
      }}
    >
      <Box component="span" sx={{ width: 1, opacity: 1 }}>
        {headingPart1}
      </Box>

      <Box
        component="span"
        sx={{
          ...textGradient(
            `300deg, var(--palette-primary-main) 0%, var(--palette-warning-main) 25%, var(--palette-primary-main) 50%, var(--palette-warning-main) 75%, var(--palette-primary-main) 100%`
          ),
          backgroundSize: '400%',
          ml: { xs: 0.75, md: 1, xl: 1.5 },
          ...(animate && {
            animation: `${gradientShift} 40s linear infinite alternate`,
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }),
        }}
      >
        {headingPart2}
      </Box>
    </Box>
  );
}
