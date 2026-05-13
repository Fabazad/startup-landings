import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import { LandingHero } from '../LandingHero/landing-hero';
import { LandingScrollUI } from './landing-scroll-ui';

// Below-the-fold sections are code-split into separate chunks so they don't
// block parse/hydration of the hero. SSR is preserved for SEO.
const LandingFlow = dynamic(() =>
  import('../LandingFlow/landing-flow').then((m) => ({ default: m.LandingFlow }))
);
const LandingBenefits = dynamic(() =>
  import('../LandingBenefits/landing-benefits').then((m) => ({ default: m.LandingBenefits }))
);
const LandingFeatures = dynamic(() =>
  import('../LandingFeatures/landing-features').then((m) => ({ default: m.LandingFeatures }))
);
const LandingTestimonials = dynamic(() =>
  import('../LandingTestimonials/landing-testimonials').then((m) => ({
    default: m.LandingTestimonials,
  }))
);
const LandingPricing = dynamic(() =>
  import('../LandingPricing/landing-pricing').then((m) => ({ default: m.LandingPricing }))
);
const LandingContact = dynamic(() =>
  import('../landing-contact').then((m) => ({ default: m.LandingContact }))
);
const LandingFAQ = dynamic(() =>
  import('../LandingFAQ/index').then((m) => ({ default: m.LandingFAQ }))
);
const LandingAdvertisement = dynamic(() =>
  import('../landing-advertisement').then((m) => ({ default: m.LandingAdvertisement }))
);

// ----------------------------------------------------------------------

/**
 * Main landing page view - Server Component
 * Content is server-rendered for better SEO and initial page load
 */
export function LandingView() {
  return (
    <>
      <LandingScrollUI />
      <LandingHero />

      <Stack
        sx={{
          position: 'relative',
          bgcolor: 'background.default',
          contentVisibility: 'auto',
          containIntrinsicSize: '100% 4200px',
        }}
      >
        <LandingFlow />

        <LandingBenefits />

        <LandingFeatures />

        <LandingTestimonials />

        <LandingPricing />

        <LandingContact />

        <LandingFAQ />

        <LandingAdvertisement />
      </Stack>
    </>
  );
}
