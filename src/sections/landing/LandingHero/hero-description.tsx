import Typography from '@mui/material/Typography';

import { AnimatedDiv } from './animated-div';

/**
 * Server-component-safe hero description.
 *
 * Inline CSS media query replaces the previous `useTheme().breakpoints`
 * call, removing this component from the hydration critical path.
 */
export function HeroDescription({ children }: { children: React.ReactNode }) {
  return (
    <AnimatedDiv>
      <Typography
        variant="body2"
        sx={{
          mx: 'auto',
          whiteSpace: 'pre-line',
          '@media (min-width: 1200px)': { fontSize: 20, lineHeight: '36px' },
        }}
      >
        {children}
      </Typography>
    </AnimatedDiv>
  );
}
