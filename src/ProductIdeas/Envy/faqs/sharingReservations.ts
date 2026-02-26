import { Translated } from 'src/locales';
import { GenericFAQPage } from 'src/types/ProductIdea';

export const sharingReservationFAQPage: GenericFAQPage<Translated> = {
  id: 'sharing-and-reservation',
  icon: 'solar:share-bold-duotone',
  slug: {
    en: 'share-wishlist-reserve-gifts',
    fr: 'partager-liste-reserver-cadeaux',
  },
  seo: {
    title: {
      en: 'How to Share & Reserve Gifts on a Wishlist | Envy FAQ',
      fr: 'Comment Partager sa Liste & Réserver un Cadeau | FAQ Envy',
    },
    description: {
      en: 'Learn how to share your Envy wishlist with family and friends. Discover how guests can securely reserve gifts to avoid duplicates while keeping the surprise safe.',
      fr: 'Découvrez comment partager votre liste Envy avec vos proches. Apprenez comment les invités peuvent réserver des cadeaux pour éviter les doublons tout en gardant la surprise intacte.',
    },
    keywords: {
      en: 'share wishlist, gift reservation, avoid duplicate gifts, guest mode, secret reservation, baby registry guests',
      fr: 'partager liste cadeaux, réservation cadeau, éviter doublons cadeaux, mode invité, réservation secrète, invités liste naissance',
    },
  },
  hero: {
    title: {
      en: 'Sharing & Reserving',
      fr: 'Partage & Réservation',
    },
    subtitle: {
      en: 'How to invite your loved ones and manage their reservations.',
      fr: 'Comment inviter vos proches et gérer leurs réservations.',
    },
  },
  sections: [
    {
      title: {
        en: 'Sharing Your List',
        fr: 'Partager votre Liste',
      },
      items: [
        {
          id: 'how-to-share',
          question: {
            en: 'How do I share my list with my friends and family?',
            fr: 'Comment partager ma liste avec mes proches ?',
          },
          answer: {
            en: 'Once your list is ready, set its privacy mode to "Shared" or "Public". Then, simply click on the "Share" button to copy the unique link. You can send this link via WhatsApp, Messenger, text, email, or post it directly on your social networks so anyone with the link can view your list.',
            fr: 'Une fois votre liste prête, réglez son niveau de confidentialité sur "Partagée" ou "Publique". Ensuite, cliquez simplement sur le bouton "Partager" pour copier le lien unique de votre liste. Vous pouvez envoyer ce lien par WhatsApp, Messenger, SMS, e-mail, ou le poster directement sur vos réseaux sociaux pour que vos proches puissent le consulter.',
          },
        },
      ],
    },
    {
      title: {
        en: 'For Guests: Reserving Gifts',
        fr: 'Pour les Invités : Réserver des Cadeaux',
      },
      items: [
        {
          id: 'how-to-reserve',
          relatedFeatureId: 'wish-reservation',
          question: {
            en: 'How can a guest reserve a gift to avoid duplicates?',
            fr: 'Comment un proche peut-il réserver un cadeau pour éviter les doublons ?',
          },
          answer: {
            en: 'When a guest visits your list using your share link, they will see all your wishes. They just need to click on a gift they want to buy and select "Reserve". This marks the item as "Reserved" for all other guests, so nobody ends up buying the exact same gift.',
            fr: 'Lorsqu\'un invité consulte votre liste via le lien de partage, il verra tous vos souhaits. Il lui suffit de cliquer sur le cadeau qu\'il compte offrir et de sélectionner "Réserver". L\'article sera alors marqué comme "Réservé" pour tous les autres invités, évitant ainsi d\'acheter deux fois le même cadeau.',
          },
        },
        {
          id: 'surprise-mode',
          question: {
            en: 'Will I know if someone reserved a gift on my list?',
            fr: "Vais-je savoir si quelqu'un a réservé un cadeau sur ma liste ?",
          },
          answer: {
            en: 'No, that\'s the "Surprise Mode" magic! Only the guests (people visiting your list) can see what has been reserved or not. As the list creator, all gifts will appear as "available" to you, so the surprise is never ruined when you finally unwrap your presents.',
            fr: 'Non, c\'est la magie du mode "Surprise" ! Seuls les invités (les personnes qui consultent votre liste via le lien) peuvent voir ce qui a été réservé ou non. En tant que créateur de la liste, tous les cadeaux apparaîtront comme "disponibles", pour que la surprise reste intacte jusqu\'au jour J.',
          },
        },
        {
          id: 'cancel-reservation',
          question: {
            en: 'Can a guest cancel a reservation if they change their mind?',
            fr: "Un invité peut-il annuler une réservation s'il change d'avis ?",
          },
          answer: {
            en: 'Yes, absolutely. A guest can return to the list at any time, select the gift they previously reserved, and click "Cancel Reservation". The item will immediately become available again for other guests to choose.',
            fr: "Oui, tout à fait. Un invité peut retourner sur la liste à tout moment, sélectionner le cadeau qu'il avait réservé, et cliquer sur \"Annuler la réservation\". L'article redeviendra immédiatement disponible pour que d'autres invités puissent le choisir.",
          },
        },
        {
          id: 'guest-account-needed',
          question: {
            en: 'Do guests need to create an account to reserve a gift?',
            fr: 'Les invités doivent-ils créer un compte pour réserver un cadeau ?',
          },
          answer: {
            en: 'Not necessarily! Envy allows "Guest Reservations", meaning your friends and family can reserve a gift simply by entering an email address (so we can send them a confirmation and allow them to manage the reservation later). They are not forced to create a full Envy account, making the experience as smooth as possible.',
            fr: 'Pas obligatoirement ! Envy permet les "Réservations Invité", ce qui signifie que vos proches peuvent réserver un cadeau en entrant simplement une adresse e-mail (pour que nous puissions leur envoyer une confirmation et leur permettre de gérer la réservation). Ils ne sont pas obligés de créer un compte Envy complet, rendant l\'expérience très fluide.',
          },
        },
      ],
    },
  ],
  cta: {
    text: {
      en: 'Share my lists',
      fr: 'Partager mes listes',
    },
    link: '/dashboard',
  },
};
