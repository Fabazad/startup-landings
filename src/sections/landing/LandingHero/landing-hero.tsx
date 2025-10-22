import type { BoxProps } from '@mui/material/Box';
import type { MotionValue } from 'framer-motion';

import { m, useTransform } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { MotionContainer } from 'src/components/animate';

import { useProductIdea } from 'src/app/product-idea-provider';
import { HeroBackground } from '../components/hero-background';
import { Buttons } from './buttons';
import { Heading } from './heading';
import { HeroDescription } from './hero-description';
import { Ratings } from './ratings';
import { useScrollPercent } from './useScrollPercent';
import { useTransformY } from './useTransformY';

// ----------------------------------------------------------------------

const smKey = 'sm';
const mdKey = 'md';
const lgKey = 'lg';

export const LandingHero = ({ sx, ...other }: BoxProps) => {
  const {
    heroTexts: { description, headingPart1, headingPart2 },
  } = useProductIdea();
  const theme = useTheme();

  const scroll = useScrollPercent();

  const mdUp = useResponsive('up', mdKey);

  const distance = mdUp ? scroll.percent : 0;

  const y1 = useTransformY(scroll.scrollY, distance * -7);
  const y2 = useTransformY(scroll.scrollY, distance * -6);
  const y3 = useTransformY(scroll.scrollY, distance * -5);
  const y4 = useTransformY(scroll.scrollY, distance * -4);

  const opacity: MotionValue<number> = useTransform(
    scroll.scrollY,
    [0, 1],
    [1, mdUp ? Number((1 - scroll.percent / 100).toFixed(1)) : 1]
  );

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
            py: 3,
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
            <m.div style={{ y: y2 }}>
              <HeroDescription smKey={smKey} lgKey={lgKey}>
                {description}
              </HeroDescription>
            </m.div>
          </Stack>
          <m.div style={{ y: y3 }}>
            <Ratings />
          </m.div>
          <m.div style={{ y: y4 }}>
            <Buttons />
          </m.div>
        </Container>

        <HeroBackground />
      </Box>
    </Box>
  );
};
