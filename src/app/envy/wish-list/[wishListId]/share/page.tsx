"use client";

import { toast } from 'sonner';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';
import { BackButton } from 'src/app/envy/components/BackButton';

// ----------------------------------------------------------------------

type Props = {
    params: {
        wishListId: string;
    };
};

export default function ShareWishListPage({ params }: Props) {
    const { wishListId } = params;

    const [shareLink, setShareLink] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const link = `${window.location.origin}${paths.envy.wishList.detail(Number(wishListId))}?sharedLink=true`;
            setShareLink(link);
        }
    }, [wishListId]);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareLink);
            toast.success('Lien copié !');
        } catch (error) {
            console.error('Failed to copy link:', error);
            toast.error('Erreur lors de la copie du lien');
        }
    };

    const handleShareWhatsApp = () => {
        const text = `Découvre ma liste de souhaits ici : ${shareLink}`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const handleShareEmail = () => {
        const subject = 'Ma liste de souhaits';
        const body = `Salut,\n\nVoici le lien vers ma liste de souhaits : ${shareLink}\n\nÀ bientôt !`;
        const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = url;
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Ma liste de souhaits',
                    url: shareLink,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            handleCopyLink();
        }
    };

    const renderHead = (
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <BackButton path={paths.envy.wishList.detail(Number(wishListId))} />
        </Stack>
    );

    const renderCopyLink = (
        <Stack spacing={2}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Copier le lien
            </Typography>

            <TextField
                fullWidth
                value={shareLink}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleCopyLink} edge="end">
                                <Iconify icon="solar:copy-bold" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Stack>
    );

    const renderShareButtons = (
        <Stack spacing={2}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Partager via
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button
                    variant="outlined"
                    startIcon={<Iconify icon="logos:whatsapp-icon" />}
                    onClick={handleShareWhatsApp}
                    sx={{ flexGrow: 1 }}
                >
                    WhatsApp
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<Iconify icon="eva:email-outline" />}
                    onClick={handleShareEmail}
                    sx={{ flexGrow: 1 }}
                >
                    Email
                </Button>
            </Stack>

            <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Iconify icon="eva:share-outline" />}
                    onClick={handleNativeShare}
                    size="large"
                >
                    Plus d'options de partage
                </Button>
            </Box>
        </Stack>
    );

    return (
        <Container maxWidth="sm" sx={{ py: 5 }}>
            {renderHead}

            <Stack spacing={2}>
                <Typography variant="h4">Partager ma liste</Typography>
            </Stack>
            <Card sx={{ p: 3, mt: 2 }}>
                <Stack spacing={3}>
                    {renderCopyLink}

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    {renderShareButtons}
                </Stack>
            </Card>
        </Container>
    );
}