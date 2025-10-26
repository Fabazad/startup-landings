import { Breakpoint, Button, useTheme } from '@mui/material';
import { t } from 'i18next';
import { useSubscription } from 'src/sections/landing/components/SubscriptionModal/subscriptionModal';

const layoutQuery: Breakpoint = 'md';

export const GetStartedButton = () => {
  const { setOpenModal } = useSubscription();
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      rel="noopener"
      onClick={() => setOpenModal(true)}
      sx={{
        display: 'none',
        [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
      }}
    >
      {t('landing.hero.buttons.get-started')}
    </Button>
  );
};
