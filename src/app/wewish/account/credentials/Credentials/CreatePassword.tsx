"use client";

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useBoolean } from 'src/hooks/use-boolean';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type ChangePassWordSchemaType = zod.infer<typeof ChangePassWordSchema>;

export const ChangePassWordSchema = zod
    .object({
        newPassword: zod.string().min(1, { message: 'New password is required!' }).min(6, { message: 'Password must be at least 6 characters!' }),
        confirmNewPassword: zod.string().min(1, { message: 'Confirm password is required!' }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: 'Passwords do not match!',
        path: ['confirmNewPassword'],
    });

// ----------------------------------------------------------------------

export const CreatePassword = () => {
    const password = useBoolean();

    const defaultValues = { newPassword: '', confirmNewPassword: '' };

    const methods = useForm<ChangePassWordSchemaType>({
        mode: 'all',
        resolver: zodResolver(ChangePassWordSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            reset();
            toast.success('Update success!');
            console.info('DATA', data);
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <Card sx={{ p: 3, gap: 3, display: 'flex', flexDirection: 'column' }}>
                <Field.Text
                    name="newPassword"
                    label="Nouveau mot de passe"
                    type={password.value ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={password.onToggle} edge="end">
                                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    helperText={
                        <Stack component="span" direction="row" alignItems="center">
                            <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Le mot de passe doit contenir au moins 6 caractères
                        </Stack>
                    }
                />

                <Field.Text
                    name="confirmNewPassword"
                    type={password.value ? 'text' : 'password'}
                    label="Confirmer le nouveau mot de passe"
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

                <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ ml: 'auto' }}>
                    Créer le mot de passe
                </LoadingButton>
            </Card>
        </Form>
    );
}
