import { _mock } from 'src/_mock';
import { RawReview } from 'src/types/ProductIdea';

const base = (index: number) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  avatar: _mock.image.avatar(index),
  rating: 5,
});

export const REVIEWS_SAMPLE: RawReview[] = [
  {
    ...base(1),
    jobTitle: {
      fr: 'Qualité du code',
      en: 'Design Quality',
    },
    content: {
      fr: 'La qualité du code est excellente. Le code est propre et le support est excellent.',
      en: 'The code quality is excellent. The code is clean and the support is excellent.',
    },
    postedAt: new Date('April 20, 2024 23:15:30'),
  },
  {
    ...base(2),
    jobTitle: {
      fr: 'Qualité du code',
      en: 'Design Quality',
    },
    content: {
      fr: "Incroyable. Je n'ai jamais acheté de front ends complets avant, mais je vais certainement le faire à nouveau!",
      en: "Amazing. I've never purchased complete front ends before, but I'll definitely be doing this again!",
    },
    postedAt: new Date('March 19, 2024 23:15:30'),
  },
  {
    ...base(3),
    jobTitle: {
      fr: 'Qualité du code',
      en: 'Code Quality',
    },
    content: {
      fr: "Propre et complet (Design & Code). Merci à l'équipe Minimal :)",
      en: 'Clean & Complete (Design & Code). Thanks to the Minimal team :)',
    },
    postedAt: new Date('April 19, 2023 23:15:30'),
  },
  {
    ...base(4),
    jobTitle: {
      fr: 'Support Client',
      en: 'Customer Support',
    },
    content: {
      fr: "Merci à Minimal pour le support client avec email. J'ai résolu le problème. Et la qualité du code est bonne, aussi.",
      en: 'Thanks to Minimal for customer support with email. I solved the problem. And the code quality is good, too.',
    },
    postedAt: new Date('May 19, 2023 23:15:30'),
  },
  {
    ...base(5),
    jobTitle: {
      fr: 'Support Client',
      en: 'Customer Support',
    },
    content: {
      fr: "Super UI kit, vraiment beau aussi. Et le support client est très chaleureux. Cependant, j'espère que les composants et les thèmes peuvent être fournis comme un projet séparé (package).",
      en: 'Great UI kit, really beautiful as well. Also the customer support is very warm-hearted. However, I hope the components and themes can be provided as a separated project (package).',
    },
    postedAt: new Date('June 19, 2023 23:15:30'),
  },
  {
    ...base(6),
    jobTitle: {
      fr: 'Qualité du design',
      en: 'Design Quality',
    },
    content: {
      fr: "Je n'aurais jamais pu créer tous ces composants beaux moi-même!",
      en: 'I would never have been able to create all these beautiful components myself!',
    },
    postedAt: new Date('July 19, 2023 23:15:30'),
  },
  {
    ...base(7),
    jobTitle: {
      fr: 'Qualité du code',
      en: 'Code Quality',
    },
    content: {
      fr: "La qualité de ce template est excellente. Cependant, comme un individu, le coût de l'obtention de la version Source TypeScript est au-delà de mes moyens. Malgré mon forte désir d'acquérir cette version, mon budget personnel limité ne me permet pas de le faire.",
      en: 'The quality of this template is excellent. However, as an individual, the cost of obtaining the TypeScript Source version is beyond my means. Despite my strong desire to acquire it, my limited personal budget does not allow me to do so.',
    },
    postedAt: new Date('August 19, 2023 23:15:30'),
  },
  {
    ...base(8),
    jobTitle: {
      fr: 'Customizability',
      en: 'Customizability',
    },
    content: {
      fr: 'La qualité du design et du code est impressionnante. Des mises à jour régulières et un excellent support client sont des avantages majeurs.',
      en: 'The design and code quality are impressive. Regular updates and excellent customer support are major advantages.',
    },
    postedAt: new Date('September 19, 2023 23:15:30'),
  },
];
