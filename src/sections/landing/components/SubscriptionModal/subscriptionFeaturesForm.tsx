import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  Typography,
} from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useProductIdea } from 'src/app/product-idea-provider';
import { Field, Form } from 'src/components/hook-form';
import { z as zod } from 'zod';
import { useSubscription } from './subscriptionModal';

export const SubscriptionFeaturesForm = () => {
  const { setOpenModal, updateSubscriptionFeatures } = useSubscription();

  const { features } = useProductIdea();

  const featureOptions = features.map((feature) => ({
    value: feature.id,
    label: feature.title,
  }));

  const formSchema = zod.object(
    featureOptions.reduce<Record<string, zod.ZodType<boolean>>>((acc, featureOption) => {
      acc[featureOption.value] = zod.boolean();
      return acc;
    }, {})
  );
  type FormSchema = zod.infer<typeof formSchema>;

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: featureOptions.reduce<Record<string, boolean>>((acc, featureOption) => {
      acc[featureOption.value] = false;
      return acc;
    }, {}),
  });

  const onSubmit = async () => {
    const data = methods.getValues();
    const features = Object.keys(data).filter((key) => data[key]);

    const response = await updateSubscriptionFeatures(features);

    if (response !== null && 'error' in response) {
      if (response.error === 'no-subscription-email') {
        toast.error(t('landing.subscription.no-subscription-email'));
        return;
      }
      toast.error(t('landing.subscription.failed-to-update-subscription-features'));
      return;
    }
  };

  return (
    <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <DialogTitle>{t('landing.subscription.features.title')}</DialogTitle>

      <DialogContent>
        <Typography>{t('landing.subscription.features.description')}</Typography>

        <FormGroup
          sx={{ mt: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' } }}
        >
          {featureOptions.map((feature) => (
            <Field.Checkbox key={feature.value} name={feature.value} label={feature.label} />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenModal(false)}>{t('landing.subscription.cancel')}</Button>
        <LoadingButton
          color="primary"
          variant="contained"
          type="submit"
          loading={methods.formState.isSubmitting}
          sx={{ borderRadius: '9999px' }}
        >
          {t('landing.subscription.submit')}
        </LoadingButton>
      </DialogActions>
    </Form>
  );
};
