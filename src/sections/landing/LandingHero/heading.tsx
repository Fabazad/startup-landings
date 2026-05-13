import { Box, Breakpoint, keyframes } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { textGradient } from 'src/theme/styles';
import { AnimatedDiv } from './animated-div';

const gradientShift = keyframes`
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
`;

export function Heading({
  lgKey,
  headingPart1,
  headingPart2,
}: {
  lgKey: number | Breakpoint;
  headingPart1: string;
  headingPart2: string;
}) {
  const theme = useTheme();
  return (
    <AnimatedDiv>
      <Box
        component="h1"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        sx={{
          ...theme.typography.h2,
          my: 0,
          mx: 'auto',
          maxWidth: 1000,
          fontFamily: theme.typography.fontSecondaryFamily,
          [theme.breakpoints.up(lgKey)]: { fontSize: 72, lineHeight: '90px' },
        }}
      >
        <Box component="span" sx={{ width: 1, opacity: 1 }}>
          {headingPart1}
        </Box>

        <Box
          component="span"
          sx={{
            ...textGradient(
              `300deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.warning.main} 25%, ${theme.vars.palette.primary.main} 50%, ${theme.vars.palette.warning.main} 75%, ${theme.vars.palette.primary.main} 100%`
            ),
            backgroundSize: '400%',
            ml: { xs: 0.75, md: 1, xl: 1.5 },
            animation: `${gradientShift} 40s linear infinite alternate`,
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        >
          {headingPart2}
        </Box>
      </Box>
    </AnimatedDiv>
  );
}
