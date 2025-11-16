import { RawProductIdea } from 'src/types/ProductIdea';

export const INSIGHTFEED_JSON: RawProductIdea = {
  id: 'insightfeed',
  name: 'InsightFeed',
  themeColor: 'purple',
  logo: 'octopus',
  heroTexts: {
    description: {
      en: 'A single hub that discovers your SaaS competitors, tracks their pricing, features and marketing, and alerts you in real time so you stay ahead.',
      fr: 'Un hub unique qui découvre vos concurrents SaaS, suit leurs prix, fonctionnalités et marketing, et vous alerte en temps réel pour garder une longueur d’avance.',
    },
    headingPart1: {
      en: 'Know every move',
      fr: 'Suis chaque mouvement',
    },
    headingPart2: {
      en: 'your competitors make',
      fr: 'de vos concurrents',
    },
  },
  features: [
    {
      id: 'auto-competitor-discovery',
      icon: 'mdi-radar',
      pain: {
        en: 'No more manual searching, your closest SaaS competitors are found for you.',
        fr: 'Fini la recherche manuelle, vos concurrents SaaS clés sont trouvés pour vous.',
      },
      title: {
        en: 'Automatic competitor discovery',
        fr: 'Découverte automatique des concurrents',
      },
      items: [
        {
          icon: 'mdi-magnify-scan',
          title: {
            en: 'Smart similarity engine',
            fr: 'Moteur de similarité intelligent',
          },
          description: {
            en: 'Find lookalike SaaS based on category, keywords and tech stack in a few clicks.',
            fr: 'Trouvez des SaaS similaires selon la catégorie, les mots-clés et la stack en quelques clics.',
          },
        },
        {
          icon: 'mdi-view-grid-plus',
          title: {
            en: 'Hidden players revealed',
            fr: 'Acteurs cachés révélés',
          },
          description: {
            en: 'Uncover emerging or niche competitors you would usually miss in manual research.',
            fr: 'Dévoilez les concurrents émergents ou de niche souvent manqués en recherche manuelle.',
          },
        },
        {
          icon: 'mdi-clock-fast',
          title: {
            en: 'Hours of research saved',
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
    {
      id: 'deep-comparison',
      icon: 'mdi-compare',
      pain: {
        en: 'Stop juggling spreadsheets, instantly see how you stack up on features and pricing.',
        fr: 'Finis les tableurs, voyez instantanément comment vous vous situez en prix et en fonctionnalités.',
      },
      title: {
        en: 'Side-by-side offer comparison',
        fr: 'Comparateur d’offres détaillé',
      },
      items: [
        {
          icon: 'mdi-table-large',
          title: {
            en: 'Feature-by-feature matrix',
            fr: 'Matrice fonction par fonction',
          },
          description: {
            en: 'Compare product capabilities, plans and limits in a clean, interactive table.',
            fr: 'Comparez capacités, plans et limites dans un tableau clair et interactif.',
          },
        },
        {
          icon: 'mdi-cash-multiple',
          title: {
            en: 'Pricing & plan insights',
            fr: 'Insights sur les grilles tarifaires',
          },
          description: {
            en: 'Visualize prices, discounts and packaging to spot gaps and reposition fast.',
            fr: 'Visualisez prix, remises et packaging pour repérer les écarts et vous repositionner vite.',
          },
        },
        {
          icon: 'mdi-chart-line',
          title: {
            en: 'Market position snapshot',
            fr: 'Photo de votre position marché',
          },
          description: {
            en: 'See where you lead or lag on value, features and perceived quality at a glance.',
            fr: 'Voyez en un coup d’œil où vous surclassez ou rattrapez la concurrence.',
          },
        },
      ],
      imgUrl: '/images/features/offer-comparison.png',
    },
    {
      id: 'alerts-monitoring',
      icon: 'mdi-bell-alert',
      pain: {
        en: 'No more missed launches or price changes, you’re alerted the moment something moves.',
        fr: 'Ne ratez plus aucun lancement ni changement de prix, vous êtes alerté dès que ça bouge.',
      },
      title: {
        en: 'Always-on product & pricing alerts',
        fr: 'Veille continue produits & prix',
      },
      items: [
        {
          icon: 'mdi-bell-ring',
          title: {
            en: 'Real-time change alerts',
            fr: 'Alertes de changements en temps réel',
          },
          description: {
            en: 'Be notified when pages, pricing, changelogs or fundraises change on competitor sites.',
            fr: 'Soyez notifié dès qu’un site concurrent change ses pages, prix, changelog ou annonces.',
          },
        },
        {
          icon: 'mdi-bullhorn',
          title: {
            en: 'Multi-channel coverage',
            fr: 'Couverture multi-canale',
          },
          description: {
            en: 'Track product updates, reviews, content, ads, social and job posts in one place.',
            fr: 'Suivez mises à jour, avis, contenus, pubs, réseaux sociaux et offres d’emploi au même endroit.',
          },
        },
        {
          icon: 'mdi-folder-clock',
          title: {
            en: 'Never miss a critical move',
            fr: 'Ne manquez plus un mouvement clé',
          },
          description: {
            en: 'Replace manual checks and scattered alerts with one reliable monitoring engine.',
            fr: 'Remplacez vérifications manuelles et Google Alerts dispersées par un moteur unique fiable.',
          },
        },
      ],
      imgUrl: '/images/features/alerts-monitoring.png',
    },
    {
      id: 'marketing-seo-reputation',
      icon: 'mdi-bullseye-arrow',
      pain: {
        en: 'Stop guessing where rivals invest, see their SEO, ads and reputation strategy clearly.',
        fr: 'Cessez de deviner où ils investissent, voyez clairement leur SEO, pubs et réputation.',
      },
      title: {
        en: 'Marketing, SEO & reputation tracking',
        fr: 'Suivi marketing, SEO & réputation',
      },
      items: [
        {
          icon: 'mdi-google-analytics',
          title: {
            en: 'Traffic & keyword trends',
            fr: 'Tendances trafic & mots-clés',
          },
          description: {
            en: 'Monitor estimated traffic and ranking keywords to understand acquisition levers.',
            fr: 'Suivez trafic estimé et mots-clés pour comprendre leurs leviers d’acquisition.',
          },
        },
        {
          icon: 'mdi-badge-account',
          title: {
            en: 'Review & rating monitoring',
            fr: 'Veille avis & notations',
          },
          description: {
            en: 'Track new reviews and ratings to see how customer perception evolves over time.',
            fr: 'Suivez nouveaux avis et notes pour voir évoluer la perception client.',
          },
        },
        {
          icon: 'mdi-billboard',
          title: {
            en: 'Ad & social insights',
            fr: 'Insights pubs & réseaux sociaux',
          },
          description: {
            en: 'Spot new ads, campaigns and social boosts to align or counter-attack smartly.',
            fr: 'Repérez nouvelles pubs, campagnes et boosts sociaux pour réagir intelligemment.',
          },
        },
      ],
      imgUrl: '/images/features/marketing-seo-reputation.png',
    },
    {
      id: 'dashboard-reporting',
      icon: 'mdi-view-dashboard-variant',
      pain: {
        en: 'Forget slides and manual reports, your competitive intel is always summarized for you.',
        fr: 'Oubliez slides et rapports manuels, votre veille est toujours synthétisée pour vous.',
      },
      title: {
        en: 'Central dashboard & automated reports',
        fr: 'Tableau de bord central & rapports auto',
      },
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: {
            en: 'One command center',
            fr: 'Un centre de commande unique',
          },
          description: {
            en: 'See competitor moves, gaps and trends in a live dashboard tailored to SaaS teams.',
            fr: 'Visualisez mouvements, écarts et tendances dans un dashboard pensé pour les équipes SaaS.',
          },
        },
        {
          icon: 'mdi-file-chart',
          title: {
            en: 'Scheduled executive reports',
            fr: 'Rapports exécutifs programmés',
          },
          description: {
            en: 'Send weekly or monthly digests to founders, product and marketing automatically.',
            fr: 'Envoyez des synthèses hebdo ou mensuelles aux fondateurs, produit et marketing automatiquement.',
          },
        },
        {
          icon: 'mdi-shield-check',
          title: {
            en: 'Battle-ready sales cards',
            fr: 'Battle cards prêtes pour la vente',
          },
          description: {
            en: 'Generate battle cards outlining strengths and weaknesses for each key rival.',
            fr: 'Générez des battle cards avec forces et faiblesses pour chaque rival clé.',
          },
        },
      ],
      imgUrl: '/images/features/dashboard-reporting.png',
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
