import { CONFIG } from 'src/config-global';
import { RawProductIdea } from 'src/types/ProductIdea';

export const INSIGHTFEED_CONTENT: RawProductIdea = {
  id: 'insightfeed-1',
  name: 'Insight Feed',
  themeColor: 'purple',
  logoUrl: `${CONFIG.assetsDir}/logo/purple-dear.svg`,
  faviconUrl: `${CONFIG.assetsDir}/favicon/purple-dear.ico`,
  heroTexts: {
    description: {
      fr: 'La veille concurrentielle automatisée pour les SaaS :\nDétection des concurrents, suivi des changements (features, pricing, landing, pubs) et synthèse des avis dans le temps.',
      en: 'Automated competitive intelligence for SaaS:\nDiscover competitors, track changes (features, pricing, landings, ads) and aggregate reviews over time.',
    },
    headingPart1: {
      fr: 'Restez en avance',
      en: 'Stay ahead',
    },
    headingPart2: {
      fr: 'sur vos concurrents',
      en: 'of your competitors',
    },
  },
  features: [
    {
      icon: 'mdi:radar',
      title: {
        fr: 'Détection automatique des concurrents',
        en: 'Automatic competitor discovery',
      },
      pain: {
        fr: 'Vous ignorez qui capte vos prospects ?',
        en: 'Unsure who’s stealing your prospects?',
      },
      items: [
        {
          icon: 'mdi:magnify-scan',
          title: {
            fr: 'Trouve les acteurs similaires',
            en: 'Find similar players',
          },
          description: {
            fr: 'Analyse de votre site, mots-clés et catégorie pour proposer une liste initiale de concurrents.',
            en: 'Analyzes your site, keywords and category to suggest an initial competitor list.',
          },
        },
        {
          icon: 'mdi:graph-outline',
          title: {
            fr: 'Positionnement stratégique',
            en: 'Strategic positioning',
          },
          description: {
            fr: 'Cartographie des segments, ICP et différenciation prix/valeur.',
            en: 'Maps segments, ICPs, and price/value differentiation.',
          },
        },
        {
          icon: 'mdi:plug',
          title: {
            fr: 'Enrichissement par intégrations',
            en: 'Enriched via integrations',
          },
          description: {
            fr: 'Sources publiques, app stores, G2/Capterra, réseaux sociaux et publicités.',
            en: 'Public sources, app stores, G2/Capterra, social and ad libraries.',
          },
        },
      ],
      imgUrl: `${CONFIG.assetsDir}/assets/images/home/competitor-discovery.webp`,
    },
    {
      icon: 'mdi:bell-ring',
      title: {
        fr: 'Veille des changements clés',
        en: 'Monitor key changes',
      },
      pain: {
        fr: 'Vous découvrez trop tard une feature ou un changement de pricing ?',
        en: 'Finding out about feature or pricing changes too late?',
      },
      items: [
        {
          icon: 'mdi:feature-search-outline',
          title: {
            fr: 'Nouvelles features & pages',
            en: 'New features & pages',
          },
          description: {
            fr: 'Détecte les ajouts de fonctionnalités, les refontes de landing et les mises à jour de docs.',
            en: 'Detects feature additions, landing redesigns and docs updates.',
          },
        },
        {
          icon: 'mdi:currency-usd',
          title: {
            fr: 'Changements de pricing',
            en: 'Pricing changes',
          },
          description: {
            fr: 'Repère les variations de plans, limites et conditions.',
            en: 'Spots plan, limit and terms changes.',
          },
        },
        {
          icon: 'mdi:bullhorn',
          title: {
            fr: 'Campagnes & pubs',
            en: 'Campaigns & ads',
          },
          description: {
            fr: 'Suis l’activité publicitaire et les messages clés par canal.',
            en: 'Track ad activity and key messaging by channel.',
          },
        },
      ],
      imgUrl: `${CONFIG.assetsDir}/assets/images/home/change-tracking.webp`,
    },
    {
      icon: 'mdi:comment-text-multiple',
      title: {
        fr: 'Synthèse d’avis par l’IA',
        en: 'AI review aggregation',
      },
      pain: {
        fr: 'Difficile de lire des centaines d’avis ?',
        en: 'Hard to read hundreds of reviews?',
      },
      items: [
        {
          icon: 'mdi:timeline-text',
          title: {
            fr: 'Évolution dans le temps',
            en: 'Trends over time',
          },
          description: {
            fr: 'Sujets récurrents, courbe de satisfaction et émergence de pains.',
            en: 'Recurring themes, satisfaction curve and emerging pains.',
          },
        },
        {
          icon: 'mdi:compare',
          title: {
            fr: 'Comparaison croisée',
            en: 'Cross-vendor comparison',
          },
          description: {
            fr: 'Compare votre produit vs. concurrents sur les thèmes clés (UX, support, fiabilité…).',
            en: 'Compares your product vs. competitors on key themes (UX, support, reliability, etc.).',
          },
        },
        {
          icon: 'mdi:lightbulb-on-outline',
          title: {
            fr: 'Insights actionnables',
            en: 'Actionable insights',
          },
          description: {
            fr: 'Recommandations concrètes et exemples de verbatims.',
            en: 'Concrete recommendations with example quotes.',
          },
        },
      ],
      imgUrl: `${CONFIG.assetsDir}/assets/images/home/review-ai.webp`,
    },
    {
      icon: 'mdi:view-dashboard-outline',
      title: {
        fr: 'Tableaux de bord & alertes',
        en: 'Dashboards & alerts',
      },
      pain: {
        fr: 'La veille ne sert à rien si personne ne la voit.',
        en: 'Monitoring is useless if nobody sees it.',
      },
      items: [
        {
          icon: 'mdi:bell-alert',
          title: {
            fr: 'Alertes temps réel',
            en: 'Real-time alerts',
          },
          description: {
            fr: 'Slack, email, Notion — filtrées par concurrent, type de changement ou marché.',
            en: 'Slack, email, Notion — filtered by competitor, change type or market.',
          },
        },
        {
          icon: 'mdi:notebook-outline',
          title: {
            fr: 'Briefs partageables',
            en: 'Shareable briefs',
          },
          description: {
            fr: 'Synthèses prêtes pour la direction, le produit, le marketing et les sales.',
            en: 'Ready-to-share briefs for leadership, product, marketing and sales.',
          },
        },
        {
          icon: 'mdi:api',
          title: {
            fr: 'API & export',
            en: 'API & export',
          },
          description: {
            fr: 'CSV/JSON et API pour intégrer vos workflows data.',
            en: 'CSV/JSON and API to plug into your data workflows.',
          },
        },
      ],
      imgUrl: `${CONFIG.assetsDir}/assets/images/home/dash-alerts.webp`,
    },
  ],
  testimonialsTexts: {
    titlePart1: {
      fr: 'Ils nous font',
      en: 'Teams that',
    },
    titlePart2: {
      fr: 'confiance',
      en: 'trust us',
    },
  },
  reviews: [
    {
      id: 'r1',
      name: 'Camille D.',
      avatar: `${CONFIG.assetsDir}/assets/avatars/avatar-1.webp`,
      rating: 5,
      jobTitle: {
        fr: 'Head of Product, SaaS B2B',
        en: 'Head of Product, B2B SaaS',
      },
      content: {
        fr: 'Insight Feed nous a alertés d’un changement de pricing majeur chez un concurrent une semaine avant son annonce publique. On a adapté notre offre à temps.',
        en: 'Insight Feed alerted us to a competitor’s major pricing change a week before the public announcement. We adjusted our offer in time.',
      },
      postedAt: new Date('2025-09-14T10:15:00.000Z'),
    },
    {
      id: 'r2',
      name: 'Martin L.',
      avatar: `${CONFIG.assetsDir}/assets/avatars/avatar-2.webp`,
      rating: 5,
      jobTitle: {
        fr: 'VP Marketing',
        en: 'VP Marketing',
      },
      content: {
        fr: 'La synthèse IA des avis nous a fait gagner des semaines. On a priorisé 2 features et réduit le churn de 12%.',
        en: 'The AI review synthesis saved us weeks. We prioritized 2 features and cut churn by 12%.',
      },
      postedAt: new Date('2025-06-02T08:40:00.000Z'),
    },
    {
      id: 'r3',
      name: 'Sarah P.',
      avatar: `${CONFIG.assetsDir}/assets/avatars/avatar-3.webp`,
      rating: 4,
      jobTitle: {
        fr: 'Growth Lead',
        en: 'Growth Lead',
      },
      content: {
        fr: 'Les briefs hebdos partagés dans Slack sont devenus un rituel d’équipe. On repère vite les moves qui comptent.',
        en: 'Weekly briefs shared in Slack became a team ritual. We quickly spot the moves that matter.',
      },
      postedAt: new Date('2025-03-21T17:05:00.000Z'),
    },
  ],
  plans: {
    basic: {
      price: 0,
      included: [
        {
          fr: '1 projet, 2 concurrents suivis',
          en: '1 project, 2 tracked competitors',
        },
        {
          fr: 'Alertes email',
          en: 'Email alerts',
        },
        {
          fr: 'Synthèse d’avis limitée',
          en: 'Limited review synthesis',
        },
      ],
    },
    premium: {
      price: 49,
      included: [
        {
          fr: '5 projets, 15 concurrents/projet',
          en: '5 projects, 15 competitors/project',
        },
        {
          fr: 'Veille features, pricing, landings, pubs',
          en: 'Feature, pricing, landing, ads monitoring',
        },
        {
          fr: 'Intégrations Slack & Notion',
          en: 'Slack & Notion integrations',
        },
        {
          fr: 'Briefs partageables',
          en: 'Shareable briefs',
        },
      ],
    },
    ultimate: {
      price: 169,
      included: [
        {
          fr: 'Illimité projets & concurrents',
          en: 'Unlimited projects & competitors',
        },
        {
          fr: 'IA avancée (sujets, tendances, RCA)',
          en: 'Advanced AI (topics, trends, RCA)',
        },
        {
          fr: 'API & exports',
          en: 'API & exports',
        },
        {
          fr: 'SLA & SSO',
          en: 'SLA & SSO',
        },
      ],
    },
  },
};
