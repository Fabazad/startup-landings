'use client';

import Stack from '@mui/material/Stack';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { HomeAdvertisement } from '../home-advertisement';
import { HomeFAQs } from '../home-faqs';
import { HomeFeatures } from '../home-features';
import { HomeForDesigner } from '../home-for-designer';
import { HomeHero } from '../home-hero';
import { HomeHighlightFeatures } from '../home-highlight-features';
import { SocialProofs } from '../home-hugepack-elements';
import { HomeIntegrations } from '../home-integrations';
import { HomePricing } from '../home-pricing';
import { HomeTestimonials } from '../home-testimonials';
import { HomeZoneUI } from '../home-zone-ui';

// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <HomeHero />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <HomeTestimonials />

        <HomeFeatures />

        <HomeHighlightFeatures />

        <HomeForDesigner />

        <HomeIntegrations />

        <HomePricing />

        <HomeFAQs />

        <HomeZoneUI />

        <HomeAdvertisement />

        <SocialProofs />
      </Stack>
    </>
  );
}
