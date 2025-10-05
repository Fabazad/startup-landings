'use client';

import Stack from '@mui/material/Stack';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { LandingAdvertisement } from '../landing-advertisement';
import { LandingContact } from '../landing-contact';
import { LandingFeatures } from '../landing-features';
import { LandingHero } from '../landing-hero';
import { LandingPricing } from '../landing-pricing';
import { LandingTestimonials } from '../landing-testimonials';

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
        <LandingFeatures />

        <LandingTestimonials />

        <LandingPricing />

        <LandingContact />

        <LandingAdvertisement />
      </Stack>
    </>
  );
}
