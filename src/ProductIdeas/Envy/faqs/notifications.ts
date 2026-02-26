import { Translated } from 'src/locales';
import { GenericFAQPage } from 'src/types/ProductIdea';

export const notificationsFAQPage: GenericFAQPage<Translated> = {
  id: 'notifications',
  icon: 'solar:bell-bing-bold-duotone',
  slug: {
    en: 'manage-notifications',
    fr: 'gerer-notifications',
  },
  seo: {
    title: {
      en: 'How to Manage Notifications | Envy FAQ',
      fr: 'Comment Gérer vos Notifications | FAQ Envy',
    },
    description: {
      en: 'Learn how to customize your push and email notifications on Envy. Stay updated on reservations, new lists, and messages without the spam.',
      fr: 'Découvrez comment personnaliser vos notifications push et e-mails sur Envy. Restez informé des réservations, nouvelles listes et messages sans être spammé.',
    },
    keywords: {
      en: 'manage notifications, push notifications, email settings, disable alerts, wishlist updates, notification preferences',
      fr: 'gérer notifications, notifications push, paramètres e-mail, désactiver alertes, mises à jour liste cadeaux, préférences notifications',
    },
  },
  hero: {
    title: {
      en: 'Notifications',
      fr: 'Notifications',
    },
    subtitle: {
      en: 'Stay informed on what matters to you.',
      fr: 'Restez informé de ce qui compte pour vous.',
    },
  },
  sections: [
    {
      title: {
        en: 'Notification Types',
        fr: 'Types de Notifications',
      },
      items: [
        {
          id: 'what-notifications',
          question: {
            en: 'What kind of notifications will I receive?',
            fr: 'Quelles notifications vais-je recevoir ?',
          },
          answer: {
            en: 'Envy sends you updates to make your experience better. Depending on your settings, you might receive notifications for: significant app updates, reminders for upcoming events you follow, or when someone interacts with your shared lists (without ruining surprise reservations!).',
            fr: "Envy vous envoie des mises à jour pour améliorer votre expérience. Selon vos paramètres, vous pouvez recevoir des notifications pour : les nouveautés importantes de l'application, des rappels d'événements à venir que vous suivez, ou lorsque quelqu'un interagit avec vos listes partagées (sans jamais dévoiler les réservations surprises !).",
          },
        },
        {
          id: 'push-vs-email',
          question: {
            en: 'Do you send push notifications to my phone and emails?',
            fr: 'Envoyez-vous des notifications sur mon téléphone et par e-mail ?',
          },
          answer: {
            en: 'Yes, we offer both! If you use the mobile app, you can receive instant push notifications. For important account updates or summaries, we may also send you emails. You can choose which ones you prefer to keep.',
            fr: "Oui, nous proposons les deux ! Si vous utilisez l'application mobile, vous pouvez recevoir des notifications push instantanées. Pour les informations importantes liées au compte ou les récapitulatifs, nous pouvons également vous envoyer des e-mails. Vous choisissez ce que vous préférez conserver.",
          },
        },
      ],
    },
    {
      title: {
        en: 'Customizing Preferences',
        fr: 'Personnaliser ses Préférences',
      },
      items: [
        {
          id: 'turn-off-notifications',
          relatedFeatureId: 'notification-settings',
          question: {
            en: 'How can I turn notifications on or off?',
            fr: 'Comment activer ou désactiver les notifications ?',
          },
          answer: {
            en: 'You are in full control! Go to your "Account Settings" and tap on "Notifications". From there, you can easily toggle on or off push notifications and email alerts according to your preferences. You can completely disable them if you prefer a quieter experience.',
            fr: 'Vous avez le contrôle ! Allez dans les "Paramètres du compte" et cliquez sur "Notifications". À partir de là, vous pourrez facilement activer ou désactiver les notifications push et les alertes par e-mail selon vos préférences. Vous pouvez totalement les couper si vous préférez plus de tranquillité.',
          },
        },
      ],
    },
  ],
  cta: {
    text: {
      en: 'Update notification settings',
      fr: 'Gérer mes notifications',
    },
    link: '/account/notifications',
  },
};
