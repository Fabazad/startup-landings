"use client";

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { fData } from 'src/utils/format-number';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { updateUserProfileQuery } from '../../queries/user';
import { uploadAvatarAndGetUrl } from '../../queries/storage';
import { User } from '../../types/User';

// ----------------------------------------------------------------------

export type UpdateUserSchemaType = zod.infer<typeof UpdateUserSchema>;

export const UpdateUserSchema = zod.object({
    displayName: zod.string().min(1, { message: 'Name is required!' }).max(20, { message: 'Name must be at most 20 characters long!' }),
    photoURL: schemaHelper.file({ message: { required_error: 'Avatar is required!' } }).optional(),
    birthday: zod.string().optional(),
    about: zod.string().min(1, { message: 'About is required!' }).max(300, { message: 'About must be at most 300 characters long!' }).optional(),
});

export const Profile = ({ user }: { user: User }) => {
    const defaultValues = {
        displayName: user?.displayName,
        photoURL: user?.avatarUrl,
        birthday: user?.birthday,
        about: user?.about,
    };

    const methods = useForm<UpdateUserSchemaType>({
        mode: 'all',
        resolver: zodResolver(UpdateUserSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            let avatarUrl: string | undefined = undefined;
            if (data.photoURL && data.photoURL instanceof File) {
                avatarUrl = await uploadAvatarAndGetUrl(data.photoURL);
            }

            await updateUserProfileQuery({
                displayName: data.displayName,
                avatar: avatarUrl,
                about: data.about,
                birthday: data.birthday
            })

            toast.success('Profil mis à jour');
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                    <Card
                        sx={{
                            pt: 10,
                            pb: 5,
                            px: 3,
                            textAlign: 'center',
                        }}
                    >
                        <Field.UploadAvatar
                            name="photoURL"
                            maxSize={3145728}
                        />
                    </Card>
                </Grid>

                <Grid xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Box
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
                        >
                            <Field.Text name="displayName" label="Nom" />
                            <Field.DatePicker name="birthday" label="Date de naissance" />
                        </Box>

                        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                            <Field.Text name="about" multiline rows={4} label="A propos de moi" />

                            <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ borderRadius: 999, px: 2 }}>
                                Sauvegarder les modifications
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </Form>
    );
}
