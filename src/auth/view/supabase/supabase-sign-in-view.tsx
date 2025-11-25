'use client';

import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from '../../hooks';
import { FormHead } from '../../components/form-head';
import { signInWithPassword, signInWithGoogle } from '../../context/supabase';
import { Button, Divider } from '@mui/material';
import { GoogleIcon } from 'src/assets/icons';
import { useTranslate } from 'src/locales';


// ----------------------------------------------------------------------

export const SupabaseSignInView = () => {
  const router = useRouter();

  const { checkUserSession } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  const { t, currentLang } = useTranslate();

  const SignInSchema = zod.object({
    email: zod
      .string()
      .min(1, { message: t("auth.emailIsRequired") })
      .email({ message: t("auth.emailMustBeAValidEmailAddress") }),
    password: zod
      .string()
      .min(1, { message: t("auth.passwordIsRequired") })
      .min(6, { message: t("auth.passwordMustBeAtLeast6Characters") }),
  });

  type SignInSchemaType = zod.infer<typeof SignInSchema>;


  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({ email: data.email, password: data.password });
      await checkUserSession?.();

      router.push("/app");
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


  console.log("origin", window.location.origin);

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Text name="email" label={t("auth.email")} InputLabelProps={{ shrink: true }} />

      <Box gap={1.5} display="flex" flexDirection="column">

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
      </Box>

      <Link
        component={RouterLink}
        href={paths.auth.resetPassword}
        variant="body2"
        color="inherit"
        sx={{ alignSelf: 'flex-end' }}
      >
        {t("auth.forgotPassword")}
      </Link>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator={t("auth.signingIn")}
      >
        {t("auth.signIn")}
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        title={t("auth.signInToYourAccount")}
        description={
          <>
            {`Don’t have an account? `}
            <Link component={RouterLink} href={paths.auth.signUp} variant="subtitle2">
              {t("auth.getStarted")}
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
        sx={{ mb: 3 }}
      >
        {t('auth.signInWithGoogle')}
      </Button>

      <Divider sx={{ mb: 3, typography: 'body2', color: 'text.disabled' }}>
        {t('auth.or')}
      </Divider>

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}
