import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { Buttons } from './buttons';
import { Heading } from './heading';
import { HeroDescription } from './hero-description';
import { Ratings } from './ratings';
import { DeferredHeroBackground } from './deferred-hero-background';
import { HeroBackgroundImage } from '../components/hero-background-image';
import { HeroBackgroundGradient } from '../components/hero-background-gradient';

/**
 * Landing Hero — server component. All theme-dependent values are
 * expressed as CSS custom properties (set by MUI's CssVarsProvider)
 * or inline CSS, so no client hydration is required for the hero
 * structure, heading, description, or LCP image. Only the interactive
 * sub-components (Buttons, Ratings, DeferredHeroBackground) are
 * client-boundary leaf nodes.
 */
export function LandingHero({
  headingPart1,
  headingPart2,
  description,
  hasPlans,
  ratingsText = '',
  sx,
  ...other
}: BoxProps & {
  headingPart1: string;
  headingPart2: string;
  description: string;
  hasPlans: boolean;
  ratingsText?: string;
}) {
  return (
    <Box
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        '@media (min-width: 900px)': {
          minHeight: 760,
          maxHeight: 1440,
          display: 'block',
          mt: 'calc(var(--layout-header-desktop-height) * -1)',
        },
        ...sx,
      }}
      {...other}
      id="home"
    >
      <Box
        sx={{
          width: 1,
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          '@media (min-width: 900px)': { minHeight: 760 },
        }}
      >
        <Container
          sx={{
            py: 15,
            gap: 5,
            zIndex: 9,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            '@media (min-width: 900px)': {
              flex: '1 1 auto',
              justifyContent: 'center',
              py: 'var(--layout-header-desktop-height)',
            },
          }}
        >
          <Stack spacing={3} sx={{ textAlign: 'center' }}>
            <Heading headingPart1={headingPart1} headingPart2={headingPart2} />
            <Box sx={{ whiteSpace: 'normal' }}>
              <HeroDescription>{description}</HeroDescription>
            </Box>
          </Stack>
          <Ratings ratingsText={ratingsText} />
          <Buttons hasPlans={hasPlans} />
        </Container>

        <HeroBackgroundImage />
        <HeroBackgroundGradient />
        <DeferredHeroBackground />
      </Box>
    </Box>
  );
}
