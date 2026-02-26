import { Translated } from 'src/locales';
import { GenericFAQPage } from 'src/types/ProductIdea';

export const generalFAQPage: GenericFAQPage<Translated> = {
  id: 'general',
  icon: 'solar:info-square-bold-duotone',
  slug: {
    en: 'general-faq',
    fr: 'faq-generale',
  },
  seo: {
    title: {
      en: 'General FAQ & Basic Usage | Envy Wishlist App',
      fr: 'FAQ Générale & Utilisation de Base | Application Envy',
    },
    description: {
      en: 'Learn everything about Envy, the free universal wishlist app. Find out how it works, pricing, supported platforms, and account requirements.',
      fr: "Découvrez tout sur Envy, l'application gratuite de listes de souhaits universelle. Apprenez comment ça marche, le prix, les plateformes supportées et l'utilisation du compte.",
    },
    keywords: {
      en: 'envy app, universal wishlist, free gift registry, how to use envy, gift ideas app, ios android wishlist',
      fr: 'application envy, liste de souhaits universelle, liste de cadeaux gratuite, comment utiliser envy, liste de naissance, application cadeaux ios android',
    },
  },
  hero: {
    title: {
      en: 'General & Basics',
      fr: 'Général & Utilisation de base',
    },
    subtitle: {
      en: 'Everything you need to know to get started with Envy.',
      fr: 'Tout ce que vous devez savoir pour bien commencer avec Envy.',
    },
  },
  sections: [
    {
      title: {
        en: 'About the App',
        fr: "À propos de l'application",
      },
      items: [
        {
          id: 'what-is-envy',
          question: {
            en: 'What is Envy?',
            fr: "Qu'est-ce qu'Envy ?",
          },
          answer: {
            en: "Envy is a universal wishlist application that allows you to save gift ideas from any website in the world. Whether it's for a birthday, a baby shower, a wedding, or just for yourself, you can gather all your desires in one place and share them easily with your loved ones to avoid duplicate gifts.",
            fr: "Envy est une application de liste de souhaits universelle qui vous permet d'enregistrer des idées cadeaux provenant de n'importe quel site internet au monde. Que ce soit pour un anniversaire, une naissance, un mariage ou simplement pour vous faire plaisir, vous pouvez rassembler toutes vos envies au même endroit et les partager facilement avec vos proches pour éviter les cadeaux en double.",
          },
        },
        {
          id: 'is-envy-free',
          question: {
            en: 'Is the Envy app free?',
            fr: "L'application Envy est-elle payante ?",
          },
          answer: {
            en: 'No, Envy is 100% free to use! You can create an unlimited number of wishlists, add as many gifts as you want, and share them with your friends and family without any hidden fees.',
            fr: "Non, l'utilisation d'Envy est 100% gratuite ! Vous pouvez créer un nombre illimité de listes de souhaits, ajouter autant de cadeaux que vous le souhaitez, et les partager avec votre famille et vos amis sans aucun frais caché.",
          },
        },
        {
          id: 'supported-platforms',
          question: {
            en: 'On which platforms can I use Envy?',
            fr: 'Sur quelles plateformes puis-je utiliser Envy ?',
          },
          answer: {
            en: 'Envy is available everywhere! You can use it directly from your web browser on your computer or tablet. For the best experience on the go, you can download our free mobile app, available for both iOS (App Store) and Android (Google Play).',
            fr: "Envy est disponible partout ! Vous pouvez l'utiliser directement depuis votre navigateur web sur votre ordinateur ou votre tablette. Pour la meilleure expérience sur mobile, vous pouvez télécharger notre application gratuite, disponible sur iOS (App Store) et Android (Google Play).",
          },
        },
        {
          id: 'do-i-need-an-account',
          question: {
            en: 'Do I need an account to use the app?',
            fr: "Faut-il obligatoirement un compte pour utiliser l'application ?",
          },
          answer: {
            en: 'If you want to create your own wishlists and save gift ideas, you need to create a free account so we can securely save your lists across your devices. However, if you are just a guest viewing a shared list or reserving a gift for a friend, no account is required!',
            fr: "Si vous souhaitez créer vos propres listes de souhaits et sauvegarder vos idées cadeaux, vous devez créer un compte gratuit pour que nous puissions synchroniser vos listes sur tous vos appareils. En revanche, si vous êtes simplement un invité qui consulte la liste d'un proche ou qui réserve un cadeau, aucun compte n'est nécessaire !",
          },
        },
      ],
    },
  ],
  cta: {
    text: {
      en: 'Create your first wishlist',
      fr: 'Créer votre première liste',
    },
    link: '/auth/sign-up', // Ou '/wish-list/new' selon ton routage
  },
};
