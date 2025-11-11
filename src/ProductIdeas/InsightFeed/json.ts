import { CONFIG } from 'src/config-global';
import { RawProductIdea } from 'src/types/ProductIdea';

export const INSIGHTFEED_JSON: RawProductIdea = {
  id: 'insightfeed',
  name: 'Insight Feed',
  themeColor: 'purple',
  logoUrl: `${CONFIG.assetsDir}/logo/purple-dear.svg`,
  faviconUrl: `${CONFIG.assetsDir}/favicon/purple-dear.ico`,
  heroTexts: {
    description: {
      fr: 'Détectez automatiquement vos concurrents SaaS et suivez leurs changements (prix, fonctionnalités, messages) — sans veille manuelle.',
      en: 'Automatically discover your SaaS competitors and track their changes (pricing, features, messaging) — no manual monitoring.',
    },
    headingPart1: {
      fr: 'Trouvez vos concurrents',
      en: 'Find your competitors',
    },
    headingPart2: {
      fr: 'et suivez leurs évolutions',
      en: 'and track their every move',
    },
  },
  features: [
    {
      id: 'f1',
      icon: 'ph:compass',
      pain: {
        fr: 'Vous manquez de visibilité sur les acteurs proches de votre produit.',
        en: 'You lack visibility on products closest to yours.',
      },
      title: {
        fr: 'Détection automatique des concurrents',
        en: 'Automatic Competitor Discovery',
      },
      items: [
        {
          icon: 'ph:target',
          title: {
            fr: 'Analyse des catégories & mots-clés',
            en: 'Category & keyword analysis',
          },
          description: {
            fr: 'Croisement de sources (annuaires, SEO, métadonnées) pour trouver les concurrents pertinents.',
            en: 'Cross-references directories, SEO and metadata to find relevant competitors.',
          },
        },
        {
          icon: 'ph:magic-wand',
          title: {
            fr: 'Similarity scoring',
            en: 'Similarity scoring',
          },
          description: {
            fr: 'Mesure la proximité fonctionnelle et l’alignement d’offre.',
            en: 'Measures functional proximity and offer alignment.',
          },
        },
        {
          icon: 'ph:list-magnifying-glass',
          title: {
            fr: 'Suggestions intelligentes',
            en: 'Smart suggestions',
          },
          description: {
            fr: 'Propositions de concurrents émergents à ajouter à votre watchlist.',
            en: 'Recommends emerging competitors to add to your watchlist.',
          },
        },
      ],
      imgUrl: '/assets/insightfeed/feature-discovery.webp',
    },
    {
      id: 'f2',
      icon: 'ph:binoculars',
      pain: {
        fr: 'La veille manuelle est chronophage et incomplète.',
        en: 'Manual monitoring is time-consuming and incomplete.',
      },
      title: {
        fr: 'Monitoring des pages clés',
        en: 'Monitoring of key pages',
      },
      items: [
        {
          icon: 'ph:globe-stand',
          title: {
            fr: 'Landing & messaging',
            en: 'Landing & messaging',
          },
          description: {
            fr: 'Détection des changements de copies, visuels, CTA.',
            en: 'Detects copy, visual and CTA changes.',
          },
        },
        {
          icon: 'ph:currency-circle-dollar',
          title: {
            fr: 'Pricing',
            en: 'Pricing',
          },
          description: {
            fr: 'Suivi des plans, prix, limites et conditions.',
            en: 'Tracks plans, prices, limits and conditions.',
          },
        },
        {
          icon: 'ph:git-merge',
          title: {
            fr: 'Changelog & blog produit',
            en: 'Changelog & product blog',
          },
          description: {
            fr: 'Surveillance des nouvelles fonctionnalités et annonces produit.',
            en: 'Monitors new features and product announcements.',
          },
        },
      ],
      imgUrl: '/assets/insightfeed/feature-monitoring.webp',
    },
    {
      id: 'f3',
      icon: 'ph:table',
      pain: {
        fr: 'Comparer les offres prend des heures et les données sont vite obsolètes.',
        en: 'Comparing offers takes hours and data becomes stale fast.',
      },
      title: {
        fr: 'Comparateur pricing & fonctionnalités',
        en: 'Pricing & features comparator',
      },
      items: [
        {
          icon: 'ph:arrows-left-right',
          title: {
            fr: 'Tableau interactif',
            en: 'Interactive table',
          },
          description: {
            fr: 'Comparez plans, tarifs, free trials, freemium, support, intégrations.',
            en: 'Compare plans, prices, free trials, freemium, support, integrations.',
          },
        },
        {
          icon: 'ph:download-simple',
          title: {
            fr: 'Exports & intégrations',
            en: 'Exports & integrations',
          },
          description: {
            fr: 'Export CSV, synchronisation Notion, Webhooks, Slack.',
            en: 'CSV export, Notion sync, Webhooks, Slack.',
          },
        },
      ],
      imgUrl: '/assets/insightfeed/feature-compare.webp',
    },
    {
      id: 'f4',
      icon: 'ph:timeline',
      pain: {
        fr: 'Difficile d’avoir l’historique précis des changements.',
        en: 'Hard to keep a precise history of changes.',
      },
      title: {
        fr: 'Timeline des évolutions',
        en: 'Evolution timeline',
      },
      items: [
        {
          icon: 'ph:clock',
          title: {
            fr: 'Historique consolidé',
            en: 'Consolidated history',
          },
          description: {
            fr: 'Visualisez les hausses de prix, sorties de features et pivots.',
            en: 'Visualize price hikes, feature launches and pivots.',
          },
        },
        {
          icon: 'ph:camera',
          title: {
            fr: 'Captures auto',
            en: 'Auto screenshots',
          },
          description: {
            fr: 'Gardez une trace visuelle des changements clés.',
            en: 'Keeps visual traces of key changes.',
          },
        },
      ],
      imgUrl: '/assets/insightfeed/feature-timeline.webp',
    },
    {
      id: 'f5',
      icon: 'ph:bell-simple',
      pain: {
        fr: 'Trop d’alertes tue l’alerte.',
        en: 'Too many alerts become noise.',
      },
      title: {
        fr: 'Alertes intelligentes (IA)',
        en: 'Smart alerts (AI)',
      },
      items: [
        {
          icon: 'ph:lightning',
          title: {
            fr: 'Résumé automatique',
            en: 'Automatic summary',
          },
          description: {
            fr: 'Synthèse claire : « +10% sur le plan Pro, nouveau module AI Assistant, CTA mis à jour ». ',
            en: 'Clear synthesis: “+10% on Pro plan, new AI Assistant module, updated CTA”.',
          },
        },
        {
          icon: 'ph:slack-logo',
          title: {
            fr: 'Slack, Email, Webhooks',
            en: 'Slack, Email, Webhooks',
          },
          description: {
            fr: 'Recevez l’essentiel où votre équipe travaille.',
            en: 'Get the essentials where your team works.',
          },
        },
      ],
      imgUrl: '/assets/insightfeed/feature-alerts.webp',
    },
    {
      id: 'f6',
      icon: 'ph:trend-up',
      pain: {
        fr: 'Identifier les concurrents les plus dynamiques n’est pas trivial.',
        en: 'Identifying the most dynamic competitors is not trivial.',
      },
      title: {
        fr: 'Score de tendance concurrentielle',
        en: 'Competitive momentum score',
      },
      items: [
        {
          icon: 'ph:chart-line',
          title: {
            fr: 'Indice 0–100',
            en: '0–100 index',
          },
          description: {
            fr: 'Basé sur fréquence d’updates, ampleur des changements, couverture produit.',
            en: 'Based on update frequency, change magnitude, product coverage.',
          },
        },
      ],
      imgUrl: '/assets/insightfeed/feature-score.webp',
    },
  ],
  reviews: [
    {
      id: 'rvw-001',
      name: 'Anaïs Dupont',
      avatar: '/assets/avatars/anais.webp',
      rating: 5,
      jobTitle: {
        fr: 'Fondatrice — SaaS Marketing',
        en: 'Founder — Marketing SaaS',
      },
      content: {
        fr: 'InsightFeed m’a fait gagner des heures chaque semaine. J’ai ajusté mon pricing en 2 jours avec des données solides.',
        en: 'InsightFeed saves me hours every week. I adjusted my pricing in 2 days using solid data.',
      },
      postedAt: new Date('2024-09-19T21:15:30.000Z'),
    },
    {
      id: 'rvw-002',
      name: 'Leo Martin',
      avatar: '/assets/avatars/leo.webp',
      rating: 5,
      jobTitle: {
        fr: 'Head of Product',
        en: 'Head of Product',
      },
      content: {
        fr: 'La timeline des concurrents est devenue notre réflexe en grooming. Les alertes sont pertinentes, sans bruit.',
        en: 'The competitor timeline is our go-to in grooming. Alerts are relevant, no noise.',
      },
      postedAt: new Date('2024-10-07T09:02:10.000Z'),
    },
    {
      id: 'rvw-003',
      name: 'Sofia Almeida',
      avatar: '/assets/avatars/sofia.webp',
      rating: 4,
      jobTitle: {
        fr: 'Growth Manager',
        en: 'Growth Manager',
      },
      content: {
        fr: 'Le comparateur pricing est super utile. J’aimerais encore plus d’intégrations, mais l’essentiel est là.',
        en: 'The pricing comparator is super useful. I’d love even more integrations, but the essentials are there.',
      },
      postedAt: new Date('2024-11-22T16:45:00.000Z'),
    },
  ],
  testimonialsTexts: {
    titlePart1: {
      fr: 'Ils utilisent InsightFeed pour',
      en: 'They use InsightFeed to',
    },
    titlePart2: {
      fr: 'garder une longueur d’avance.',
      en: 'keep a long-term advantage.',
    },
  },
  plans: {
    basic: {
      price: 29,
      included: [
        {
          fr: '3 produits surveillés',
          en: '3 tracked products',
        },
        {
          fr: 'Détection automatique de concurrents',
          en: 'Automatic competitor discovery',
        },
        {
          fr: 'Alertes email basiques',
          en: 'Basic email alerts',
        },
      ],
    },
    premium: {
      price: 79,
      included: [
        {
          fr: '10 produits surveillés',
          en: '10 tracked products',
        },
        {
          fr: 'Alertes Slack + Résumé IA',
          en: 'Slack alerts + AI summary',
        },
        {
          fr: 'Comparateur pricing & fonctionnalités',
          en: 'Pricing & features comparator',
        },
        {
          fr: 'Timeline des évolutions',
          en: 'Evolution timeline',
        },
      ],
    },
    ultimate: {
      price: 199,
      included: [
        {
          fr: '30 produits surveillés',
          en: '30 tracked products',
        },
        {
          fr: 'Multi-utilisateurs et rôles',
          en: 'Multi-user & roles',
        },
        {
          fr: 'Exports CSV, Notion & Webhooks',
          en: 'CSV, Notion & Webhooks',
        },
        {
          fr: 'Rapports consolidés hebdomadaires',
          en: 'Weekly consolidated reports',
        },
      ],
    },
  },
};
