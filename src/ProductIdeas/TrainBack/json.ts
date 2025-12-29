import { RawProductIdea } from 'src/types/ProductIdea';

export const TRAIN_BACK_PRODUCT_IDEA: RawProductIdea = {
  id: 'train-back',
  name: 'Train Back',
  isReady: false,
  themeColor: 'blue',
  logo: 'octopus',
  ctaName: { en: 'Get your first refund', fr: 'Obtiens ton premier remboursement' },
  heroTexts: {
    description: {
      en: 'Train Back scans your SNCF trips, spots every eligible delay, files the claim for you and sends you the money. No forms, no stress, just refunds you should never have missed.',
      fr: 'Train Back analyse tes trajets SNCF, repère chaque retard indemnisable, fait la demande à ta place et t’envoie l’argent.\nAucun formulaire, zéro prise de tête, juste les remboursements que tu ne touchais pas.',
    },
    headingPart1: {
      en: 'Recover your',
      fr: 'Récupère tes',
    },
    headingPart2: {
      en: 'SNCF refunds',
      fr: 'retards SNCF',
    },
  },
  features: [
    {
      id: 'auto-sync-trips',
      icon: 'mdi:train-car-passenger',
      pain: {
        en: 'No more logging trips: we auto-sync all your SNCF journeys.',
        fr: 'Plus besoin de noter : on récupère tous tes trajets SNCF.',
      },
      title: {
        en: 'Automatic SNCF trip import',
        fr: 'Import automatique de tes trajets',
      },
      items: [
        {
          icon: 'mdi:account-sync',
          title: {
            en: 'Connect your SNCF account',
            fr: 'Connecte ton compte SNCF',
          },
          description: {
            en: 'Secure link with SNCF Connect to pull your past and future trips in a few clicks.',
            fr: 'Connexion sécurisée à SNCF Connect pour récupérer tes trajets passés et à venir en quelques clics.',
          },
        },
        {
          icon: 'mdi:cloud-sync',
          title: {
            en: 'History restored',
            fr: 'Historique restauré',
          },
          description: {
            en: 'We import up to the last 12–24 months to detect old refunds you never claimed.',
            fr: 'On importe jusqu’aux 12–24 derniers mois pour retrouver des remboursements jamais réclamés.',
          },
        },
        {
          icon: 'mdi:bell-ring',
          title: {
            en: 'New trips tracked',
            fr: 'Nouveaux trajets suivis',
          },
          description: {
            en: 'Every new ticket is automatically monitored so you never miss a delay again.',
            fr: 'Chaque nouveau billet est suivi automatiquement pour que tu ne rates plus jamais un retard indemnisable.',
          },
        },
      ],
      imgUrl: '/images/features/train-back-sync.png',
    },
    {
      id: 'delay-detection',
      icon: 'mdi:alarm-multiple',
      pain: {
        en: 'Stop guessing delays: we tell you when a refund is due.',
        fr: 'Fini les doutes : on t’alerte dès qu’un retard est indemnisable.',
      },
      title: {
        en: 'Smart delay eligibility check',
        fr: 'Détection intelligente des retards indemnisables',
      },
      items: [
        {
          icon: 'mdi:database-search',
          title: {
            en: 'Real delay data',
            fr: 'Données de retard réelles',
          },
          description: {
            en: 'We match your trains with official delay data and SNCF rules.',
            fr: 'On fait correspondre tes trains avec les données officielles de retard et les règles SNCF.',
          },
        },
        {
          icon: 'mdi:scale-balance',
          title: {
            en: 'G30 rules decoded',
            fr: 'Règles G30 simplifiées',
          },
          description: {
            en: 'We check ticket type and compensation thresholds so you do not have to read the fine print.',
            fr: 'On vérifie le type de billet et les seuils d’indemnisation pour t’éviter de lire les petites lignes.',
          },
        },
        {
          icon: 'mdi:bell-alert',
          title: {
            en: 'Instant alerts',
            fr: 'Alertes instantanées',
          },
          description: {
            en: 'Get notified as soon as a trip becomes eligible for compensation.',
            fr: 'Sois averti dès qu’un trajet devient éligible à une indemnité.',
          },
        },
      ],
      imgUrl: '/images/features/train-back-detection.png',
    },
    {
      id: 'auto-claims',
      icon: 'mdi:clipboard-check-outline',
      pain: {
        en: 'Skip the forms: we file and follow every claim for you.',
        fr: 'Oublie les formulaires : on gère les demandes de A à Z.',
      },
      title: {
        en: 'Fully automated claims',
        fr: 'Démarches 100% automatisées',
      },
      items: [
        {
          icon: 'mdi:form-select',
          title: {
            en: 'Forms filled for you',
            fr: 'Formulaires pré-remplis',
          },
          description: {
            en: 'We complete SNCF forms with your trip data and required proofs automatically.',
            fr: 'On remplit les formulaires SNCF avec tes données de trajet et les justificatifs nécessaires, automatiquement.',
          },
        },
        {
          icon: 'mdi:repeat',
          title: {
            en: 'Follow-ups & disputes',
            fr: 'Relances & litiges',
          },
          description: {
            en: 'We handle follow-ups and challenge unfair refusals on your behalf.',
            fr: 'On gère les relances et conteste les refus abusifs à ta place.',
          },
        },
        {
          icon: 'mdi:shield-check',
          title: {
            en: 'Secure, compliant',
            fr: 'Sécurisé & conforme',
          },
          description: {
            en: 'Your data is encrypted and used only to process your compensation claims.',
            fr: 'Tes données sont chiffrées et utilisées uniquement pour traiter tes indemnisations.',
          },
        },
      ],
      imgUrl: '/images/features/train-back-claims.png',
    },
    {
      id: 'payout-dashboard',
      icon: 'mdi:chart-line',
      pain: {
        en: 'See how much you’ve earned: refunds tracked in one place.',
        fr: 'Visualise tout ce que tu as récupéré, dossier par dossier.',
      },
      title: {
        en: 'Refunds & payout dashboard',
        fr: 'Tableau de bord des gains',
      },
      items: [
        {
          icon: 'mdi:cash-multiple',
          title: {
            en: 'Total recovered',
            fr: 'Total récupéré',
          },
          description: {
            en: 'See how much money Train Back has brought back to your pocket.',
            fr: 'Vois combien d’argent Train Back a déjà remis dans ta poche.',
          },
        },
        {
          icon: 'mdi:progress-check',
          title: {
            en: 'Case status at a glance',
            fr: 'Suivi clair des dossiers',
          },
          description: {
            en: 'Track ongoing, paid, refused or disputed claims in real time.',
            fr: 'Suis en temps réel les dossiers en cours, payés, refusés ou en litige.',
          },
        },
        {
          icon: 'mdi:bank-transfer',
          title: {
            en: 'Simple payouts',
            fr: 'Versements simplifiés',
          },
          description: {
            en: 'Receive your money monthly or instantly, depending on your plan.',
            fr: 'Reçois ton argent une fois par mois ou instantanément selon ton offre.',
          },
        },
      ],
      imgUrl: '/images/features/train-back-dashboard.png',
    },
    {
      id: 'multi-transport',
      icon: 'mdi:airplane-train',
      pain: {
        en: 'One app for all trips: SNCF now, other operators next.',
        fr: 'Une seule app pour tous tes trajets, en France puis en Europe.',
      },
      title: {
        en: 'Multi-operator & multi-country',
        fr: 'Multi-opérateurs & multi-pays',
      },
      items: [
        {
          icon: 'mdi:train',
          title: {
            en: 'Beyond SNCF',
            fr: 'Au-delà de la SNCF',
          },
          description: {
            en: 'Support for OUIGO, TER, TGV and more operators as we expand.',
            fr: 'Prise en charge de OUIGO, TER, TGV et d’autres opérateurs au fil du temps.',
          },
        },
        {
          icon: 'mdi:earth',
          title: {
            en: 'European coverage',
            fr: 'Couverture européenne',
          },
          description: {
            en: 'Renfe, Trenitalia, Eurostar and others in your pocket with one single app.',
            fr: 'Renfe, Trenitalia, Eurostar et d’autres réunis dans une seule application.',
          },
        },
        {
          icon: 'mdi:rocket-launch',
          title: {
            en: 'Future-proof',
            fr: 'Pensé pour la suite',
          },
          description: {
            en: 'Start with trains in France, grow into your global travel companion.',
            fr: 'On commence avec les trains en France, on devient ton copilote voyage partout.',
          },
        },
      ],
      imgUrl: '/images/features/train-back-multi.png',
    },
  ],
  testimonialsTexts: {
    titlePart1: {
      en: 'Loved by frequent',
      fr: 'Adorée par les voyageurs',
    },
    titlePart2: {
      en: 'train travellers',
      fr: 'qui prennent souvent le train',
    },
  },
  reviews: [
    {
      id: 'rev-1',
      name: 'Alex L.',
      rating: 5,
      jobTitle: {
        en: 'Daily commuter',
        fr: 'Voyageur pendulaire',
      },
      content: {
        en: 'I recovered more than €180 in two months without filling a single form. Magic.',
        fr: 'J’ai récupéré plus de 180€ en deux mois sans remplir un seul formulaire. Magique.',
      },
      postedAt: new Date('2025-03-04T09:15:00.000Z'),
    },
    {
      id: 'rev-2',
      name: 'Sam P.',
      rating: 5,
      jobTitle: {
        en: 'Sales representative',
        fr: 'Commercial itinérant',
      },
      content: {
        en: 'Train Back turned my delays into a new line of income on my expense report.',
        fr: 'Train Back a transformé mes retards en nouvelle ligne de revenus sur mes notes de frais.',
      },
      postedAt: new Date('2025-02-18T17:20:00.000Z'),
    },
    {
      id: 'rev-3',
      name: 'Noa R.',
      rating: 4,
      jobTitle: {
        en: 'Student',
        fr: 'Étudiant·e',
      },
      content: {
        en: 'The app is super simple and the extra €30 here and there really helps.',
        fr: 'L’app est super simple et les 30€ récupérés par-ci par-là font vraiment la différence.',
      },
      postedAt: new Date('2025-01-29T14:05:00.000Z'),
    },
    {
      id: 'rev-4',
      name: 'Charlie M.',
      rating: 5,
      jobTitle: {
        en: 'Consultant',
        fr: 'Consultant·e',
      },
      content: {
        en: 'I used to forget every claim. Now I just check the dashboard and get paid.',
        fr: 'Avant j’oubliais tout. Maintenant je regarde le tableau de bord et je suis payé.',
      },
      postedAt: new Date('2025-04-02T11:40:00.000Z'),
    },
    {
      id: 'rev-5',
      name: 'Eden T.',
      rating: 5,
      jobTitle: {
        en: 'Tech employee',
        fr: 'Employé·e dans la tech',
      },
      content: {
        en: 'Setup took two minutes. Since then, every delay is handled automatically.',
        fr: 'Installation en deux minutes. Depuis, chaque retard est géré automatiquement.',
      },
      postedAt: new Date('2025-03-10T08:30:00.000Z'),
    },
    {
      id: 'rev-6',
      name: 'Leo S.',
      rating: 4,
      jobTitle: {
        en: 'Weekend traveller',
        fr: 'Voyageur·se du week-end',
      },
      content: {
        en: 'Perfect for my leisure trips. I just wish I had discovered it earlier.',
        fr: 'Parfait pour mes trajets loisirs. J’aurais aimé découvrir ça plus tôt.',
      },
      postedAt: new Date('2025-05-01T19:00:00.000Z'),
    },
    {
      id: 'rev-7',
      name: 'Riley D.',
      rating: 5,
      jobTitle: {
        en: 'Freelance trainer',
        fr: 'Formateur·rice freelance',
      },
      content: {
        en: 'Delays used to stress me. Now I smile, knowing Train Back will claim for me.',
        fr: 'Les retards me stressaient. Maintenant je souris, je sais que Train Back va réclamer pour moi.',
      },
      postedAt: new Date('2025-03-22T16:10:00.000Z'),
    },
    {
      id: 'rev-8',
      name: 'Morgan J.',
      rating: 5,
      jobTitle: {
        en: 'HR manager',
        fr: 'Responsable RH',
      },
      content: {
        en: 'We recommend it to our frequent travellers. Less admin, more money back.',
        fr: 'On le recommande à nos collaborateurs qui voyagent beaucoup. Moins d’admin, plus de remboursements.',
      },
      postedAt: new Date('2025-04-15T10:45:00.000Z'),
    },
    {
      id: 'rev-9',
      name: 'Jamie K.',
      rating: 5,
      jobTitle: {
        en: 'Engineer',
        fr: 'Ingénieur·e',
      },
      content: {
        en: 'The monthly payout recap is super motivating. You see every euro you saved.',
        fr: 'Le récap mensuel des gains est ultra motivant. Tu vois chaque euro récupéré.',
      },
      postedAt: new Date('2025-05-03T12:25:00.000Z'),
    },
    {
      id: 'rev-10',
      name: 'Sasha C.',
      rating: 5,
      jobTitle: {
        en: 'Intern',
        fr: 'Stagiaire',
      },
      content: {
        en: 'On a tight budget, even a small refund matters. Train Back handles it all.',
        fr: 'Avec un petit budget, chaque remboursement compte. Train Back s’occupe de tout.',
      },
      postedAt: new Date('2025-02-05T15:35:00.000Z'),
    },
    {
      id: 'rev-11',
      name: 'Robin F.',
      rating: 5,
      jobTitle: {
        en: 'Account manager',
        fr: 'Account manager',
      },
      content: {
        en: 'My SNCF delays are finally tracked like my expenses. Super clear and efficient.',
        fr: 'Mes retards SNCF sont enfin suivis comme mes notes de frais. Super clair et efficace.',
      },
      postedAt: new Date('2025-03-30T13:50:00.000Z'),
    },
    {
      id: 'rev-12',
      name: 'Jordan N.',
      rating: 5,
      jobTitle: {
        en: 'Frequent traveller',
        fr: 'Grand voyageur·se',
      },
      content: {
        en: 'One app for all my trains and refunds. I barely touch it and money arrives.',
        fr: 'Une seule app pour tous mes trains et remboursements. Je n’y touche presque pas et l’argent arrive.',
      },
      postedAt: new Date('2025-04-25T18:05:00.000Z'),
    },
  ],
  plans: {
    basic: {
      target: {
        en: 'Occasional travellers who want to try the service risk-free.',
        fr: 'Voyageurs occasionnels qui veulent tester le service sans risque.',
      },
      price: 0,
      included: [
        {
          en: 'Automatic SNCF trip import from your account',
          fr: 'Import automatique de tes trajets SNCF depuis ton compte',
        },
        {
          en: 'Automatic detection of eligible delays',
          fr: 'Détection automatique des retards indemnisables',
        },
        {
          en: 'No win, no fee: 25% commission on recovered refunds',
          fr: 'No win, no fee : 25% de commission sur les montants récupérés',
        },
        {
          en: 'Monthly payout when refunds are validated',
          fr: 'Versement mensuel dès validation des remboursements',
        },
      ],
    },
    premium: {
      target: {
        en: 'Regular commuters and frequent SNCF users who want to maximise payouts.',
        fr: 'Pendulaires et utilisateurs réguliers de la SNCF qui veulent maximiser leurs gains.',
      },
      price: 5,
      included: [
        {
          en: 'Everything in Basic, with priority processing',
          fr: 'Tout le Basic, avec traitement prioritaire des dossiers',
        },
        {
          en: 'Reduced commission: 15% on recovered refunds',
          fr: 'Commission réduite : 15% sur les montants récupérés',
        },
        {
          en: 'Instant or faster payouts after approval',
          fr: 'Versements plus rapides ou instantanés après validation',
        },
        {
          en: 'Support for OUIGO, TER and TGV within the app',
          fr: 'Prise en charge de OUIGO, TER et TGV dans l’app',
        },
        {
          en: 'Detailed monthly report of your recovered amounts',
          fr: 'Rapport mensuel détaillé de tes montants récupérés',
        },
      ],
    },
    ultimate: {
      target: {
        en: 'Business travellers and companies who travel a lot and hate paperwork.',
        fr: 'Business travelers et entreprises qui voyagent beaucoup et détestent la paperasse.',
      },
      price: 15,
      included: [
        {
          en: '0–5% commission on refunds depending on volume',
          fr: '0–5% de commission sur les remboursements selon le volume',
        },
        {
          en: 'Multi-operator, multi-country coverage (Renfe, Trenitalia, Eurostar, etc.)',
          fr: 'Couverture multi-opérateurs et multi-pays (Renfe, Trenitalia, Eurostar, etc.)',
        },
        {
          en: 'Advanced handling of disputes and complex claims',
          fr: 'Gestion avancée des litiges et dossiers complexes',
        },
        {
          en: 'Priority support and dedicated assistance',
          fr: 'Support prioritaire et accompagnement dédié',
        },
        {
          en: 'Team or company accounts with centralised reporting',
          fr: 'Comptes équipe ou entreprise avec reporting centralisé',
        },
      ],
    },
  },
  testimonialNumbers: [
    { label: { en: 'Refunds', fr: 'Remboursements' }, value: 750 },
    { label: { en: 'Refund amount', fr: 'Montant des remboursements' }, value: 120000, unit: '€' },
    { label: { en: 'Trains with delays', fr: 'Trajets avec retards' }, value: 2500 },
  ],
};
