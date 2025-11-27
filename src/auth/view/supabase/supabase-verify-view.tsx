'use client';

import { paths } from 'src/routes/paths';

import { EmailInboxIcon } from 'src/assets/icons';

import { FormHead } from '../../components/form-head';
import { FormReturnLink } from '../../components/form-return-link';

// ----------------------------------------------------------------------

export function SupabaseVerifyView() {
  return (
    <>
      <FormHead
        icon={<EmailInboxIcon />}
        title="Veuillez vérifier votre e-mail !"
        description={`Nous avons envoyé un email de vérification.\nVeuillez vérifier votre boîte de réception et cliquer sur le lien de vérification pour activer votre compte.`}
      />

      <FormReturnLink href={paths.auth.signIn} sx={{ mt: 0 }} />
    </>
  );
}
