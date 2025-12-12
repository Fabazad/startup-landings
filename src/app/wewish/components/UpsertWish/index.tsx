
"use client";

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form, Field } from 'src/components/hook-form';
import { Divider, useColorScheme, InputAdornment, CircularProgress } from '@mui/material';
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Wish } from '../../types/Wish';
import { createWishQuery, updateWishQuery } from '../../queries/wish';
import { paths } from 'src/routes/paths';
import { Image } from 'src/components/image';
import { BackButton } from '../BackButton';
import { useState } from 'react';


// ----------------------------------------------------------------------

export const UpsertWish = ({ wishListId, wish }: { wishListId: number, wish?: Wish }) => {
    const router = useRouter();
    const { mode, systemMode } = useColorScheme();
    const [isScraping, setIsScraping] = useState(false);
    const [lastScrapedUrl, setLastScrapedUrl] = useState('');

    const isDarkMode = mode === 'dark' || (mode === 'system' && systemMode === 'dark');


    const WishSchema = z.object({
        productUrl: z.string().optional(),
        name: z.string().min(1, "Nom de l'envie est requis"),
        description: z.string().optional(),
        price: z.coerce.number().optional(),
        isFavorite: z.boolean().optional(),
        isSecondHand: z.boolean().optional(),
        acceptEquivalent: z.boolean().optional(),
    });

    const defaultValues = {
        productUrl: wish?.productUrl || undefined,
        name: wish?.name || '',
        description: wish?.description || undefined,
        price: wish?.price || undefined,
        isFavorite: wish?.isFavorite || false,
        isSecondHand: wish?.isSecondHand || false,
        acceptEquivalent: wish?.acceptEquivalent || false,
    };

    const methods = useForm({
        resolver: zodResolver(WishSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        if (wish) {
            const res = await updateWishQuery({ wishId: wish.id, ...data });
            if (!res.success) toast.error(res.errorCode);
            else router.push(paths.wewish.wishList.detail(wishListId));
        }
        else {
            const res = await createWishQuery({ wishListId, ...data });
            if (!res.success) toast.error(res.errorCode);
            else router.push(paths.wewish.wishList.detail(wishListId));
        }
    });

    const onProductUrlBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!value) return;
        const url = new URL(value);
        const cleanUrl = `${url.origin}${url.pathname}`;
        if (lastScrapedUrl === cleanUrl) return;
        methods.setValue('productUrl', cleanUrl);

        setIsScraping(true);
        try {
            const res = await axios.post<{ title?: string; price?: number; imageUrls?: string[] }>("/api/scrap", { url: value });
            const { title, price } = res.data;

            if (title) {
                methods.setValue('name', title);
            }
            if (price) {
                methods.setValue('price', price);
            }
        } catch (error) {
            toast.error("Une erreur est survenue lors de la collecte des informations");
        } finally {
            setLastScrapedUrl(cleanUrl);
            setIsScraping(false);
        }
    };

    return (
        <Stack gap={2} direction="row" alignItems="flex-start" justifyContent="space-between">
            <Stack
                flex={1}
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    position: 'sticky',
                    top: 'calc(var(--layout-header-desktop-height) + 24px)',
                }}
            >
                <Image
                    src={
                        isDarkMode
                            ? '/assets/illustrations/illustration-wishlist-dark.svg'
                            : '/assets/illustrations/illustration-wishlist.svg'
                    }
                    alt="Wishlist"
                    sx={{ width: '100%', height: '100%' }}
                />
            </Stack>
            <Stack sx={{ px: { xs: 3, sm: 10 }, py: 3, flex: 1 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                    <BackButton />
                </Stack>
                <Form methods={methods} onSubmit={onSubmit}>
                    <Stack spacing={1} sx={{ mb: 3 }}>
                        <Typography variant="h3">{wish ? 'Modifier l\'envie' : 'Ajouter une envie'}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {wish ? 'Modifiez les informations de l\'envie' : 'Renseignez le lien du produit souhaité, nous allons collecter pour vous les informations sur le site marchand si celui-ci est compatible.'}
                        </Typography>
                    </Stack>
                    <Stack spacing={3}>
                        <Field.Text
                            name="productUrl"
                            label="Lien du produit (optionnel)"
                            onBlur={onProductUrlBlur}
                            InputProps={{
                                endAdornment: isScraping ? (
                                    <InputAdornment position="end">
                                        <CircularProgress size={20} />
                                    </InputAdornment>
                                ) : null,
                            }}
                        />

                        <Divider />

                        <Field.Text name="name" label="Nom de l'envie" />

                        <Field.Text name="description" label="Description (optionnel)" multiline rows={4} />

                        <Field.UploadImage
                            name="singleUpload"
                            maxSize={3145728}
                        />

                        <Field.Text
                            name="price"
                            label="Prix indicatif (optionnel)"
                            placeholder="0.00"
                            type="number"
                            InputLabelProps={{ shrink: true }}
                        />

                        <Divider />

                        <Stack spacing={1}>
                            <Typography variant="h6">Options supplémentaires</Typography>
                            <Field.Switch name="isFavorite" label="Envie coup de cœur" />
                            <Field.Switch name="isSecondHand" label="Je préfère l'occasion si possible" />
                            <Field.Switch name="acceptEquivalent" label="J'accepte de recevoir un cadeau équivalent" />
                        </Stack>

                        <LoadingButton
                            fullWidth
                            color="inherit"
                            size="large"
                            type="submit"
                            variant="contained"
                            sx={{ borderRadius: 9999 }}
                            loading={isSubmitting}
                        >
                            {wish ? 'Modifier l\'envie' : 'Ajouter l\'envie'}
                        </LoadingButton>
                    </Stack>
                </Form>
            </Stack>
        </Stack>
    );
};