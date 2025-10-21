import { RawPlans } from 'src/types/ProductIdea';

export const PLANS_SAMPLE: RawPlans = {
  basic: {
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
