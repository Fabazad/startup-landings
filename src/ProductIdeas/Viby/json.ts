import { RawProductIdea } from 'src/types/ProductIdea';

export const VIBY_PRODUCT_IDEA: RawProductIdea = {
  id: 'viby',
  name: 'Viby',
  isReady: false,
  themeColor: 'purple',
  logo: 'panda',
  keywords: ["viby", "local", "news", "events", "feed", "loyalty", "program", "offers", "push", "social", "events", "reviews", "viby", "local", "actualités", "événements", "fil", "fidélité", "programme", "offres", "push", "social", "événements", "avis"],
  features: [
    {
      id: 'local-news-feed',
      icon: 'mdi:map-marker-radius',
      pain: {
        en: 'Stop posting everywhere: one feed to highlight your events.',
        fr: 'Finies les infos perdues : un fil unique pour vos événements.',
      },
      title: {
        en: 'Local news & events feed',
        fr: 'Fil d’actus & événements locaux',
      },
      items: [
        {
          icon: 'mdi:map-search',
          title: {
            en: 'Show up where people search',
            fr: 'Apparaissez là où on vous cherche',
          },
          description: {
            en: 'Your events, menus and special nights in one feed, sorted by city and neighborhood.',
            fr: 'Vos événements, menus et soirées spéciales réunis dans un seul fil, par ville et quartier.',
          },
        },
        {
          icon: 'mdi:star-face',
          title: {
            en: 'Stand out from competitors',
            fr: 'Démarquez-vous de la concurrence',
          },
          description: {
            en: 'Highlight karaoke, live music or special menus instead of getting lost on social media.',
            fr: 'Mettez en avant karaoké, concerts et menus spéciaux sans vous perdre sur les réseaux sociaux.',
          },
        },
        {
          icon: 'mdi:account-multiple-plus',
          title: {
            en: 'Attract new regulars',
            fr: 'Attirez de nouveaux habitués',
          },
          description: {
            en: 'Reach locals who want to discover new places and turn them into repeat guests.',
            fr: 'Touchez les locaux en quête de nouvelles adresses et transformez-les en habitués.',
          },
        },
      ],
      imgUrl: '/images/features/viby-local-feed.png',
    },
    {
      id: 'loyalty-program',
      icon: 'mdi:card-account-details-star',
      pain: {
        en: 'No more lost stamp cards: one digital loyalty program for every venue.',
        fr: 'Fini les cartes papier perdues : un programme de fidélité digital par établissement.',
      },
      title: {
        en: 'Smart digital loyalty',
        fr: 'Programme de fidélité smart',
      },
      items: [
        {
          icon: 'mdi:cellphone-check',
          title: {
            en: 'All rewards in one app',
            fr: 'Toutes les récompenses dans une app',
          },
          description: {
            en: 'Points, rewards and birthday offers live in Viby instead of many separate systems.',
            fr: 'Points, récompenses et offres anniversaire réunis dans Viby plutôt que dans mille systèmes.',
          },
        },
        {
          icon: 'mdi:chart-line',
          title: {
            en: 'Boost visit frequency',
            fr: 'Augmentez la fréquence de visite',
          },
          description: {
            en: 'Reward repeat guests and encourage them to come one more time each month.',
            fr: 'Récompensez les habitués et incitez-les à venir une fois de plus chaque mois.',
          },
        },
        {
          icon: 'mdi:database-eye',
          title: {
            en: 'Know your best guests',
            fr: 'Mieux connaître vos clients',
          },
          description: {
            en: 'Understand who comes often, what they like and when they usually visit.',
            fr: 'Comprenez qui vient souvent, ce qu’ils aiment et quand ils viennent le plus.',
          },
        },
      ],
      imgUrl: '/images/features/viby-loyalty.png',
    },
    {
      id: 'offers-push',
      icon: 'mdi:bell-ring',
      pain: {
        en: 'Empty tables on slow nights: send the right offer at the right time for free.',
        fr: 'Des tables vides les soirs calmes : envoyez la bonne offre au bon moment gratuitement.',
      },
      title: {
        en: 'Targeted offers & push',
        fr: 'Offres ciblées & notifications',
      },
      items: [
        {
          icon: 'mdi:clock-fast',
          title: {
            en: 'Fill slow services',
            fr: 'Remplissez les services calmes',
          },
          description: {
            en: 'Last-minute happy hours, lunch deals or special menus in two clicks.',
            fr: 'Happy hours de dernière minute, formules midi ou menus spéciaux en deux clics.',
          },
        },
        {
          icon: 'mdi:account-group',
          title: {
            en: 'Talk to the right guests',
            fr: 'Parlez aux bons clients',
          },
          description: {
            en: 'Target loyal members, nearby users or birthday guests with tailored offers.',
            fr: 'Ciblez membres fidèles, utilisateurs proches ou clients qui fêtent leur anniversaire.',
          },
        },
        {
          icon: 'mdi:email-off',
          title: {
            en: 'No email list needed',
            fr: 'Pas besoin de mailing list',
          },
          description: {
            en: 'Reach your audience with mobile push instead of building complex email campaigns.',
            fr: 'Touchez votre audience via des push mobiles sans monter de campagnes email complexes.',
          },
        },
      ],
      imgUrl: '/images/features/viby-push-offers.png',
    },
    {
      id: 'social-events',
      icon: 'mdi:account-heart',
      pain: {
        en: 'People want real connections: make your venue a place to meet, not just eat.',
        fr: 'Les gens veulent du lien : faites de votre lieu un espace de rencontres, pas seulement de repas.',
      },
      title: {
        en: 'Social & community events',
        fr: 'Événements sociaux & communauté',
      },
      items: [
        {
          icon: 'mdi:account-multiple',
          title: {
            en: 'Host friendly meetups',
            fr: 'Organisez des rencontres conviviales',
          },
          description: {
            en: 'Themed dinners, quiz nights or workshops designed to connect your guests.',
            fr: 'Dîners à thème, soirées quiz ou ateliers pensés pour connecter vos clients.',
          },
        },
        {
          icon: 'mdi:calendar-check',
          title: {
            en: 'Manage bookings easily',
            fr: 'Gérez les réservations simplement',
          },
          description: {
            en: 'Guests book their seat in the app, you control the capacity and details.',
            fr: 'Les clients réservent depuis l’app, vous gérez capacité et détails.',
          },
        },
        {
          icon: 'mdi:emoticon-happy-outline',
          title: {
            en: 'Create emotional loyalty',
            fr: 'Créez une fidélité émotionnelle',
          },
          description: {
            en: 'Guests come back for memories and people, not just for a discount.',
            fr: 'Les clients reviennent pour les souvenirs et les rencontres, pas seulement pour une remise.',
          },
        },
      ],
      imgUrl: '/images/features/viby-social-events.png',
    },
    {
      id: 'merchant-dashboard',
      icon: 'mdi:monitor-dashboard',
      pain: {
        en: 'Too many tools, no time: manage loyalty, events and data from one simple dashboard.',
        fr: 'Trop d’outils, pas de temps : gérez fidélité, événements et data depuis un seul tableau de bord.',
      },
      title: {
        en: 'Restaurant dashboard',
        fr: 'Tableau de bord restaurateur',
      },
      items: [
        {
          icon: 'mdi:brush',
          title: {
            en: 'Customize your mini-site',
            fr: 'Personnalisez votre mini-site',
          },
          description: {
            en: 'Logo, photos, menus, events and rewards fully managed from your back-office.',
            fr: 'Logo, photos, menus, événements et récompenses gérés depuis votre back-office.',
          },
        },
        {
          icon: 'mdi:chart-bar',
          title: {
            en: 'Track what works',
            fr: 'Suivez ce qui fonctionne',
          },
          description: {
            en: 'See visits, redemptions and campaign results in clear, actionable reports.',
            fr: 'Visualisez visites, utilisations d’offres et résultats de campagnes dans des rapports clairs.',
          },
        },
        {
          icon: 'mdi:storefront',
          title: {
            en: 'Scale across locations',
            fr: 'Pilotez plusieurs établissements',
          },
          description: {
            en: 'Manage several venues with one account and keep brand experience aligned.',
            fr: 'Gérez plusieurs lieux avec un seul compte et gardez une expérience de marque cohérente.',
          },
        },
      ],
      imgUrl: '/images/features/viby-merchant-dashboard.png',
    },
  ],
  heroTexts: {
    description: {
      en: 'Viby is the all-in-one loyalty and events app for bars and restaurants.\nTurn occasional guests into regulars, fill slow nights and promote your venue in one simple place.',
      fr: 'Viby est l’app tout-en-un de fidélité et d’événements pour bars et restaurants.\nTransformez les clients de passage en habitués, remplissez vos soirées calmes et faites rayonner votre établissement au même endroit.',
    },
    headingPart1: {
      en: 'Fidelize your guests',
      fr: 'Fidélisez vos clients',
    },
    headingPart2: {
      en: 'One app, many venues',
      fr: 'Une app, tous vos lieux',
    },
  },
  reviews: [
    {
      id: 'review-1',
      name: 'Alex R.',
      rating: 5,
      jobTitle: {
        en: 'Restaurant owner',
        fr: 'Propriétaire de restaurant',
      },
      content: {
        en: 'Our lunch service is finally full on Tuesdays thanks to targeted offers in Viby.',
        fr: 'Nos services du midi sont enfin pleins le mardi grâce aux offres ciblées sur Viby.',
      },
      postedAt: new Date('2025-03-05T10:15:00.000Z'),
    },
    {
      id: 'review-2',
      name: 'Sam L.',
      rating: 5,
      jobTitle: {
        en: 'Bar manager',
        fr: 'Gérant de bar',
      },
      content: {
        en: 'Setting up our loyalty program took less than one hour. Guests love the rewards.',
        fr: 'La mise en place du programme fidélité a pris moins d’une heure. Les clients adorent les récompenses.',
      },
      postedAt: new Date('2025-03-12T18:40:00.000Z'),
    },
    {
      id: 'review-3',
      name: 'Jamie T.',
      rating: 5,
      jobTitle: {
        en: 'Marketing manager',
        fr: 'Responsable marketing',
      },
      content: {
        en: 'One dashboard for five venues: we finally see which campaigns really work.',
        fr: 'Un tableau de bord pour cinq lieux : on voit enfin quelles campagnes marchent vraiment.',
      },
      postedAt: new Date('2025-04-01T09:05:00.000Z'),
    },
    {
      id: 'review-4',
      name: 'Riley M.',
      rating: 5,
      jobTitle: {
        en: 'Franchisee',
        fr: 'Franchisé',
      },
      content: {
        en: 'Viby gives us a modern experience without paying for a custom mobile app.',
        fr: 'Viby nous offre une expérience moderne sans payer pour une app mobile sur mesure.',
      },
      postedAt: new Date('2025-04-10T16:20:00.000Z'),
    },
    {
      id: 'review-5',
      name: 'Taylor K.',
      rating: 5,
      jobTitle: {
        en: 'Coffee shop owner',
        fr: 'Propriétaire de coffee shop',
      },
      content: {
        en: 'Customers come back more often since they can see our events and rewards in one place.',
        fr: 'Les clients reviennent plus souvent depuis qu’ils voient nos événements et récompenses au même endroit.',
      },
      postedAt: new Date('2025-04-18T11:30:00.000Z'),
    },
    {
      id: 'review-6',
      name: 'Morgan S.',
      rating: 5,
      jobTitle: {
        en: 'Wine bar manager',
        fr: 'Gérant de bar à vin',
      },
      content: {
        en: 'The social events feature helped us create a real community around our wine nights.',
        fr: 'La fonctionnalité d’événements sociaux nous a permis de créer une vraie communauté autour de nos soirées vin.',
      },
      postedAt: new Date('2025-05-03T19:45:00.000Z'),
    },
    {
      id: 'review-7',
      name: 'Chris D.',
      rating: 4,
      jobTitle: {
        en: 'Restaurant owner',
        fr: 'Restaurateur',
      },
      content: {
        en: 'We quickly saw results. I’d just love even more ready-to-use campaign templates.',
        fr: 'On a vu des résultats très vite. J’aimerais juste encore plus de modèles de campagnes prêts à l’emploi.',
      },
      postedAt: new Date('2025-05-15T14:10:00.000Z'),
    },
    {
      id: 'review-8',
      name: 'Jordan C.',
      rating: 5,
      jobTitle: {
        en: 'Pub manager',
        fr: 'Gérant de pub',
      },
      content: {
        en: 'Push notifications are perfect to fill last-minute quiz and karaoke nights.',
        fr: 'Les notifications push sont parfaites pour remplir nos soirées quiz et karaoké de dernière minute.',
      },
      postedAt: new Date('2025-05-21T20:00:00.000Z'),
    },
    {
      id: 'review-9',
      name: 'Dana P.',
      rating: 5,
      jobTitle: {
        en: 'Multi-site operator',
        fr: 'Gestionnaire multi-sites',
      },
      content: {
        en: 'Managing loyalty across locations is finally easy and consistent with Viby.',
        fr: 'Gérer la fidélité sur plusieurs lieux est enfin simple et cohérent avec Viby.',
      },
      postedAt: new Date('2025-06-02T08:25:00.000Z'),
    },
    {
      id: 'review-10',
      name: 'Lee N.',
      rating: 4,
      jobTitle: {
        en: 'Brasserie owner',
        fr: 'Propriétaire de brasserie',
      },
      content: {
        en: 'Great tool overall. The stats helped us stop discounts that were not useful.',
        fr: 'Excellent outil. Les statistiques nous ont aidés à arrêter des remises peu utiles.',
      },
      postedAt: new Date('2025-06-10T15:55:00.000Z'),
    },
    {
      id: 'review-11',
      name: 'Quinn F.',
      rating: 5,
      jobTitle: {
        en: 'Bistro manager',
        fr: 'Gérant de bistrot',
      },
      content: {
        en: 'Guests love collecting points and discovering our themed nights in the same app.',
        fr: 'Les clients adorent cumuler des points et découvrir nos soirées à thème dans la même app.',
      },
      postedAt: new Date('2025-06-18T17:05:00.000Z'),
    },
    {
      id: 'review-12',
      name: 'Casey H.',
      rating: 5,
      jobTitle: {
        en: 'Hotel bar manager',
        fr: 'Responsable bar d’hôtel',
      },
      content: {
        en: 'Viby became our main channel to talk to regulars and hotel guests in seconds.',
        fr: 'Viby est devenu notre canal principal pour parler aux habitués et aux clients de l’hôtel en quelques secondes.',
      },
      postedAt: new Date('2025-06-25T13:35:00.000Z'),
    },
  ],
  testimonialsTexts: {
    titlePart1: {
      en: 'Trusted by local venues',
      fr: 'Adopté par les lieux de proximité',
    },
    titlePart2: {
      en: 'Loved by their guests',
      fr: 'Plébiscité par leurs clients',
    },
  },
  plans: {
    basic: {
      target: {
        en: 'For small venues starting with digital loyalty and local visibility.',
        fr: 'Pour les petits établissements qui débutent avec la fidélité digitale et la visibilité locale.',
      },
      price: 0,
      included: [
        {
          en: 'Public profile in the Viby app (logo, description, opening hours)',
          fr: 'Fiche publique dans l’app Viby (logo, description, horaires)',
        },
        {
          en: 'Simple points-based loyalty program with one main reward',
          fr: 'Programme de fidélité simple à points avec une récompense principale',
        },
        {
          en: 'Up to 1,000 registered customers in your database',
          fr: 'Jusqu’à 1 000 clients enregistrés dans votre base',
        },
        {
          en: '4 promotional push notifications per month',
          fr: '4 notifications push promotionnelles par mois',
        },
      ],
    },
    premium: {
      target: {
        en: 'For active bars and restaurants that want to boost repeat visits.',
        fr: 'Pour les bars et restaurants actifs qui veulent booster les visites récurrentes.',
      },
      price: 99,
      included: [
        {
          en: 'Advanced branded page with photos, menus and highlighted events',
          fr: 'Page avancée brandée avec photos, menus et événements mis en avant',
        },
        {
          en: 'Flexible loyalty levels, multiple rewards and birthday offers',
          fr: 'Niveaux de fidélité flexibles, multiples récompenses et offres anniversaire',
        },
        {
          en: 'Unlimited push campaigns and access to email/SMS relays via Viby',
          fr: 'Campagnes push illimitées et accès à des relais email/SMS via Viby',
        },
        {
          en: 'Detailed statistics on visits, offers usage and campaign results',
          fr: 'Statistiques détaillées sur visites, usage des offres et résultats des campagnes',
        },
        {
          en: 'Access to social & community events module',
          fr: 'Accès au module d’événements sociaux & communautaires',
        },
      ],
    },
    ultimate: {
      target: {
        en: 'For chains, groups and high-volume venues that need to scale.',
        fr: 'Pour les chaînes, groupes et établissements à fort volume qui doivent passer à l’échelle.',
      },
      price: 249,
      included: [
        {
          en: 'Multi-location management with central and local access rights',
          fr: 'Gestion multi-établissements avec droits d’accès centraux et locaux',
        },
        {
          en: 'Unlimited customers and events across all your venues',
          fr: 'Clients et événements illimités sur l’ensemble de vos lieux',
        },
        {
          en: 'API and POS/CRM integrations on request',
          fr: 'Intégrations API et POS/CRM sur demande',
        },
        {
          en: 'Priority support, onboarding and campaign coaching',
          fr: 'Support prioritaire, onboarding et accompagnement sur les campagnes',
        },
        {
          en: 'Co-branding and advanced customization options',
          fr: 'Co-branding et options de personnalisation avancées',
        },
      ],
    },
  },
  testimonialNumbers: [
    { label: { en: 'Events', fr: 'Événements' }, value: 1500 },
    { label: { en: 'Participants', fr: 'Participants' }, value: 6000 },
  ],
};
