import { Translated } from 'src/locales';
import { GenericFAQPage } from 'src/types/ProductIdea';

export const listsManagementFAQPage: GenericFAQPage<Translated> = {
  id: 'lists-management',
  icon: 'solar:checklist-minimalistic-bold-duotone',
  slug: {
    en: 'wishlist-creation-management',
    fr: 'creation-gestion-listes-cadeaux',
  },
  seo: {
    title: {
      en: 'How to Create & Manage Your Wishlists | Envy FAQ',
      fr: 'Comment Créer & Gérer vos Listes de Cadeaux | FAQ Envy',
    },
    description: {
      en: 'Learn how to create, edit, and organize multiple wishlists on Envy. Manage your privacy settings and easily share your gift ideas for any occasion.',
      fr: 'Découvrez comment créer, modifier et organiser plusieurs listes de souhaits sur Envy. Gérez votre confidentialité et partagez facilement vos idées cadeaux pour toutes les occasions.',
    },
    keywords: {
      en: 'create wishlist, manage gift registry, birthday list, baby shower list, private wishlist, share wishlist',
      fr: 'créer liste de cadeaux, gérer liste de souhaits, liste anniversaire, liste de naissance, liste de noël, liste privée, partager liste cadeaux',
    },
  },
  hero: {
    title: {
      en: 'Creation & Management of Lists',
      fr: 'Création et Gestion des Listes',
    },
    subtitle: {
      en: 'Everything about creating perfect wishlists for your events.',
      fr: 'Tout sur la création de listes de souhaits parfaites pour vos événements.',
    },
  },
  sections: [
    {
      title: {
        en: 'Creating a List',
        fr: 'Créer une Liste',
      },
      items: [
        {
          id: 'how-to-create-list',
          question: {
            en: 'How do I create my first wishlist?',
            fr: 'Comment créer ma première liste de souhaits ?',
          },
          answer: {
            en: 'Once logged into your Envy account, simply click on the "+" or "Create a List" button on your dashboard. Give your list a name (like "My Christmas List" or "Baby Shower"), set a date if you want to, and you are ready to start adding your favorite products!',
            fr: 'Une fois connecté à votre compte Envy, cliquez simplement sur le bouton "+" ou "Créer une liste" depuis votre tableau de bord. Donnez un nom à votre liste (comme "Ma liste de Noël" ou "Liste de naissance"), ajoutez une date si vous le souhaitez, et vous êtes prêt à ajouter vos produits préférés !',
          },
        },
        {
          id: 'multiple-lists',
          question: {
            en: 'Can I create multiple lists for different occasions?',
            fr: 'Puis-je créer plusieurs listes pour des occasions différentes ?',
          },
          answer: {
            en: 'Yes, absolutely! There is no limit to how many lists you can create. You can organize your gift ideas by creating separate lists for your birthday, Christmas, a baby registry, a wedding, or even just a personal shopping list to keep track of things you want to buy later.',
            fr: "Oui, absolument ! Il n'y a aucune limite au nombre de listes que vous pouvez créer. Vous pouvez organiser vos idées cadeaux en créant des listes séparées pour votre anniversaire, Noël, une liste de naissance, un mariage, ou même une liste de shopping personnelle pour garder une trace de ce que vous voulez vous offrir plus tard.",
          },
        },
      ],
    },
    {
      title: {
        en: 'Managing Your Lists',
        fr: 'Gérer vos Listes',
      },
      items: [
        {
          id: 'edit-list-info',
          question: {
            en: 'How can I edit the details of my list?',
            fr: 'Comment modifier les informations de ma liste ?',
          },
          answer: {
            en: 'To edit a list, navigate to it and click on the "Settings" or "Edit List" icon. From there, you can change the list\'s title, update the event date, write a description or a personal message for your guests, and modify its privacy settings.',
            fr: 'Pour modifier une liste, ouvrez-la et cliquez sur l\'icône "Paramètres" ou "Modifier la liste". De là, vous pouvez changer le titre de la liste, mettre à jour la date de l\'événement, écrire une description ou un message personnel pour vos invités, et modifier sa confidentialité.',
          },
        },
        {
          id: 'delete-list',
          question: {
            en: 'How do I delete a list?',
            fr: 'Comment supprimer une liste ?',
          },
          answer: {
            en: 'You can delete a list by going to its settings and selecting "Delete List". Please note that this action is permanent and will permanently remove all the wishes contained within that specific list.',
            fr: 'Vous pouvez supprimer une liste en allant dans ses paramètres et en sélectionnant "Supprimer la liste". Attention, cette action est irréversible et supprimera définitivement tous les souhaits contenus dans cette liste spécifique.',
          },
        },
      ],
    },
    {
      title: {
        en: 'Privacy & Sharing Options',
        fr: 'Confidentialité & Options de Partage',
      },
      items: [
        {
          id: 'who-can-see-list',
          relatedFeatureId: 'list-privacy-settings',
          question: {
            en: 'Privacy: Who can see my list?',
            fr: 'Confidentialité : Qui peut voir ma liste ?',
          },
          answer: {
            en: 'You are in full control of who sees your lists. When you create a list, you can choose its privacy level:\n- Private: Only you can see it.\n- Shared (Visibility via link): Anyone with the unique sharing link can view it, but it cannot be found by searching.\n- Public: Anyone can view it. (Coming soon)',
            fr: 'Vous avez le contrôle total sur qui peut voir vos listes. Lors de la création, vous choisissez son niveau de confidentialité :\n- Privée : Vous seul pouvez la voir.\n- Partagée (Visible via le lien) : Toute personne possédant le lien de partage unique peut la consulter, mais elle est introuvable par recherche.\n- Publique : Tout le monde peut la consulter. (Bientôt disponible)',
          },
        },
      ],
    },
  ],
  cta: {
    text: {
      en: 'Organize your lists now',
      fr: 'Organiser vos listes maintenant',
    },
    link: '/dashboard',
  },
};
