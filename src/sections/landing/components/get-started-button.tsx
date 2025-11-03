import { Breakpoint, Button, useTheme } from '@mui/material';
import { sendGAEvent } from '@next/third-parties/google';
import { t } from 'i18next';
import { useProductIdea } from 'src/app/product-idea-provider';
import { useSubscription } from 'src/sections/landing/components/SubscriptionModal/subscriptionModal';

const layoutQuery: Breakpoint = 'md';

export const GetStartedButton = ({
  outlined = false,
  buttonName,
}: {
  outlined?: boolean;
  buttonName: string;
}) => {
  const { setOpenModal, subscriptionEmail } = useSubscription();
  const theme = useTheme();
  const { name: productName } = useProductIdea();

  const handleClick = () => {
    if (subscriptionEmail) {
      setOpenModal(true);
    } else {
      setOpenModal(true);
      sendGAEvent('get_started_button_click', {
        event_button: buttonName,
        event_product: productName,
      });
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
