'use client';

import Box from '@mui/material/Box';
import { keyframes } from '@mui/material';

import { textGradient } from 'src/theme/styles';

const gradientSlide = keyframes`
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
`;

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
          animation: `${gradientSlide} 20s linear infinite alternate`,
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          ml: { xs: 0.75, md: 1, xl: 1.5 },
        }}
      >
        {headingPart2}
      </Box>
    </Box>
  );
}
