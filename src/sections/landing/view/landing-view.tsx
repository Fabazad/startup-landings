'use client';
import Stack from '@mui/material/Stack';
import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';
import { LandingAdvertisement } from '../landing-advertisement';
import { LandingContact } from '../landing-contact';
import { LandingFeatures } from '../LandingFeatures/landing-features';
import { LandingHero } from '../LandingHero/landing-hero';
import { LandingPricing } from '../LandingPricing/landing-pricing';
import { LandingTestimonials } from '../LandingTestimonials/landing-testimonials';

// ----------------------------------------------------------------------

export const LandingView = () => {
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
};
