import { LanguageValue } from 'src/locales';

export const WelcomeEmail = ({
  productName,
  language,
}: {
  productName: string;
  language: LanguageValue;
}) => {
  if (language === LanguageValue.FR) {
    return `
    <div>
      <p>
        Nous sommes ravis de vous accueillir sur ${productName} 🎉 !
        <br />
        Vous avez bien été ajouté à la liste d'attente.
        <br />
        Nous vous enverrons un email lorsque l'accès sera ouvert pour vous.
      </p>
    </div>`;
  }
  return `
  <div>
    <p>
      We are happy to welcome you on ${productName} 🎉 !
      <br />
      You have been added to the waiting list.
      <br />
      We will send you an email when the access will be opened for you.
    </p>
  </div>`;
};
