import { RawPlans } from 'src/types/ProductIdea';

export const PLANS_SAMPLE: RawPlans = {
  basic: {
    target: {
      en: 'Solo founders and early-stage teams',
      fr: 'Fondateurs solos et équipes early-stage',
    },
    price: 69,
    included: [
      {
        fr: 'Un produit final',
        en: 'One end products',
      },
      {
        fr: '12 mois de mises à jour',
        en: '12 months updates',
      },
      {
        fr: 'Paiement unique',
        en: 'One-time payments',
      },
    ],
  },
  premium: {
    target: {
      en: 'Small teams and growing businesses',
      fr: 'Équipes petites et entreprises en croissance',
    },
    price: 129,
    included: [
      {
        fr: 'Un produit final',
        en: 'One end products',
      },
      {
        fr: '12 mois de mises à jour',
        en: '12 months updates',
      },
      {
        fr: 'Paiement unique',
        en: 'One-time payments',
      },
      {
        fr: 'Licence perpétuelle',
        en: 'Lifetime perpetual license.',
      },
      {
        fr: 'Support client',
        en: 'Customer support',
      },
    ],
  },
  ultimate: {
    target: {
      en: 'Enterprise-scale teams and growth-focused startups',
      fr: 'Équipes enterprise-scale et startups growth-focused',
    },
    price: 599,
    included: [
      {
        fr: 'Un produit final',
        en: 'One end products',
      },
      {
        fr: '12 mois de mises à jour',
        en: '12 months updates',
      },
      {
        fr: '6 mois de support',
        en: '6 months of support',
      },
      {
        fr: 'Paiement unique',
        en: 'One-time payments',
      },
      {
        fr: 'Licence perpétuelle',
        en: 'Lifetime perpetual license.',
      },
      {
        fr: 'Support client',
        en: 'Customer support',
      },
    ],
  },
};
