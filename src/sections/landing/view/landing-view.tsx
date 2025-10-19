'use client';

import Stack from '@mui/material/Stack';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { LandingAdvertisement } from '../landing-advertisement';
import { LandingContact } from '../landing-contact';
import { LandingPricing } from '../landing-pricing';
import { LandingFeatures } from '../LandingFeatures/landing-features';
import { SAMPLE_FEATURES } from '../LandingFeatures/sample-features';
import { HERO_TEXTS_SAMPLE } from '../LandingHero/heroTextsSample';
import { LandingHero } from '../LandingHero/landing-hero';
import { LandingTestimonials } from '../LandingTestimonials/landing-testimonials';
import { REVIEWS_SAMPLE } from '../LandingTestimonials/reviewsSample';
import { TESTIMONIALS_TEXTS_SAMPLE } from '../LandingTestimonials/testimonialsTextsSample';

// ----------------------------------------------------------------------

export function LandingView() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />
      <BackToTop />
      <LandingHero heroTexts={HERO_TEXTS_SAMPLE} />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <LandingFeatures features={SAMPLE_FEATURES} />

        <LandingTestimonials
          reviews={REVIEWS_SAMPLE}
          testimonialsTexts={TESTIMONIALS_TEXTS_SAMPLE}
        />

        <LandingPricing />

        <LandingContact />

        <LandingAdvertisement />
      </Stack>
    </>
  );
}
