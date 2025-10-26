import { Button, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useSubscription } from './subscriptionModal';

export const SubscriptionSuccess = () => {
  const { setOpenModal } = useSubscription();
  return (
    <>
      <DialogTitle>Vous êtes inscrit sur la liste d'attente 🎉</DialogTitle>

      <DialogContent>
        <Typography>
          Merci de votre intérêt ! Nous vous enverrons un email dès que l'application sera prête.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenModal(false)}>Fermer</Button>
      </DialogActions>
    </>
  );
};
