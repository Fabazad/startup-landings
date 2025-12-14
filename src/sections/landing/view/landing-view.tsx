import Stack from '@mui/material/Stack';
import { LandingAdvertisement } from '../landing-advertisement';
import { LandingContact } from '../landing-contact';
import { LandingFeatures } from '../LandingFeatures/landing-features';
import { LandingHero } from '../LandingHero/landing-hero';
import { LandingPricing } from '../LandingPricing/landing-pricing';
import { LandingTestimonials } from '../LandingTestimonials/landing-testimonials';
import { LandingScrollUI } from './landing-scroll-ui';

// ----------------------------------------------------------------------

/**
 * Main landing page view - Server Component
 * Content is server-rendered for better SEO and initial page load
 */
export const LandingView = () => {
  return (
    <>
      <LandingScrollUI />
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
