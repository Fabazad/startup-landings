'use client';

import type { BoxProps } from '@mui/material/Box';

import { m, useTransform } from 'framer-motion';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';
import { MotionContainer } from 'src/components/animate';
import { useProductIdea } from 'src/app/product-idea-provider';
import { Buttons } from './buttons';
import { Heading } from './heading';
import { HeroDescription } from './hero-description';
import { Ratings } from './ratings';
import { DeferredHeroBackground } from './deferred-hero-background';
import { useScrollPercent } from './useScrollPercent';
import { useTransformY } from './useTransformY';

// ----------------------------------------------------------------------

const mdKey = 'md';
const lgKey = 'lg';

export function LandingHero({ sx, ...other }: BoxProps) {
  const {
    heroTexts: { description, headingPart1, headingPart2 },
  } = useProductIdea();
  const theme = useTheme();

  const mdUp = useResponsive('up', mdKey);

  const scroll = useScrollPercent();

  // Parallax (per 1% of scroll progress). On mobile we zero it out so the
  // spring animations stay inert and don't burn frames during scroll.
  const factor = mdUp ? 1 : 0;
  const y1 = useTransformY(scroll.scrollY, scroll.percent, -7 * factor);
  const y2 = useTransformY(scroll.scrollY, scroll.percent, -6 * factor);
  const y3 = useTransformY(scroll.scrollY, scroll.percent, -5 * factor);
  const y4 = useTransformY(scroll.scrollY, scroll.percent, -4 * factor);

  const opacity = useTransform(scroll.percent, (p) => (mdUp ? Math.max(0, 1 - p / 100) : 1));

  return (
    <Box
      ref={scroll.elementRef}
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        [theme.breakpoints.up(mdKey)]: {
          minHeight: 760,
          height: '100vh',
          maxHeight: 1440,
          display: 'block',
          willChange: 'opacity',
          mt: 'calc(var(--layout-header-desktop-height) * -1)',
        },
        ...sx,
      }}
      {...other}
      id="home"
    >
      <Box
        component={m.div}
        style={{ opacity }}
        sx={{
          width: 1,
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          transition: theme.transitions.create(['opacity']),
          [theme.breakpoints.up(mdKey)]: { height: 1, position: 'fixed', maxHeight: 'inherit' },
        }}
      >
        <Container
          component={MotionContainer}
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
            <m.div style={{ y: y1 }}>
              <Heading lgKey={lgKey} headingPart1={headingPart1} headingPart2={headingPart2} />
            </m.div>
            <m.div style={{ y: y2, whiteSpace: 'normal' }}>
              <HeroDescription lgKey={lgKey}>{description}</HeroDescription>
            </m.div>
          </Stack>
          <m.div style={{ y: y3 }}>
            <Ratings />
          </m.div>
          <m.div style={{ y: y4 }}>
            <Buttons />
          </m.div>
        </Container>

        <DeferredHeroBackground />
      </Box>
    </Box>
  );
}
