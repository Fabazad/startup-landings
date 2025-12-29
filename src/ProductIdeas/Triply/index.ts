import { CONFIG } from 'src/config-global';
import { RawProductIdea } from 'src/types/ProductIdea';

export const TRIPLY_PRODUCT_IDEA: RawProductIdea = {
  id: 'triply',
  name: 'Triply',
  isReady: false,
  themeColor: 'orange',
  logo: 'panda',
  ctaName: { en: 'Plan your first trip', fr: 'Planifie ton premier voyage' },
  features: [
    {
      id: 'f1',
      icon: 'lucide:map',
      pain: {
        en: 'Plans scattered across too many tools',
        fr: 'Plans éparpillés dans trop d’outils',
      },
      title: {
        en: 'All-in-one Trip/Event Hub',
        fr: 'Hub tout-en-un Voyage/Événement',
      },
      items: [
        {
          icon: 'lucide:layout-dashboard',
          title: {
            en: 'Smart Dashboard',
            fr: 'Tableau de bord malin',
          },
          description: {
            en: 'Dates, place, people, tasks, expenses and polls at a glance.',
            fr: 'Dates, lieu, participants, tâches, dépenses et votes en un coup d’œil.',
          },
        },
        {
          icon: 'lucide:widgets',
          title: {
            en: 'Modular Sections',
            fr: 'Sections modulables',
          },
          description: {
            en: 'Itinerary, stays, transport, activities, meals, checklists and more.',
            fr: 'Itinéraire, logements, transports, activités, repas, checklists, etc.',
          },
        },
      ],
      imgUrl: `${CONFIG.assetsDir}/assets/images/home/triply-hub.webp`,
    },
    {
      id: 'f2',
      icon: 'lucide:message-square',
      pain: {
        en: 'Messy group chats and lost info',
        fr: 'Discussions brouillonnes et infos perdues',
      },
      title: {
        en: 'Structured Communication',
        fr: 'Communication structurée',
      },
      items: [
        {
          icon: 'lucide:hash',
          title: {
            en: 'Topic Channels',
            fr: 'Canaux thématiques',
          },
          description: {
            en: 'Separate chats for Transport, Stay, Nights out, Photos and more.',
            fr: 'Discussions séparées : Transport, Logement, Soirées, Photos, etc.',
          },
        },
        {
          icon: 'lucide:bell-ring',
          title: {
            en: 'Smart Mentions',
            fr: 'Mentions intelligentes',
          },
          description: {
            en: 'Notify only who needs to know; reduce spam for everyone else.',
            fr: 'Notifier uniquement les concernés ; moins de bruit pour les autres.',
          },
        },
      ],
      imgUrl: `${CONFIG.assetsDir}/assets/images/home/triply-communication.webp`,
    },
    {
      id: 'f3',
      icon: 'lucide:users-check',
      pain: {
        en: 'No clear ownership or decisions',
        fr: 'Pas de responsabilités ni décisions claires',
      },
      title: {
        en: 'Collaboration & Decisions',
        fr: 'Collaboration & décisions',
      },
      items: [
        {
          icon: 'lucide:check-circle-2',
          title: {
            en: 'Assignable Tasks',
            fr: 'Tâches assignables',
          },
          description: {
            en: 'Assign owners and due dates for bookings, groceries and more.',
            fr: 'Assigner des responsables et des échéances pour les réservations, courses, etc.',
          },
        },
        {
          icon: 'lucide:pie-chart',
          title: {
            en: 'Fast Polls',
            fr: 'Sondages rapides',
          },
          description: {
            en: 'Vote on dates, destinations, restaurants and activities in seconds.',
            fr: 'Vote en quelques secondes : dates, destinations, restos, activités.',
          },
        },
      ],
      imgUrl: `${CONFIG.assetsDir}/assets/images/home/triply-collaboration.webp`,
    },
    {
      id: 'f4',
      icon: 'lucide:wallet',
      pain: {
        en: 'Confusing shared expenses at the end',
        fr: 'Comptes partagés confus à la fin',
      },
      title: {
        en: 'Shared Expenses',
        fr: 'Dépenses partagées',
      },
      items: [
        {
          icon: 'lucide:calculator',
          title: {
            en: 'Auto Balances',
            fr: 'Soldes automatiques',
          },
          description: {
            en: 'Add purchases on the fly and keep everyone’s balance up to date.',
            fr: 'Ajoutez des dépenses à la volée et gardez les soldes de chacun à jour.',
          },
        },
        {
          icon: 'lucide:banknote',
          title: {
            en: 'Easy Reimbursements',
            fr: 'Remboursements faciles',
          },
          description: {
            en: 'Close out with integrated PayPal/Revolut payouts.',
            fr: 'Clôture via paiements intégrés PayPal/Revolut.',
          },
        },
      ],
      imgUrl: `${CONFIG.assetsDir}/assets/images/home/triply-expenses.webp`,
    },
    {
      id: 'f5',
      icon: 'lucide:images',
      pain: {
        en: 'Memories scattered across phones',
        fr: 'Souvenirs éparpillés sur les téléphones',
      },
      title: {
        en: 'Photos & Memories',
        fr: 'Photos & souvenirs',
      },
      items: [
        {
          icon: 'lucide:gallery-vertical-end',
          title: {
            en: 'Collaborative Wall',
            fr: 'Mur collaboratif',
          },
          description: {
            en: 'Auto-tag by place/date and relive the trip together.',
            fr: 'Auto-tag par lieu/date pour revivre le voyage ensemble.',
          },
        },
        {
          icon: 'lucide:file-down',
          title: {
            en: 'Trip Album Export',
            fr: 'Export d’album',
          },
          description: {
            en: 'Create a shareable PDF or album in one click.',
            fr: 'Créez un PDF/album partageable en un clic.',
          },
        },
      ],
      imgUrl: `${CONFIG.assetsDir}/assets/images/home/triply-memories.webp`,
    },
  ],
  heroTexts: {
    description: {
      en: 'Plan, chat and live your trips and events together in one beautiful space.',
      fr: 'Planifiez, discutez et vivez vos voyages et événements ensemble dans un seul espace.',
    },
    headingPart1: {
      en: 'The all-in-one app to',
      fr: 'L’app tout-en-un pour',
    },
    headingPart2: {
      en: 'organize group trips & events',
      fr: 'organiser vos voyages & événements à plusieurs',
    },
  },
  reviews: [
    {
      id: 'r1',
      name: 'Julie M.',
      rating: 5,
      jobTitle: {
        en: 'Team Lead',
        fr: 'Manager d’équipe',
      },
      content: {
        en: 'Finally a tool that keeps the plan, chat and money in one place. We saved hours!',
        fr: 'Enfin un outil qui garde plan, discussions et dépenses au même endroit. On a gagné des heures !',
      },
      postedAt: new Date('2025-06-04T10:00:00.000Z'),
    },
    {
      id: 'r2',
      name: 'Paul M.',
      rating: 5,
      jobTitle: {
        en: 'Frequent Traveler',
        fr: 'Grand voyageur',
      },
      content: {
        en: 'Polls made choosing dates painless. No more 300-message threads!',
        fr: 'Les sondages ont simplifié le choix des dates. Fini les fils de 300 messages !',
      },
      postedAt: new Date('2025-05-22T18:30:00.000Z'),
    },
    {
      id: 'r3',
      name: 'Chloé M.',
      rating: 4,
      jobTitle: {
        en: 'Event Organizer',
        fr: 'Organisatrice d’événements',
      },
      content: {
        en: 'Tasks and reminders kept everyone accountable. Super clear ownership.',
        fr: 'Tâches et rappels ont responsabilisé tout le monde. Ownership super clair.',
      },
      postedAt: new Date('2025-07-11T08:15:00.000Z'),
    },
    {
      id: 'r4',
      name: 'Yassine M.',
      rating: 5,
      jobTitle: {
        en: 'Photographer',
        fr: 'Photographe',
      },
      content: {
        en: 'The shared photo wall became our trip diary. Loved the album export!',
        fr: 'Le mur photo est devenu notre journal de voyage. L’export d’album est top !',
      },
      postedAt: new Date('2025-08-02T14:05:00.000Z'),
    },
    {
      id: 'r5',
      name: 'Anaïs D.',
      rating: 5,
      jobTitle: {
        en: 'HR Coordinator',
        fr: 'Coordinatrice RH',
      },
      content: {
        en: 'Our offsite planning was way smoother. One workspace, zero chaos.',
        fr: 'Notre offsite a été bien plus fluide. Un espace, zéro chaos.',
      },
      postedAt: new Date('2025-04-17T09:40:00.000Z'),
    },
    {
      id: 'r6',
      name: 'Marco S.',
      rating: 4,
      jobTitle: {
        en: 'Student',
        fr: 'Étudiant',
      },
      content: {
        en: 'Split expenses worked flawlessly and settled up in minutes.',
        fr: 'Les dépenses partagées ont super bien marché, tout réglé en minutes.',
      },
      postedAt: new Date('2025-03-29T19:20:00.000Z'),
    },
    {
      id: 'r7',
      name: 'Léa M.',
      rating: 5,
      jobTitle: {
        en: 'Project Manager',
        fr: 'Cheffe de projet',
      },
      content: {
        en: 'Love the channels and mentions—noise is down, clarity is up.',
        fr: 'J’adore les canaux et mentions — moins de bruit, plus de clarté.',
      },
      postedAt: new Date('2025-09-10T12:10:00.000Z'),
    },
    {
      id: 'r8',
      name: 'Thomas R.',
      rating: 5,
      jobTitle: {
        en: 'Startup Founder',
        fr: 'Fondateur de startup',
      },
      content: {
        en: 'Triply feels like a shared space for the whole journey—before, during and after.',
        fr: 'Triply est un espace partagé pour tout le voyage — avant, pendant et après.',
      },
      postedAt: new Date('2025-10-06T16:55:00.000Z'),
    },
  ],
  testimonialsTexts: {
    titlePart1: {
      en: 'What groups say about',
      fr: 'Ce que les groupes disent de',
    },
    titlePart2: {
      en: 'Triply',
      fr: 'Triply',
    },
  },
  plans: {
    basic: {
      target: {
        en: 'Solo founders and early-stage teams',
        fr: 'Fondateurs solos et équipes early-stage',
      },
      price: 0,
      included: [
        {
          en: '1 active event, up to 5 participants',
          fr: '1 événement actif, jusqu’à 5 participants',
        },
        {
          en: 'Chat, tasks, shared expenses',
          fr: 'Chat, tâches, dépenses partagées',
        },
        {
          en: 'Limited photos',
          fr: 'Photos limitées',
        },
      ],
    },
    premium: {
      target: {
        en: 'Small teams and growing businesses',
        fr: 'Équipes petites et entreprises en croissance',
      },
      price: 4.99,
      included: [
        {
          en: 'Unlimited events, up to 20 participants',
          fr: 'Événements illimités, jusqu’à 20 participants',
        },
        {
          en: 'Polls, shared album',
          fr: 'Sondages, album partagé',
        },
        {
          en: 'Integrations (Drive, Maps)',
          fr: 'Intégrations (Drive, Maps)',
        },
      ],
    },
    ultimate: {
      target: {
        en: 'Enterprise-scale teams and growth-focused startups',
        fr: 'Équipes enterprise-scale et startups growth-focused',
      },
      price: 9.99,
      included: [
        {
          en: 'Workspaces with roles & permissions',
          fr: 'Workspaces avec rôles & permissions',
        },
        {
          en: 'Analytics & exports',
          fr: 'Analytics & exports',
        },
        {
          en: 'Automated reimbursements',
          fr: 'Remboursements automatiques',
        },
      ],
    },
  },
  testimonialNumbers: [
    { label: { en: 'Events', fr: 'Événements' }, value: 1500 },
    { label: { en: 'Participants', fr: 'Participants' }, value: 6000 },
  ],
};
