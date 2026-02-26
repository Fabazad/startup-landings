import { Translated } from 'src/locales';
import { GenericFAQPage } from 'src/types/ProductIdea';

export const wishesManagementFAQPage: GenericFAQPage<Translated> = {
  id: 'wishes-management',
  icon: 'solar:gift-bold-duotone',
  slug: {
    en: 'adding-managing-wishes',
    fr: 'ajouter-gerer-ses-souhaits',
  },
  seo: {
    title: {
      en: 'How to Add & Manage Gifts on Your Wishlist | Envy FAQ',
      fr: 'Comment Ajouter & Gérer les Cadeaux de votre Liste | FAQ Envy',
    },
    description: {
      en: 'Learn how to easily add gifts to your Envy wishlist using any website URL. Discover how to edit, rearrange, and delete your wishes in seconds.',
      fr: "Apprenez comment ajouter facilement des cadeaux à votre liste Envy depuis n'importe quel site web. Découvrez comment modifier, réorganiser et supprimer vos souhaits en quelques secondes.",
    },
    keywords: {
      en: 'add gift to wishlist, universal gift registry, save gift ideas, wish scraper, edit wish, rearrange wishlist',
      fr: 'ajouter cadeau liste de souhaits, liste universelle, sauvegarder idées cadeaux, scraper cadeau, modifier souhait, réorganiser liste de naissance',
    },
  },
  hero: {
    title: {
      en: 'Adding & Managing Wishes',
      fr: 'Ajout & Gestion des Souhaits',
    },
    subtitle: {
      en: 'Everything you need to know to fill your lists with gifts.',
      fr: "Tout ce qu'il vous faut savoir pour remplir vos listes de cadeaux.",
    },
  },
  sections: [
    {
      title: {
        en: 'Adding Gifts',
        fr: 'Ajouter des Cadeaux',
      },
      items: [
        {
          id: 'add-gift-by-url',
          relatedFeatureId: 'wish-scraper',
          question: {
            en: 'How do I add a gift from any website to my list?',
            fr: "Comment ajouter un cadeau depuis n'importe quel site internet ?",
          },
          answer: {
            en: 'Adding a gift is magic! Simply copy the URL (web address) of the product you want from any online store. Go to your Envy list, click "Add a Wish", and paste the link. Our intelligent scraper will automatically fetch the product\'s image, title, and price for you.',
            fr: "Ajouter un cadeau, c'est magique ! Copiez simplement l'URL (l'adresse web) du produit que vous désirez depuis n'importe quelle boutique en ligne. Allez sur votre liste Envy, cliquez sur \"Ajouter un souhait\", et collez le lien. Notre système intelligent récupérera automatiquement l'image, le titre et le prix du produit pour vous.",
          },
        },
        {
          id: 'add-manual-gift',
          question: {
            en: 'Can I add a gift manually, without an internet link?',
            fr: 'Peut-on ajouter un cadeau manuellement (sans lien internet) ?',
          },
          answer: {
            en: 'Yes, absolutely. If the gift you want isn\'t online (like "a handmade drawing", "money for a trip", or a vintage item from a local shop), you can click "Add Manually". You can then upload your own picture, set a title, an estimated price, and add any special notes or instructions.',
            fr: 'Oui, tout à fait. Si le cadeau que vous souhaitez n\'est pas en ligne (comme "un dessin fait main", "une participation pour un voyage", ou un objet vintage d\'une boutique locale), vous pouvez cliquer sur "Ajout manuel". Vous pourrez alors télécharger votre propre photo, définir un titre, un prix estimé, et ajouter des notes ou instructions particulières.',
          },
        },
      ],
    },
    {
      title: {
        en: 'Editing Wishes',
        fr: 'Modifier ses Souhaits',
      },
      items: [
        {
          id: 'edit-wish-details',
          question: {
            en: 'How can I edit the details of a wish?',
            fr: "Comment modifier les détails d'un souhait ?",
          },
          answer: {
            en: 'On your wishlist, find the item you want to change and click the "Edit" button (usually a small pencil icon). From there, you can change the product name, update the price if it\'s gone on sale, swap the image, or add extra details like your preferred size, color, or a personalized message to your guests.',
            fr: "Sur votre liste, trouvez l'article que vous souhaitez modifier et cliquez sur le bouton \"Modifier\" (généralement une petite icône en forme de crayon). De là, vous pourrez changer le nom du produit, mettre à jour le prix s'il est en solde, remplacer l'image, ou ajouter des détails supplémentaires comme la taille, la couleur souhaitée ou un petit mot pour vos invités.",
          },
        },
        {
          id: 'rearrange-wishes',
          question: {
            en: 'How do I rearrange the order of gifts in my list?',
            fr: "Comment réorganiser l'ordre des cadeaux dans ma liste ?",
          },
          answer: {
            en: 'You can easily prioritize your wishes! Simply click and drag an item to move it up or down in your list. Put the gifts you want the most at the top to make sure your guests see them first.',
            fr: "Vous pouvez facilement définir l'ordre de priorité de vos souhaits ! Cliquez simplement sur un article et faites-le glisser pour le déplacer vers le haut ou vers le bas dans votre liste. Placez les cadeaux que vous désirez le plus en tête de liste pour être sûr que vos invités les voient en premier.",
          },
        },
      ],
    },
    {
      title: {
        en: 'Removing Wishes',
        fr: 'Supprimer des Souhaits',
      },
      items: [
        {
          id: 'delete-wish',
          question: {
            en: 'How do I delete a wish from my list?',
            fr: 'Comment supprimer un souhait de ma liste ?',
          },
          answer: {
            en: 'To remove a gift, click on the "Settings" or "Edit" menu for that specific item and select "Delete". The item will be immediately removed from your list. This action cannot be undone, but you can always add the item back later if you change your mind.',
            fr: 'Pour retirer un cadeau, cliquez sur le menu "Paramètres" ou "Modifier" de cet article spécifique et sélectionnez "Supprimer". L\'article sera immédiatement retiré de votre liste. Cette action est irréversible, mais vous pourrez toujours rajouter l\'article plus tard si vous changez d\'avis.',
          },
        },
      ],
    },
  ],
  cta: {
    text: {
      en: 'Add a new wish',
      fr: 'Ajouter un nouveau souhait',
    },
    // Le lien dépend de l'UI de l'app, ça pourrait aussi être une modale.
    link: '/dashboard',
  },
};
