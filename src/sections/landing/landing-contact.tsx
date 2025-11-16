import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useProductIdea } from 'src/app/product-idea-provider';
import { Field, Form } from 'src/components/hook-form';
import { useTranslate } from 'src/locales';
import { varAlpha } from 'src/theme/styles';
import { z } from 'zod';

const defaultValues = {
  email: '',
  message: '',
};
const contactFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});
type ContactFormSchemaType = z.infer<typeof contactFormSchema>;

export const LandingContact = () => {
  const { t } = useTranslate();

  const { name: productName } = useProductIdea();

  const methods = useForm<ContactFormSchemaType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const onSubmit = async () => {
    const data = methods.getValues();
    const response = await axios.post('/api/contact', { ...data, product: productName });
    if (response.status !== 200) {
      toast.error(t('landing.contact.failed-to-send'));
    }
    toast.success(t('landing.contact.success'));
  };

  return (
    <Stack
      alignItems="center"
      sx={{
        px: 3,
        py: 20,
        textAlign: 'center',
        background: (theme) =>
          `linear-gradient(270deg, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)})`,
      }}
      id="contact"
    >
      <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Typography variant="h3" sx={{ textAlign: 'left' }}>
          {t('landing.contact.title')}
          <br />
          {t('landing.contact.description')}
        </Typography>

        <Box gap={3} display="flex" flexDirection="column" sx={{ my: 5 }}>
          <Field.Text name="email" fullWidth label="Email" required />
          <Field.Text
            name="message"
            fullWidth
            label={t('landing.contact.message')}
            multiline
            rows={4}
            required
          />
        </Box>

        <Button size="large" variant="contained" type="submit" sx={{ borderRadius: '9999px' }}>
          {t('landing.contact.submit')}
        </Button>
      </Form>
    </Stack>
  );
};
