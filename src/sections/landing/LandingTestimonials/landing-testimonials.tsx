import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { MotionViewport, varFade } from 'src/components/animate';

import { useTranslation } from 'react-i18next';
import { useProductIdea } from 'src/app/product-idea-provider';
import { SectionTitle } from '../components/section-title';
import { Lines } from './lines';
import { Reviews } from './reviews';
import { TestimonialNumbers } from './testimonial-numbers';
import { TryForFreeButton } from '../components/try-for-free-button';
import { GetStartedButton } from '../components/get-started-button';
import { m } from 'framer-motion';

// ----------------------------------------------------------------------

export const LandingTestimonials = ({ sx, ...other }: BoxProps) => {
  const {
    plans,
    testimonialsTexts: { titlePart1, titlePart2 },
  } = useProductIdea();
  const { t } = useTranslation();
  return (
    <Box
      component="section"
      sx={{ py: 10, position: 'relative', ...sx }}
      {...other}
      id="testimonials"
    >
      <MotionViewport>
        <Lines />

        <Container>
          <SectionTitle
            caption={t('landing.testimonials.testimonials')}
            title={titlePart1}
            txtGradient={titlePart2}
            sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}
          />

          <Reviews />

          <Box
        variants={varFade({ distance: 24 }).inUp}
        component={m.div}
        sx={{ textAlign: 'center', mt: 5 }}
      >
        {plans ? <TryForFreeButton buttonName="try-for-free-testimonials" /> : <GetStartedButton buttonName="get-started-testimonials" />}
      </Box>

          <TestimonialNumbers />
        </Container>
      </MotionViewport>
    </Box>
  );
};
