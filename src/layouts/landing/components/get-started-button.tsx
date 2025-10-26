import { Breakpoint, Button, useTheme } from '@mui/material';
import { t } from 'i18next';
import { useSubscriptionModal } from 'src/sections/landing/components/SubscriptionModal/subscriptionModal';

const layoutQuery: Breakpoint = 'md';

export const GetStartedButton = () => {
  const { setOpen } = useSubscriptionModal();
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      rel="noopener"
      onClick={() => setOpen(true)}
      sx={{
        display: 'none',
        [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
      }}
    >
      {t('landing.hero.buttons.get-started')}
    </Button>
  );
};
