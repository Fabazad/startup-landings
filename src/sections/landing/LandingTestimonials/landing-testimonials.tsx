import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { MotionViewport } from 'src/components/animate';

import { useTranslation } from 'react-i18next';
import { useProductIdea } from 'src/app/product-idea-provider';
import { SectionTitle } from '../components/section-title';
import { Lines } from './lines';
import { Reviews } from './reviews';
import { TestimonialNumbers } from './testimonial-numbers';

// ----------------------------------------------------------------------

export const LandingTestimonials = ({ sx, ...other }: BoxProps) => {
  const {
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

          <TestimonialNumbers />
        </Container>
      </MotionViewport>
    </Box>
  );
};
