'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { PageNotFoundIllustration } from 'src/assets/illustrations';

// ----------------------------------------------------------------------

// Plain CSS keyframes replace the previous framer-motion `varBounce`
// animation. The 404 view is wired into Next.js' root `not-found.tsx`,
// so any framer-motion import here ends up in the manifest of every
// route — including the landing page — which would defeat the lazy
// loading of motion.lazy on the critical path.
const bounceIn = keyframes`
  0% { opacity: 0; transform: scale(0.3); }
  20% { transform: scale(1.1); }
  40% { transform: scale(0.9); }
  60% { opacity: 1; transform: scale(1.03); }
  80% { transform: scale(0.97); }
  100% { opacity: 1; transform: scale(1); }
`;

const animationSx = {
  animation: `${bounceIn} 720ms cubic-bezier(0.215, 0.61, 0.355, 1) both`,
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
};

export function NotFoundView() {
  return (
    <Container>
      <Box sx={animationSx}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Sorry, page not found!
        </Typography>
      </Box>

      <Box sx={animationSx}>
        <Typography sx={{ color: 'text.secondary' }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
          sure to check your spelling.
        </Typography>
      </Box>

      <Box sx={animationSx}>
        <PageNotFoundIllustration sx={{ my: { xs: 5, sm: 10 } }} />
      </Box>

      <Button component={RouterLink} href="/" size="large" variant="contained">
        Go to home
      </Button>
    </Container>
  );
}
