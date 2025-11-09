import { CONFIG } from 'src/config-global';
import { RawProductIdea } from 'src/types/ProductIdea';

export const INSIGHTFEED_JSON2: RawProductIdea = {
  id: 'insightfeed',
  name: 'Insight Feed',
  themeColor: 'purple',
  logoUrl: `${CONFIG.assetsDir}/logo/purple-dear.svg`,
  faviconUrl: `${CONFIG.assetsDir}/favicon/purple-dear.ico`,
  features: [
    {
      icon: 'mdi:radar',
      pain: {
        en: 'Hard to find true competitors fast.',
        fr: 'Difficile d’identifier vite les vrais concurrents.',
      },
      title: {
        en: 'Automatic Competitor Discovery',
        fr: 'Détection automatique des concurrents',
      },
      items: [
        {
          icon: 'mdi:web-search',
          title: {
            en: 'Category & directory scan',
            fr: 'Scan des catégories & annuaires',
          },
          description: {
            en: 'Leverages G2, Product Hunt, AppSumo and more.',
            fr: 'Exploite G2, Product Hunt, AppSumo et plus.',
          },
        },
        {
          icon: 'mdi:tag-text',
          title: {
            en: 'Keyword & metadata matching',
            fr: 'Matching mots-clés & métadonnées',
          },
          description: {
            en: 'Understands SEO terms, page semantics, and positioning.',
            fr: 'Comprend les termes SEO, la sémantique et le positionnement.',
          },
        },
        {
          icon: 'mdi:chart-bubble',
          title: {
            en: 'Functional similarity scoring',
            fr: 'Score de similarité fonctionnelle',
          },
          description: {
            en: 'Ranks tools close to your product by features and pricing.',
            fr: 'Classe les outils proches par features et pricing.',
          },
        },
      ],
      imgUrl: '/assets/insightfeed/feature-discovery.png',
    },
    {
      icon: 'mdi:eye-check',
      pain: {
        en: 'Manual monitoring costs time.',
        fr: 'La veille manuelle prend trop de temps.',
      },
      title: {
        en: 'Competitor Website Monitoring',
        fr: 'Monitoring des sites concurrents',
      },
      items: [
        {
          icon: 'mdi:file-document',
          title: {
            en: 'Key pages tracking',
            fr: 'Suivi des pages clés',
          },
          description: {
            en: 'Landing, pricing, changelog, and product blog.',
            fr: 'Landing, pricing, changelog et blog produit.',
          },
        },
        {
          icon: 'mdi:bell-badge',
          title: {
            en: 'Smart change alerts',
            fr: 'Alertes intelligentes',
          },
          description: {
            en: 'Notify on text, price, CTA, or design changes.',
            fr: 'Alerte sur texte, prix, CTA ou design.',
          },
        },
      ],
      imgUrl: '/assets/insightfeed/feature-monitoring.png',
    },
    {
      icon: 'mdi:table-large',
      pain: {
        en: 'Hard to compare plans and features.',
        fr: 'Comparer prix et features est pénible.',
      },
      title: {
        en: 'Pricing & Feature Comparison',
        fr: 'Comparaison pricing & fonctionnalités',
      },
      items: [
        {
          icon: 'mdi:balance-scale',
          title: {
            en: 'Interactive comparison table',
            fr: 'Tableau comparatif interactif',
          },
          description: {
            en: 'Plans, prices, free trial, support, integrations.',
            fr: 'Plans, prix, essai, support, intégrations.',
          },
        },
        {
          icon: 'mdi:filter-variant',
          title: {
            en: 'Filter & segment',
            fr: 'Filtres & segments',
          },
          description: {
            en: 'Focus by ICP, ACV, or feature set.',
            fr: 'Focus par ICP, ACV ou set de features.',
          },
        },
      ],
      imgUrl: '/assets/insightfeed/feature-compare.png',
    },
    {
      icon: 'mdi:timeline-clock',
      pain: {
        en: 'No historical view of moves.',
        fr: 'Pas de vision historique des mouvements.',
      },
      title: {
        en: 'Evolution Timeline',
        fr: 'Timeline des évolutions',
      },
      items: [
        {
          icon: 'mdi:star-plus',
          title: {
            en: 'Feature & price history',
            fr: 'Historique features & prix',
          },
          description: {
            en: 'Track launches, price hikes, positioning shifts.',
            fr: 'Suis lancements, hausses de prix, repositionnements.',
          },
        },
        {
          icon: 'mdi:image-multiple',
          title: {
            en: 'Visual snapshots',
            fr: 'Captures visuelles',
          },
          description: {
            en: 'Versioned screenshots of key pages.',
            fr: 'Screenshots versionnés des pages clés.',
          },
        },
      ],
      imgUrl: '/assets/insightfeed/feature-timeline.png',
    },
    {
      icon: 'mdi:robot-outline',
      pain: {
        en: 'Too much noise in alerts.',
        fr: 'Trop de bruit dans les alertes.',
      },
      title: {
        en: 'AI Summaries & Integrations',
        fr: 'Résumés IA & intégrations',
      },
      items: [
        {
          icon: 'mdi:text-long',
          title: {
            en: 'Concise AI summaries',
            fr: 'Résumés IA concis',
          },
          description: {
            en: '“Pro plan +10%, new ‘AI Assistant’, CTA to ‘Book a Demo’.',
            fr: '« Plan Pro +10 %, nouveau ‘AI Assistant’, CTA ‘Book a Demo’. »',
          },
        },
        {
          icon: 'mdi:integration',
          title: {
            en: 'Slack, email, webhook',
            fr: 'Slack, email, webhook',
          },
          description: {
            en: 'Zapier, n8n, CSV & Notion exports.',
            fr: 'Zapier, n8n, exports CSV & Notion.',
          },
        },
        {
          icon: 'mdi:trending-up',
          title: {
            en: 'Competitive trend score',
            fr: 'Score de tendance concurrentielle',
          },
          description: {
            en: '0–100 activity metric from frequency/volume of changes.',
            fr: 'Métrique 0–100 selon fréquence/volume des changements.',
          },
        },
      ],
      imgUrl: '/assets/insightfeed/feature-ai.png',
    },
  ],
  heroTexts: {
    description: {
      en: 'Find your SaaS competitors in one click and track every change automatically.',
      fr: 'Trouvez vos concurrents SaaS en un clic et suivez tous leurs changements automatiquement.',
    },
    headingPart1: {
      en: 'Know every move.',
      fr: 'Voyez chaque mouvement.',
    },
    headingPart2: {
      en: 'React faster.',
      fr: 'Réagissez plus vite.',
    },
  },
  reviews: [
    {
      id: 'r1',
      name: 'Alice Martin',
      avatar: '/assets/avatars/alice.png',
      rating: 5,
      jobTitle: {
        en: 'SaaS Founder',
        fr: 'Fondatrice SaaS',
      },
      content: {
        en: 'InsightFeed replaced my messy competitor spreadsheet and saved hours every week.',
        fr: 'InsightFeed a remplacé mon tableur concurrentiel et m’économise des heures chaque semaine.',
      },
      postedAt: new Date('2025-07-12T09:00:00.000Z'),
    },
    {
      id: 'r2',
      name: 'Diego López',
      avatar: '/assets/avatars/diego.png',
      rating: 4,
      jobTitle: {
        en: 'Head of Product',
        fr: 'Head of Product',
      },
      content: {
        en: 'The timeline view is perfect to brief stakeholders before roadmap reviews.',
        fr: 'La timeline est parfaite pour briefer les parties prenantes avant les revues de roadmap.',
      },
      postedAt: new Date('2025-06-03T10:15:00.000Z'),
    },
    {
      id: 'r3',
      name: 'Sophie Nguyen',
      avatar: '/assets/avatars/sophie.png',
      rating: 5,
      jobTitle: {
        en: 'Growth Lead',
        fr: 'Lead Growth',
      },
      content: {
        en: 'Smart pricing alerts helped us adjust our offer right on time.',
        fr: 'Les alertes pricing nous ont aidés à ajuster notre offre au bon moment.',
      },
      postedAt: new Date('2025-05-21T14:00:00.000Z'),
    },
    {
      id: 'r4',
      name: 'Marco Rossi',
      avatar: '/assets/avatars/marco.png',
      rating: 5,
      jobTitle: {
        en: 'Product Manager',
        fr: 'Product Manager',
      },
      content: {
        en: 'Clean UI, relevant alerts, and the Notion export is gold.',
        fr: 'UI propre, alertes pertinentes, et l’export Notion est en or.',
      },
      postedAt: new Date('2025-08-18T08:30:00.000Z'),
    },
    {
      id: 'r5',
      name: 'Chloé Bernard',
      avatar: '/assets/avatars/chloe.png',
      rating: 4,
      jobTitle: {
        en: 'Marketing Manager',
        fr: 'Marketing Manager',
      },
      content: {
        en: 'We finally track CTA and copy changes across competitors automatically.',
        fr: 'On suit enfin automatiquement les changements de CTA et de copy chez les concurrents.',
      },
      postedAt: new Date('2025-04-10T16:45:00.000Z'),
    },
    {
      id: 'r6',
      name: 'Tom Becker',
      avatar: '/assets/avatars/tom.png',
      rating: 5,
      jobTitle: {
        en: 'Investor',
        fr: 'Investisseur',
      },
      content: {
        en: 'Great for market scans; the trend score surfaces who is moving fast.',
        fr: 'Excellent pour cartographier un marché ; le score de tendance révèle qui bouge vite.',
      },
      postedAt: new Date('2025-09-02T12:10:00.000Z'),
    },
    {
      id: 'r7',
      name: 'Fatima El Idrissi',
      avatar: '/assets/avatars/fatima.png',
      rating: 5,
      jobTitle: {
        en: 'PMM',
        fr: 'PMM',
      },
      content: {
        en: 'AI summaries reduce noise and keep only what matters.',
        fr: 'Les résumés IA réduisent le bruit et gardent l’essentiel.',
      },
      postedAt: new Date('2025-03-14T09:25:00.000Z'),
    },
    {
      id: 'r8',
      name: 'Ethan Clark',
      avatar: '/assets/avatars/ethan.png',
      rating: 4,
      jobTitle: {
        en: 'RevOps',
        fr: 'RevOps',
      },
      content: {
        en: 'Slack alerts + CSV export = smooth reporting for leadership.',
        fr: 'Alertes Slack + export CSV = reporting fluide pour le leadership.',
      },
      postedAt: new Date('2025-05-05T18:20:00.000Z'),
    },
  ],
  testimonialsTexts: {
    titlePart1: {
      en: 'What teams say',
      fr: 'Ce que les équipes disent',
    },
    titlePart2: {
      en: 'about InsightFeed',
      fr: 'd’InsightFeed',
    },
  },
  plans: {
    basic: {
      price: 29,
      included: [
        {
          en: 'Monitor up to 3 SaaS',
          fr: 'Jusqu’à 3 SaaS surveillés',
        },
        {
          en: 'Basic competitor discovery',
          fr: 'Détection de concurrents de base',
        },
        {
          en: 'Email alerts',
          fr: 'Alertes email',
        },
      ],
    },
    premium: {
      price: 79,
      included: [
        {
          en: 'Monitor up to 10 SaaS',
          fr: 'Jusqu’à 10 SaaS surveillés',
        },
        {
          en: 'Slack alerts + AI summaries',
          fr: 'Alertes Slack + résumés IA',
        },
        {
          en: 'Pricing & feature comparison',
          fr: 'Comparatif pricing & features',
        },
        {
          en: 'Evolution timeline',
          fr: 'Timeline des évolutions',
        },
      ],
    },
    ultimate: {
      price: 199,
      included: [
        {
          en: 'Monitor up to 30 SaaS',
          fr: 'Jusqu’à 30 SaaS surveillés',
        },
        {
          en: 'Multi-user seats',
          fr: 'Multi-utilisateurs',
        },
        {
          en: 'Zapier / Notion integrations',
          fr: 'Intégrations Zapier / Notion',
        },
        {
          en: 'CSV exports & weekly reports',
          fr: 'Exports CSV & rapports hebdo',
        },
      ],
    },
  },
};
