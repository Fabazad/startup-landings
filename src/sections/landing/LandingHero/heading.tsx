'use client';

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
        }}
      >
        {headingPart2}
      </Box>
    </Box>
  );
}
