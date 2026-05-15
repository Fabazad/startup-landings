import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import { LandingHero } from '../LandingHero/landing-hero';
import { LandingScrollUI } from './landing-scroll-ui';

// Below-the-fold sections are code-split into separate chunks so they don't
// block parse/hydration of the hero. SSR is preserved for SEO.
const LandingFlow = dynamic(
  () => import('../LandingFlow/landing-flow').then((m) => ({ default: m.LandingFlow })),
  { loading: () => <div style={{ height: 600 }} /> }
);
const LandingBenefits = dynamic(
  () => import('../LandingBenefits/landing-benefits').then((m) => ({ default: m.LandingBenefits })),
  { loading: () => <div style={{ height: 400 }} /> }
);
const LandingFeatures = dynamic(
  () => import('../LandingFeatures/landing-features').then((m) => ({ default: m.LandingFeatures })),
  { loading: () => <div style={{ height: 500 }} /> }
);
const LandingTestimonials = dynamic(
  () =>
    import('../LandingTestimonials/landing-testimonials').then((m) => ({
      default: m.LandingTestimonials,
    })),
  { loading: () => <div style={{ height: 500 }} /> }
);
const LandingPricing = dynamic(
  () => import('../LandingPricing/landing-pricing').then((m) => ({ default: m.LandingPricing })),
  { loading: () => <div style={{ height: 600 }} /> }
);
const LandingContact = dynamic(
  () => import('../landing-contact').then((m) => ({ default: m.LandingContact })),
  { loading: () => <div style={{ height: 500 }} /> }
);
const LandingFAQ = dynamic(
  () => import('../LandingFAQ/index').then((m) => ({ default: m.LandingFAQ })),
  { loading: () => <div style={{ height: 400 }} /> }
);
const LandingAdvertisement = dynamic(
  () => import('../landing-advertisement').then((m) => ({ default: m.LandingAdvertisement })),
  { loading: () => <div style={{ height: 300 }} /> }
);

// ----------------------------------------------------------------------

/**
 * Main landing page view - Server Component
 * Content is server-rendered for better SEO and initial page load
 */
export function LandingView({
  headingPart1,
  headingPart2,
  description,
  hasPlans,
  ratingsText = '',
}: {
  headingPart1: string;
  headingPart2: string;
  description: string;
  hasPlans: boolean;
  ratingsText?: string;
}) {
  return (
    <>
      <LandingScrollUI />
      <LandingHero
        headingPart1={headingPart1}
        headingPart2={headingPart2}
        description={description}
        hasPlans={hasPlans}
        ratingsText={ratingsText}
      />

      <Stack
        sx={{
          position: 'relative',
          bgcolor: 'background.default',
          contentVisibility: 'auto',
          containIntrinsicSize: '1px 4200px',
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
