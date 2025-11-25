'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { PasswordIcon } from 'src/assets/icons';

import { Form, Field } from 'src/components/hook-form';

import { FormHead } from '../../components/form-head';
import { resetPassword } from '../../context/supabase';
import { FormReturnLink } from '../../components/form-return-link';
import { useTranslate } from 'src/locales';



// ----------------------------------------------------------------------

export const SupabaseResetPasswordView = () => {
  const router = useRouter();
  const { t } = useTranslate();

  const ResetPasswordSchema = zod.object({
    email: zod
      .string()
      .min(1, { message: (t("auth.emailIsRequired")) })
      .email({ message: (t("auth.emailMustBeAValidEmailAddress")) }),
  });

  type ResetPasswordSchemaType = zod.infer<typeof ResetPasswordSchema>;


  const defaultValues = {
    email: '',
  };

  const methods = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await resetPassword({ email: data.email });

      router.push(paths.auth.verify);
    } catch (error) {
      console.error(error);
    }
  });

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Text
        autoFocus
        name="email"
        label={t("auth.email")}
        placeholder="example@gmail.com"
        InputLabelProps={{ shrink: true }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator={t("auth.sendRequest")}
      >
        {t("auth.sendRequest")}
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        icon={<PasswordIcon />}
        title={t("auth.forgotPassword")}
        description={t("auth.resetPasswordDescription")}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>

      <FormReturnLink href={paths.auth.signIn} />
    </>
  );
}
