'use client';

import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { NewPasswordIcon } from 'src/assets/icons';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { FormHead } from '../../components/form-head';
import { updatePassword } from '../../context/supabase';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export const SupabaseUpdatePasswordView = () => {
  const router = useRouter();
  const { t } = useTranslate();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();


  const UpdatePasswordSchema = zod
    .object({
      password: zod
        .string()
        .min(1, { message: t("auth.passwordIsRequired") })
        .min(6, { message: t("auth.passwordMustBeAtLeast6Characters") }),
      confirmPassword: zod.string().min(1, { message: t("auth.confirmPasswordIsRequired") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("auth.passwordsDoNotMatch"),
      path: ['confirmPassword'],
    });

  type UpdatePasswordSchemaType = zod.infer<typeof UpdatePasswordSchema>;


  const defaultValues = { password: '', confirmPassword: '' };

  const methods = useForm<UpdatePasswordSchemaType>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updatePassword({ password: data.password });

      router.push(paths.dashboard.root);
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Text
        name="password"
        label={t("auth.password")}
        placeholder={t("auth.passwordPlaceholder")}
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Field.Text
        name="confirmPassword"
        label={t("auth.confirmPassword")}
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        type="submit"
        size="large"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator={t("auth.updatingPassword")}
      >
        {t("auth.updatePassword")}
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        icon={<NewPasswordIcon />}
        title={t("auth.updatePassword")}
        description={t("auth.updatePasswordDescription")}
      />

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}
