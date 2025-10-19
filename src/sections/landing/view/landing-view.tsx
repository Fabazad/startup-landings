'use client';
import Stack from '@mui/material/Stack';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { useProductIdea } from 'src/app/product-idea-provider';
import { LandingAdvertisement } from '../landing-advertisement';
import { LandingContact } from '../landing-contact';
import { LandingFeatures } from '../LandingFeatures/landing-features';
import { LandingHero } from '../LandingHero/landing-hero';
import { LandingPricing } from '../LandingPricing/landing-pricing';
import { LandingTestimonials } from '../LandingTestimonials/landing-testimonials';

// ----------------------------------------------------------------------

export const LandingView = () => {
  const pageProgress = useScrollProgress();

  const productIdea = useProductIdea();

  if (!productIdea) return null;

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />
      <BackToTop />
      <LandingHero heroTexts={productIdea.heroTexts} />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <LandingFeatures features={productIdea.features} />

        <LandingTestimonials
          reviews={productIdea.reviews}
          testimonialsTexts={productIdea.testimonialsTexts}
        />

        <LandingPricing />

        <LandingContact />

        <LandingAdvertisement />
      </Stack>
    </>
  );
};
