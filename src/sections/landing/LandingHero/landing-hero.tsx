'use client';

import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { useProductIdea } from 'src/app/product-idea-provider';
import { Buttons } from './buttons';
import { Heading } from './heading';
import { HeroDescription } from './hero-description';
import { Ratings } from './ratings';
import { DeferredHeroBackground } from './deferred-hero-background';
import { HeroBackgroundImage } from '../components/hero-background-image';
import { useScrollPercent } from './useScrollPercent';
import { useTransformY } from './useTransformY';

// ----------------------------------------------------------------------

const mdKey = 'md';
const lgKey = 'lg';

/**
 * Landing Hero — static, framer-motion-free render path.
 *
 * Previous versions used framer-motion for:
 *   - 4× `AnimatedDiv` fade-ins (Heading / HeroDescription / Ratings / Buttons)
 *   - 4× `m.div` parallax wrappers driven by `useSpring` / `useTransform`
 *   - 1× `m.div` opacity wrapper driven by scrollY
 *   - 1× `MotionContainer` (variants + stagger)
 *
 * All of that hydrated on the critical path and contributed to Total Blocking
 * Time. The fade-ins are now CSS keyframes (handled inside `AnimatedDiv`),
 * the gradient text uses a CSS keyframe, and the parallax / scroll-opacity
 * effect is dropped — it was desktop-only eye candy. The decorative
 * `HeroBackground` SVG still mounts after the browser is idle.
 */
export function LandingHero({ sx, ...other }: BoxProps) {
  const {
    heroTexts: { description, headingPart1, headingPart2 },
  } = useProductIdea();
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        [theme.breakpoints.up(mdKey)]: {
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
          [theme.breakpoints.up(mdKey)]: { minHeight: 760 },
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
            [theme.breakpoints.up(mdKey)]: {
              flex: '1 1 auto',
              justifyContent: 'center',
              py: 'var(--layout-header-desktop-height)',
            },
          }}
        >
          <Stack spacing={3} sx={{ textAlign: 'center' }}>
            <Heading lgKey={lgKey} headingPart1={headingPart1} headingPart2={headingPart2} />
            <Box sx={{ whiteSpace: 'normal' }}>
              <HeroDescription lgKey={lgKey}>{description}</HeroDescription>
            </Box>
          </Stack>
          <Ratings />
          <Buttons />
        </Container>

        <HeroBackgroundImage />
        <DeferredHeroBackground />
      </Box>
    </Box>
  );
}
