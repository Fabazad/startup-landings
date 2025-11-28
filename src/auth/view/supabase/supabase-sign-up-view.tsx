'use client';

import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { GoogleIcon } from 'src/assets/icons';
import { Form, Field } from 'src/components/hook-form';

import { signUp, signInWithGoogle } from '../../context/supabase';
import { FormHead } from '../../components/form-head';
import { SignUpTerms } from '../../components/sign-up-terms';
import { useTranslate } from 'src/locales';


// ----------------------------------------------------------------------

export const SupabaseSignUpView = () => {
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();

  const password = useBoolean();

  const { t, currentLang } = useTranslate();

  const SignUpSchema = zod.object({
    firstName: zod.string().min(1, { message: t("auth.firstNameIsRequired") }),
    lastName: zod.string().min(1, { message: t("auth.lastNameIsRequired") }),
    email: zod
      .string()
      .min(1, { message: t("auth.emailIsRequired") })
      .email({ message: t("auth.emailMustBeAValidEmailAddress") }),
    password: zod
      .string()
      .min(1, { message: t("auth.passwordIsRequired") })
      .min(6, { message: t("auth.passwordMustBeAtLeast6Characters") }),
  });

  type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        lang: currentLang.value,
      });

      router.push(paths.auth.verify);
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  };

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
        <Field.Text name="firstName" label={t("auth.firstName")} InputLabelProps={{ shrink: true }} />
        <Field.Text name="lastName" label={t("auth.lastName")} InputLabelProps={{ shrink: true }} />
      </Box>

      <Field.Text name="email" label={t("auth.email")} InputLabelProps={{ shrink: true }} />

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

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ borderRadius: 999 }}
        loadingIndicator={t('auth.creatingAccount')}
      >
        {t('auth.createAccount')}
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        title={t('auth.signUp')}
        description={
          <>
            {t("auth.alreadyHaveAnAccount")}{" "}
            <Link component={RouterLink} href={paths.auth.signIn} sx={{ color: 'text.primary' }}>
              {t('auth.signIn')}
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Button
        fullWidth
        color="inherit"
        size="large"
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={handleSignInWithGoogle}
        sx={{ mb: 3, borderRadius: 999 }}
      >
        {t('auth.signInWithGoogle')}
      </Button>

      <Divider sx={{ mb: 3, typography: 'body2', color: 'text.disabled' }}>
        {t('auth.or')}
      </Divider>

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>

      <SignUpTerms />
    </>
  );
}
