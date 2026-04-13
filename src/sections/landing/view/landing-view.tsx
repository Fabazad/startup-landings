import Stack from '@mui/material/Stack';
import { LandingAdvertisement } from '../landing-advertisement';
import { LandingContact } from '../landing-contact';
import { LandingFeatures } from '../LandingFeatures/landing-features';
import { LandingFlow } from '../LandingFlow/landing-flow';
import { LandingBenefits } from '../LandingBenefits/landing-benefits';
import { LandingHero } from '../LandingHero/landing-hero';
import { LandingPricing } from '../LandingPricing/landing-pricing';
import { LandingTestimonials } from '../LandingTestimonials/landing-testimonials';
import { LandingScrollUI } from './landing-scroll-ui';
import { LandingFAQ } from '../LandingFAQ/index';

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

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
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
