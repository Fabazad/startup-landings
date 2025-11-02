import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Field, Form } from 'src/components/hook-form';

import axios from 'axios';
import { toast } from 'sonner';
import { useProductIdea } from 'src/app/product-idea-provider';
import { useTranslate } from 'src/locales';
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
  const { t } = useTranslate();

  const { name: productName } = useProductIdea();

  const methods = useForm<SubscribeFormSchemaType>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues,
  });

  const { setSubscriptionEmail, setOpenModal } = useSubscription();

  const onSubmit = async () => {
    const data = methods.getValues();

    const response = await axios.post(
      '/api/subscriptions',
      {
        email: data.email,
        product: productName,
      },
      { validateStatus: () => true }
    );

    if (response.status !== 201) {
      if (response.data.error === 'already-subscribed') {
        toast.error(t('landing.subscription.already-subscribed'));
        return;
      }
      if (response.data.error === 'failed-to-subscribe') {
        toast.error(t('landing.subscription.failed-to-subscribe'));
        return;
      }
      toast.error(t('landing.subscription.failed-to-subscribe'));
      return;
    }

    setSubscriptionEmail(data.email);
  };

  return (
    <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <DialogTitle>{t('landing.subscription.title')}</DialogTitle>

      <DialogContent>
        <Typography>{t('landing.subscription.description')}</Typography>
        <Field.Text name="email" label="Email" sx={{ mt: 3 }} autoFocus />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenModal(false)}>{t('landing.subscription.cancel')}</Button>
        <LoadingButton
          color="primary"
          variant="contained"
          type="submit"
          loading={methods.formState.isSubmitting}
        >
          {t('landing.subscription.submit')}
        </LoadingButton>
      </DialogActions>
    </Form>
  );
};
