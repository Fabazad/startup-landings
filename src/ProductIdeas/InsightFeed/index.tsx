import { RawProductIdea } from 'src/types/ProductIdea';
import { FEATURES_SAMPLE } from './featuresSample';
import { HERO_TEXTS_SAMPLE } from './hero-texts-sample';
import { PLANS_SAMPLE } from './plans-sample';
import { REVIEWS_SAMPLE } from './reviewsSample';
import { TESTIMONIALS_TEXTS_SAMPLE } from './testimonialsTextsSample';

export const INSIGHTFEED_PRODUCT_IDEA: RawProductIdea = {
  id: '1',
  name: 'Insight Feed',
  isReady: false,
  themeColor: 'purple',
  logo: 'octopus',
  ctaName: { en: 'Monitor your first competitor', fr: 'Surveille ton premier concurrent' },
  features: FEATURES_SAMPLE,
  heroTexts: HERO_TEXTS_SAMPLE,
  reviews: REVIEWS_SAMPLE,
  testimonialsTexts: TESTIMONIALS_TEXTS_SAMPLE,
  plans: PLANS_SAMPLE,
  testimonialNumbers: [
    { label: { en: 'Monitored Competitors', fr: 'Competiteurs surveillés' }, value: 1500 },
    { label: { en: 'Insights Generated', fr: 'Insights générés' }, value: 570000 },
  ],
};
