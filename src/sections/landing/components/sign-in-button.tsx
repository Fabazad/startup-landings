'use client';

import { Button, Link } from '@mui/material';
import { useTranslate } from 'src/locales/use-locales';
import { paths } from 'src/routes/paths';

export function SignInButton() {
  const { t } = useTranslate();
  return (
    <Button
      component={Link}
      href={paths.auth.signIn}
      variant="contained"
      sx={{
        display: 'inline-flex',
        borderRadius: '9999px',
        whiteSpace: 'nowrap',
        minHeight: 40,
      }}
    >
      {t('landing.hero.buttons.signIn')}
    </Button>
  );
}
