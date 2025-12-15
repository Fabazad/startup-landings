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
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { useProductIdea } from 'src/app/product-idea-provider';
import { Form } from 'src/components/hook-form';
import { z as zod } from 'zod';
import { useSubscription } from '../subscription-context';
import { FeatureOption } from './FeatureOption';

export const SubscriptionFeaturesForm = () => {
  const { setOpenModal, updateSubscriptionFeatures } = useSubscription();

  const { features } = useProductIdea();

  const formSchema = zod.object(
    features.reduce<Record<string, zod.ZodType<boolean>>>((acc, feature) => {
      acc[feature.id] = zod.boolean();
      return acc;
    }, {})
  );
  type FormSchema = zod.infer<typeof formSchema>;

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: features.reduce<Record<string, boolean>>((acc, feature) => {
      acc[feature.id] = false;
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

  const watchedValues = useWatch({ control: methods.control });
  const isDisabled = Object.values(watchedValues || {}).every((value) => !value);

  return (
    <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <DialogTitle>{t('landing.subscription.features.title')}</DialogTitle>

      <DialogContent sx={{ maxHeight: '500px', overflowY: 'auto' }}>
        <Typography>{t('landing.subscription.features.description')}</Typography>

        <FormGroup
          sx={{ mt: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' } }}
        >
          {features.map((feature) => (
            <FeatureOption key={feature.id} feature={feature} />
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
          disabled={isDisabled}
        >
          {t('landing.subscription.submit')}
        </LoadingButton>
      </DialogActions>
    </Form>
  );
};
