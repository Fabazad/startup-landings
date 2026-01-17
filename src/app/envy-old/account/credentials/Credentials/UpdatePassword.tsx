"use client";

import Card from '@mui/material/Card';
import { toast } from 'src/components/snackbar';
import { Button, Typography } from '@mui/material';
import { supabase } from 'src/lib/supabase-client';
import { paths } from 'src/routes/paths';
import { User } from 'src/app/envy-old/types/User';

export const UpdatePassword = ({ user }: { user: User }) => {

    const sendResetPasswordEmail = async () => {
        const redirectTo = window.location.origin + paths.auth.updatePassword;
        const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
            redirectTo,
        })
        if (error) return toast.error(error.message);
        toast.success('Email de réinitialisation envoyé ! Veuillez vérifier votre boite de réception.');
    }

    return (
        <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
                Modifier le mot de passe
            </Typography>

            <Button variant="contained" onClick={sendResetPasswordEmail} sx={{ borderRadius: 999, mr: 'auto' }}>
                Envoyer un email de réinitialisation
            </Button>
        </Card>
    );
}
