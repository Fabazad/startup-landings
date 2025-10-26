import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Field, Form } from 'src/components/hook-form';

import { z as zod } from 'zod';
import { useSubscription } from './subscriptionModal';

const defaultValues = {
  email: '',
};
const subscribeFormSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
});
type SubscribeFormSchemaType = zod.infer<typeof subscribeFormSchema>;

export const SubscriptionForm = () => {
  const methods = useForm<SubscribeFormSchemaType>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues,
  });

  const { setSubscriptionEmail, setOpenModal } = useSubscription();

  const onSubmit = async () => {
    const data = methods.getValues();
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubscriptionEmail(data.email);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <DialogTitle>🚀 Rejoins les premiers utilisateurs</DialogTitle>

      <DialogContent>
        <Typography>
          L’app est en cours de lancement. Entre ton email pour recevoir un accès anticipé à la beta
          (et quelques bonus 👀).
        </Typography>
        <Field.Text name="email" label="Email" sx={{ mt: 3 }} autoFocus />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenModal(false)}>Cancel</Button>
        <LoadingButton
          color="primary"
          variant="contained"
          type="submit"
          loading={methods.formState.isSubmitting}
        >
          Subscribe
        </LoadingButton>
      </DialogActions>
    </Form>
  );
};
