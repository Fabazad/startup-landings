import { Button, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useTranslate } from 'src/locales';
import { useSubscription } from './subscriptionModal';

export const SubscriptionSuccess = () => {
  const { t } = useTranslate();
  const { setOpenModal } = useSubscription();
  return (
    <>
      <DialogTitle>{t('landing.subscription.success.title')}</DialogTitle>

      <DialogContent>
        <Typography sx={{ whiteSpace: 'pre-line' }}>
          {t('landing.subscription.success.description')}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenModal(false)}>
          {t('landing.subscription.success.close')}
        </Button>
      </DialogActions>
    </>
  );
};
