import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export function SignUpTerms({ sx, ...other }: BoxProps) {

  const { t } = useTranslate();
  return (
    <Box
      component="span"
      sx={{
        mt: 3,
        display: 'block',
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
        ...sx,
      }}
      {...other}
    >
      {t('auth.bySigningUpIAgreeTo')}{" "}
      <Link underline="always" color="text.primary">
        {t('auth.termsOfService')}
      </Link>
      {" "}
      {t('auth.and')}{" "}
      <Link underline="always" color="text.primary">
        {t('auth.privacyPolicy')}
      </Link>
      .
    </Box>
  );
}
