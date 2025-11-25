import { RawProductIdea } from 'src/types/ProductIdea';

export const INSIGHTFEED_JSON: RawProductIdea = {
  id: 'insightfeed',
  name: 'Insight Feed',
  isReady: false,
  themeColor: 'purple',
  logo: 'octopus',
  heroTexts: {
    description: {
      en: 'Identify competitors. Track pricing, features, ads, user feedback and more.\nGet real-time insights to act fast and stay ahead.',
      fr: 'Identifiez vos concurrents. Suivez leurs prix, fonctionnalités, pubs, retours utilisateurs et plus encore.\nRecevez des alertes en temps réel. Réagissez vite et gardez une longueur d’avance.',
    },
    headingPart1: {
      en: 'Know every move',
      fr: 'Suivez chaque mouvement',
    },
    headingPart2: {
      en: 'your competitors make',
      fr: 'de vos concurrents',
    },
  },
  features: [
    {
      id: 'deep-comparison',
      icon: 'mdi-compare',
      pain: {
        en: 'Manual benchmarking is slow, painful and outdated the second it’s done. We removes all the grunt work by automating it for you.',
        fr: 'Le benchmark manuel est une perte de temps. Une fois fait, il devient vite obsolète. On l’automatise de A à Z pour vous.',
      },
      title: {
        en: 'Automated Competitor Benchmarking & Reporting',
        fr: 'Benchmark concurrentiel & reporting, automatisés',
      },
      items: [
        {
          icon: 'mdi-table-large',
          title: {
            en: 'No More Messy Spreadsheets',
            fr: 'Fini les tableurs ingérables',
          },
          description: {
            en: 'All your benchmarking insights live in one clean, shareable dashboard — no tabs, no chaos.',
            fr: 'Toutes vos insights sont regroupés dans un tableau clair et partagable — pas de tabs, pas de chaos.',
          },
        },
        {
          icon: 'mdi-cash-multiple',
          title: {
            en: 'Always Up to Date',
            fr: 'Toujours à jour',
          },
          description: {
            en: 'Your competitor comparison updates automatically — no manual work needed.',
            fr: 'Votre comparatif concurrentiel se met à jour automatiquement — aucun travail manuel nécessaire.',
          },
        },
        {
          icon: 'mdi-chart-line',
          title: {
            en: 'See Strengths, Gaps and Opportunities Instantly',
            fr: 'Vos forces, faiblesses et opportunités en un coup d’œil',
          },
          description: {
            en: 'Spot where you lead, where you lag and what your competitors are missing — in minutes, not days.',
            fr: 'Identifiez vos forces, vos faiblesses et les opportunités que vos concurrents ignorent — en minutes, pas en jours.',
          },
        },
      ],
      imgUrl: '/images/features/offer-comparison.png',
    },
    {
      id: 'alerts-monitoring',
      icon: 'mdi-bell-alert',
      pain: {
        en: 'Never miss an important update again — we notify you the moment competitors move.',
        fr: 'Ne ratez plus aucun changement clé — on vous alerte dès que vos concurrents bougent.',
      },
      title: {
        en: 'Always-on Key Changes Alerts',
        fr: 'Alertes continues sur les changements clés',
      },
      items: [
        {
          icon: 'mdi-bell-ring',
          title: {
            en: 'Real-Time Change Alerts',
            fr: 'Alertes en temps réel',
          },
          description: {
            en: 'Features, pricing, reviews, ads and more — you know the moment it happens.',
            fr: 'Fonctionnalités, prix, avis, pubs et plus encore — vous saurez quand ça arrive.',
          },
        },
        {
          icon: 'mdi-bullhorn',
          title: {
            en: 'Multi-Channel Coverage',
            fr: 'Suivi Multi-Canal',
          },
          description: {
            en: 'Track everything, in one place.',
            fr: 'Suivez tout, à un seul endroit.',
          },
        },
        {
          icon: 'mdi-folder-clock',
          title: {
            en: 'Never Miss a Critical Move.',
            fr: 'Ne Ratez Plus Aucune Information Critique.',
          },
          description: {
            en: 'Replace manual checks and scattered alerts with one reliable monitoring engine.',
            fr: 'Fini les vérifications manuelles et les alertes éparpillées : tout est surveillé automatiquement pour vous.',
          },
        },
      ],
      imgUrl: '/images/features/alerts-monitoring.png',
    },
    {
      id: 'auto-competitor-discovery',
      icon: 'mdi-radar',
      pain: {
        en: 'Stop guessing who your competitors are — we find them and alert you when new ones appear.',
        fr: 'Cessez de deviner qui sont vos concurrents — on les trouve et vous alerte quand de nouveaux arrivent sur le marché.',
      },
      title: {
        en: 'Automatic Competitor Discovery & New Players',
        fr: 'Découverte Automatique des Concurrents & Nouveaux Acteurs',
      },
      items: [
        {
          icon: 'mdi-magnify-scan',
          title: {
            en: 'Smart Similarity Engine',
            fr: 'Moteur de similarité intelligent',
          },
          description: {
            en: 'Find lookalike SaaS based on category, keywords and features without endless Google searches.',
            fr: 'Trouvez les SaaS similaires selon la catégorie et mots-clés sans passer des heures à fouiller sur Google.',
          },
        },
        {
          icon: 'mdi-view-grid-plus',
          title: {
            en: 'New Players Detection',
            fr: 'Détection des Nouveaux Acteurs',
          },
          description: {
            en: 'Uncover emerging or niche competitors you would usually miss in manual research.',
            fr: 'Repérez les concurrents émergents ou de niche souvent manqués en recherche manuelle.',
          },
        },
        {
          icon: 'mdi-clock-fast',
          title: {
            en: 'Hours of Research Saved',
            fr: 'Des heures de recherche économisées',
          },
          description: {
            en: 'Replace scattered Google searches and spreadsheets with one automated scan.',
            fr: 'Remplacez Google, tableaux et notes dispersés par un scan automatisé unique.',
          },
        },
      ],
      imgUrl: '/images/features/auto-competitor-discovery.png',
    },
  ],
  testimonialsTexts: {
    titlePart1: {
      en: 'Trusted by SaaS',
      fr: 'Plébiscité par les équipes',
    },
    titlePart2: {
      en: 'founders, PMs and marketers',
      fr: 'fondateurs, PM et marketeurs SaaS',
    },
  },
  reviews: [
    {
      id: 'rev-1',
      name: 'Alex R.',
      rating: 5,
      jobTitle: {
        en: 'SaaS Founder',
        fr: 'Fondateur SaaS',
      },
      content: {
        en: 'We stopped guessing our positioning. InsightFeed shows exactly where we must improve.',
        fr: 'On a arrêté de deviner notre positionnement. InsightFeed montre exactement où s’améliorer.',
      },
      postedAt: new Date('2025-03-02T10:15:00.000Z'),
    },
    {
      id: 'rev-2',
      name: 'Sam K.',
      rating: 5,
      jobTitle: {
        en: 'Product Manager',
        fr: 'Product Manager',
      },
      content: {
        en: 'The alerts saved us from being blindsided by a major competitor launch twice already.',
        fr: 'Les alertes nous ont évité d’être surpris par deux gros lancements concurrents.',
      },
      postedAt: new Date('2025-03-10T09:00:00.000Z'),
    },
    {
      id: 'rev-3',
      name: 'Jordan L.',
      rating: 5,
      jobTitle: {
        en: 'Product Marketing Manager',
        fr: 'Product Marketing Manager',
      },
      content: {
        en: 'Our battle cards now update themselves. Sales finally has fresh, reliable intel.',
        fr: 'Nos battle cards se mettent à jour seules. Les sales ont enfin une veille à jour.',
      },
      postedAt: new Date('2025-03-18T14:30:00.000Z'),
    },
    {
      id: 'rev-4',
      name: 'Taylor D.',
      rating: 4,
      jobTitle: {
        en: 'Growth Lead',
        fr: 'Responsable Growth',
      },
      content: {
        en: 'Great overview of SEO and ads. I’d love even more filters, but it’s already powerful.',
        fr: 'Super vue d’ensemble du SEO et des pubs. J’aimerais encore plus de filtres, mais c’est déjà très puissant.',
      },
      postedAt: new Date('2025-03-25T11:45:00.000Z'),
    },
    {
      id: 'rev-5',
      name: 'Chris P.',
      rating: 5,
      jobTitle: {
        en: 'Startup CEO',
        fr: 'CEO de startup',
      },
      content: {
        en: 'In one month we killed two tools and one spreadsheet thanks to this unified dashboard.',
        fr: 'En un mois, on a remplacé deux outils et un tableur grâce à ce dashboard unifié.',
      },
      postedAt: new Date('2025-04-01T08:20:00.000Z'),
    },
    {
      id: 'rev-6',
      name: 'Robin S.',
      rating: 5,
      jobTitle: {
        en: 'Competitive Intelligence Analyst',
        fr: 'Analyste veille concurrentielle',
      },
      content: {
        en: 'Monitoring 40+ competitors would be impossible manually. Now it’s just part of my routine.',
        fr: 'Suivre plus de 40 concurrents serait impossible à la main. Maintenant c’est juste ma routine.',
      },
      postedAt: new Date('2025-04-08T16:05:00.000Z'),
    },
    {
      id: 'rev-7',
      name: 'Morgan T.',
      rating: 5,
      jobTitle: {
        en: 'Head of Marketing',
        fr: 'Head of Marketing',
      },
      content: {
        en: 'I know exactly where rivals invest in content and ads, and where we can outplay them.',
        fr: 'Je sais exactement où nos rivaux investissent en contenu et pubs, et où les dépasser.',
      },
      postedAt: new Date('2025-04-15T13:10:00.000Z'),
    },
    {
      id: 'rev-8',
      name: 'Jamie C.',
      rating: 4,
      jobTitle: {
        en: 'VP Product',
        fr: 'VP Product',
      },
      content: {
        en: 'The feature comparison matrix is gold. UI could be denser, but insights are spot on.',
        fr: 'La matrice de comparaison est en or. L’UI pourrait être plus dense, mais les insights sont parfaits.',
      },
      postedAt: new Date('2025-04-22T17:40:00.000Z'),
    },
    {
      id: 'rev-9',
      name: 'Lee M.',
      rating: 5,
      jobTitle: {
        en: 'SaaS Founder',
        fr: 'Fondateur SaaS',
      },
      content: {
        en: 'We use the weekly report in every leadership meeting. It became our market radar.',
        fr: 'On utilise le rapport hebdo à chaque comité. C’est devenu notre radar marché.',
      },
      postedAt: new Date('2025-04-29T09:55:00.000Z'),
    },
    {
      id: 'rev-10',
      name: 'Riley F.',
      rating: 5,
      jobTitle: {
        en: 'Product Ops',
        fr: 'Product Ops',
      },
      content: {
        en: 'Setup took less than an hour and the first insights landed the same day.',
        fr: 'La mise en place a pris moins d’une heure et les premiers insights sont tombés le jour même.',
      },
      postedAt: new Date('2025-05-03T15:25:00.000Z'),
    },
    {
      id: 'rev-11',
      name: 'Noah J.',
      rating: 5,
      jobTitle: {
        en: 'Marketing Manager',
        fr: 'Marketing Manager',
      },
      content: {
        en: 'Finally a tool that centralizes SEO, reviews and ads instead of adding yet another silo.',
        fr: 'Enfin un outil qui centralise SEO, avis et pubs au lieu d’ajouter un silo de plus.',
      },
      postedAt: new Date('2025-05-10T12:00:00.000Z'),
    },
    {
      id: 'rev-12',
      name: 'Casey B.',
      rating: 5,
      jobTitle: {
        en: 'Head of Sales Enablement',
        fr: 'Head of Sales Enablement',
      },
      content: {
        en: 'Our reps feel armed in calls. The competitive cards are always fresh and actionable.',
        fr: 'Nos sales se sentent armés en call. Les fiches concurrentes sont toujours fraîches et actionnables.',
      },
      postedAt: new Date('2025-05-16T10:10:00.000Z'),
    },
  ],
  plans: {
    basic: {
      target: {
        en: 'Solo founders and early-stage teams',
        fr: 'Fondateurs solos et équipes early-stage',
      },
      price: 49,
      included: [
        {
          en: 'Track up to 5 competitors with core pages monitored (site, pricing, blog).',
          fr: 'Suivi jusqu’à 5 concurrents avec surveillance des pages clés (site, tarifs, blog).',
        },
        {
          en: 'Monthly email digest summarizing key product and pricing changes.',
          fr: 'Synthèse mensuelle par email des principaux changements produits et prix.',
        },
        {
          en: 'Automatic competitor discovery from keywords and categories.',
          fr: 'Découverte automatique de concurrents à partir de mots-clés et catégories.',
        },
        {
          en: '1 user seat, ideal for solo founders and early-stage teams.',
          fr: '1 utilisateur, idéal pour fondateurs solos et équipes early-stage.',
        },
        {
          en: 'Essential comparison table for features and pricing.',
          fr: 'Tableau de comparaison essentiel pour fonctionnalités et tarifs.',
        },
      ],
    },
    premium: {
      target: {
        en: 'Mid-stage teams and growth-focused startups',
        fr: 'Équipes mid-stage et startups growth-focused',
      },
      price: 99,
      included: [
        {
          en: 'Monitor up to 20 competitors with deeper coverage.',
          fr: 'Suivi jusqu’à 20 concurrents avec couverture avancée.',
        },
        {
          en: 'Near real-time alerts for major product, pricing and content changes.',
          fr: 'Alertes quasi temps réel sur les changements majeurs produit, prix et contenu.',
        },
        {
          en: 'Marketing, SEO and social visibility insights included.',
          fr: 'Insights marketing, SEO et visibilité sociale inclus.',
        },
        {
          en: '5 user seats for founders, product and marketing teams.',
          fr: '5 utilisateurs pour fondateurs, produit et marketing.',
        },
        {
          en: 'Customizable reports and Slack / email integrations.',
          fr: 'Rapports personnalisables et intégrations Slack / email.',
        },
        {
          en: 'Export comparison and reports to PDF or CSV.',
          fr: 'Export des comparatifs et rapports en PDF ou CSV.',
        },
      ],
    },
    ultimate: {
      target: {
        en: 'Enterprise-scale teams and growth-focused startups',
        fr: 'Équipes enterprise-scale',
      },
      price: 299,
      included: [
        {
          en: '50+ competitors, segmented by market, geography or product line.',
          fr: '50+ concurrents, segmentés par marché, zone ou ligne de produit.',
        },
        {
          en: 'Real-time alerts with advanced filters and priority routing.',
          fr: 'Alertes temps réel avec filtres avancés et routage prioritaire.',
        },
        {
          en: 'Unlimited users with role-based access for sales, product and leadership.',
          fr: 'Utilisateurs illimités avec accès par rôle pour sales, produit et direction.',
        },
        {
          en: 'Custom dashboards, battle cards and enterprise-grade reporting.',
          fr: 'Dashboards sur-mesure, battle cards et reporting niveau entreprise.',
        },
        {
          en: 'Dedicated onboarding, training sessions and priority support SLA.',
          fr: 'Onboarding dédié, sessions de formation et support prioritaire avec SLA.',
        },
        {
          en: 'API access and advanced integrations (CRM, BI, data warehouse).',
          fr: 'Accès API et intégrations avancées (CRM, BI, data warehouse).',
        },
      ],
    },
  },
};
