import { Breakpoint, Button, ButtonProps, useTheme } from '@mui/material';
import { sendGAEvent } from '@next/third-parties/google';
import { t } from 'i18next';
import posthog from 'posthog-js';
import { useProductIdea } from 'src/app/product-idea-provider';
import { useSubscription } from 'src/sections/landing/components/SubscriptionModal/subscriptionModal';

const layoutQuery: Breakpoint = 'md';

export const GetStartedButton = ({
  buttonName,
  ...other
}: ButtonProps & {
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
      posthog.capture('get_started_button_click', {
        event_button: buttonName,
        event_product: productName,
      });
    }
  };

  return (
    <Button
      variant={other.variant || 'contained'}
      {...other}
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
