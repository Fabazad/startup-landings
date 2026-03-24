import { Translated } from 'src/locales';
import { GenericFAQPage } from 'src/types/ProductIdea';

export const accountSecurityFAQPage: GenericFAQPage<Translated> = {
  id: 'account-and-security',
  icon: 'solar:shield-keyhole-bold-duotone',
  slug: {
    en: 'account-settings-security',
    fr: 'parametres-compte-securite',
  },
  seo: {
    title: {
      en: 'Account Settings & Security | Envy FAQ',
      fr: 'Paramètres du Compte & Sécurité | FAQ Envy',
    },
    description: {
      en: 'Manage your Envy account, update your email, reset your password securely, and learn how to control your personal data and privacy settings.',
      fr: 'Gérez votre compte Envy, mettez à jour votre email, réinitialisez votre mot de passe en toute sécurité, et découvrez comment contrôler vos données personnelles et vos paramètres de confidentialité.',
    },
    keywords: {
      en: 'manage account, reset password, change email, delete account, personal data, privacy settings',
      fr: 'gérer compte, réinitialiser mot de passe, changer email, supprimer compte, données personnelles, paramètres de confidentialité',
    },
  },
  hero: {
    title: {
      en: 'Account & Security',
      fr: 'Compte & Sécurité',
    },
    subtitle: {
      en: 'Manage your profile and keep your data safe.',
      fr: 'Gérez votre profil et gardez vos données en sécurité.',
    },
  },
  sections: [
    {
      title: {
        en: 'Profile & Settings',
        fr: 'Profil & Paramètres',
      },
      items: [
        {
          id: 'change-email',
          question: {
            en: 'How do I change my email address or update my profile?',
            fr: 'Comment modifier mon adresse e-mail ou mon profil ?',
          },
          answer: {
            en: 'To update your personal information, go to "Account Settings" from the main menu. There, you can modify your display name, update your email address, and customize your profile preferences.',
            fr: 'Pour mettre à jour vos informations personnelles, accédez à "Paramètres du compte" depuis le menu principal. Vous pourrez y modifier votre nom d\'affichage, mettre à jour votre adresse e-mail et personnaliser les préférences de votre profil.',
          },
        },
      ],
    },
    {
      title: {
        en: 'Password & Security',
        fr: 'Mot de Passe & Sécurité',
      },
      items: [
        {
          id: 'forgot-password',
          relatedFeatureId: 'reset-password',
          question: {
            en: 'I forgot my password, how do I reset it?',
            fr: 'Comment réinitialiser mon mot de passe oublié ?',
          },
          answer: {
            en: 'If you can\'t remember your password, go to the Sign In page and click on "Forgot Password?". Enter the email address associated with your Envy account, and we will send you a secure link to create a new password and regain access to your lists.',
            fr: 'Si vous ne vous souvenez plus de votre mot de passe, allez sur la page de connexion et cliquez sur "Mot de passe oublié ?". Saisissez l\'adresse e-mail associée à votre compte Envy, et nous vous enverrons un lien sécurisé pour créer un nouveau mot de passe et retrouver l\'accès à vos listes.',
          },
        },
        {
          id: 'change-password',
          question: {
            en: 'How do I change my current password?',
            fr: 'Comment changer mon mot de passe actuel ?',
          },
          answer: {
            en: 'If you are already logged in and want to update your password for security reasons, go to "Account Settings" > "Security". You will need to enter your current password once, then enter your new desired password.',
            fr: 'Si vous êtes déjà connecté et que vous souhaitez mettre à jour votre mot de passe pour des raisons de sécurité, allez dans "Paramètres du compte" > "Sécurité". Vous devrez entrer votre mot de passe actuel une fois, puis saisir votre nouveau mot de passe.',
          },
        },
      ],
    },
    {
      title: {
        en: 'Data & Deletion',
        fr: 'Données & Suppression',
      },
      items: [
        {
          id: 'delete-account',
          question: {
            en: 'How do I permanently delete my account and data?',
            fr: 'Comment supprimer définitivement mon compte et mes données ?',
          },
          answer: {
            en: 'If you wish to leave us, you can permanently delete your account by going to "Update my profile" > "Profile" and selecting "Delete my account". This action is irreversible and will erase all your personal data, wishlists, and saved items from our servers.',
            fr: 'Si vous souhaitez nous quitter, vous pouvez supprimer définitivement votre compte en allant dans "Modifier mon profil" > "Profil" et en sélectionnant "Supprimer mon compte". Cette action est irréversible et effacera toutes vos données personnelles, listes de souhaits et articles sauvegardés de nos serveurs.',
          },
        },
      ],
    },
  ],
  cta: {
    text: {
      en: 'Manage my account',
      fr: 'Gérer mon compte',
    },
    link: '/account/settings', // Adapte le lien selon ton fichier de routes
  },
};
