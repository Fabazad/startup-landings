import { Box, Breakpoint } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { m } from 'framer-motion';
import { textGradient } from 'src/theme/styles';
import { AnimatedDiv } from './animated-div';

export const Heading = ({
  lgKey,
  headingPart1,
  headingPart2,
}: {
  lgKey: number | Breakpoint;
  headingPart1: string;
  headingPart2: string;
}) => {
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
          component={m.span}
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          sx={{
            ...textGradient(
              `300deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.warning.main} 25%, ${theme.vars.palette.primary.main} 50%, ${theme.vars.palette.warning.main} 75%, ${theme.vars.palette.primary.main} 100%`
            ),
            backgroundSize: '400%',
            ml: { xs: 0.75, md: 1, xl: 1.5 },
          }}
        >
          {headingPart2}
        </Box>
      </Box>
    </AnimatedDiv>
  );
};
