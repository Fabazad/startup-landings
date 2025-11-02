import { Breakpoint, Button, useTheme } from '@mui/material';
import { t } from 'i18next';
import { useSubscription } from 'src/sections/landing/components/SubscriptionModal/subscriptionModal';

const layoutQuery: Breakpoint = 'md';

export const GetStartedButton = ({ outlined = false }: { outlined?: boolean }) => {
  const { setOpenModal, subscriptionEmail } = useSubscription();
  const theme = useTheme();

  const handleClick = () => {
    if (subscriptionEmail) {
      setOpenModal(true);
    } else {
      setOpenModal(true);
    }
  };

  return (
    <Button
      variant={outlined ? 'outlined' : 'contained'}
      rel="noopener"
      onClick={handleClick}
      sx={{
        display: 'none',
        [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
      }}
    >
      {subscriptionEmail
        ? t('landing.hero.buttons.open-waiting-list')
        : t('landing.hero.buttons.get-started')}
    </Button>
  );
};
