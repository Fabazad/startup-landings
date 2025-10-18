'use client';

import Stack from '@mui/material/Stack';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { LandingAdvertisement } from '../landing-advertisement';
import { LandingContact } from '../landing-contact';
import { LandingPricing } from '../landing-pricing';
import { LandingTestimonials } from '../landing-testimonials';
import { LandingFeatures } from '../LandingFeatures/landing-features';
import { SAMPLE_FEATURES } from '../LandingFeatures/sample-features';
import { LandingHero } from '../LandingHero/landing-hero';

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
      <LandingHero />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <LandingFeatures features={SAMPLE_FEATURES} />

        <LandingTestimonials />

        <LandingPricing />

        <LandingContact />

        <LandingAdvertisement />
      </Stack>
    </>
  );
}
