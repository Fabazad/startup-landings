
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
import { paths } from 'src/routes/paths';
import { Image } from 'src/components/image';
import { useState } from 'react';
import { ImageSelector } from '../ImageSelector';
import { getClientWishQueries } from '../../queries/wish/client';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { WishList } from '../../types/WishList';


// ----------------------------------------------------------------------

export const UpsertWish = ({ wishList, wish }: { wishList: { id: number, name: string }, wish?: Wish }) => {
    const router = useRouter();
    const { mode, systemMode } = useColorScheme();
    const [isScraping, setIsScraping] = useState(false);
    const [lastScrapedUrl, setLastScrapedUrl] = useState('');

    const { createWishQuery, updateWishQuery } = getClientWishQueries();

    const isDarkMode = mode === 'dark' || (mode === 'system' && systemMode === 'dark');


    const WishSchema = z.object({
        productUrl: z.string().optional(),
        name: z.string().min(1, "Nom de l'envie est requis"),
        description: z.string().optional(),
        price: z.coerce.number().optional(),
        isFavorite: z.boolean().optional(),
        isSecondHand: z.boolean().optional(),
        acceptEquivalent: z.boolean().optional(),
        imageUrl: z.string().optional(),
        imageUrls: z.array(z.string()).optional(),
    });

    const defaultValues = {
        productUrl: wish?.productUrl || undefined,
        name: wish?.name || '',
        description: wish?.description || undefined,
        price: wish?.price || undefined,
        isFavorite: wish?.isFavorite || false,
        isSecondHand: wish?.isSecondHand || false,
        acceptEquivalent: wish?.acceptEquivalent || false,
        imageUrl: wish?.imageUrl || undefined,
        imageUrls: wish?.imageUrls || undefined,
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
            else router.push(paths.envy.wishList.detail(wishList.id));
        }
        else {
            const res = await createWishQuery({ wishListId: wishList.id, ...data });
            if (!res.success) toast.error(res.errorCode);
            else router.push(paths.envy.wishList.detail(wishList.id));
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
            const { title, price, imageUrls } = res.data;

            if (title) {
                methods.setValue('name', title);
            }
            if (price) {
                methods.setValue('price', price);
            }
            if (imageUrls) {
                methods.setValue('imageUrls', imageUrls.slice(0, 9));
                methods.setValue('imageUrl', imageUrls[0]);
            }
        } catch (error) {
            toast.error("Une erreur est survenue lors de la collecte des informations");
        } finally {
            setLastScrapedUrl(cleanUrl);
            setIsScraping(false);
        }
    };

    const scrappedImagesUrls = methods.watch('imageUrls') || [];

    const title = wish ? `Modifier l'envie ${wish.name}` : 'Ajouter une envie';

    return (
        <Stack gap={2} direction="row" alignItems="flex-start" justifyContent="space-between">
            <Stack
                flex={1}
                sx={{
                    display: { xs: 'none', sm: 'flex' },
                    position: 'sticky',
                    top: 'calc(var(--layout-header-desktop-height) + 24px)',
                }}
            >
                <Image
                    src={
                        isDarkMode
                            ? '/assets/illustrations/illustration-new-wish-dark.svg'
                            : '/assets/illustrations/illustration-new-wish.svg'
                    }
                    alt="Wishlist"
                    sx={{ width: '100%', height: '100%' }}
                />
            </Stack>
            <Stack sx={{ px: { xs: 3, sm: 10 }, py: { xs: 3, sm: 7 }, flex: 1 }}>
                <CustomBreadcrumbs
                    links={[
                        { name: 'Mes listes', href: paths.envy.wishList.myLists },
                        wishList ? { name: wishList.name, href: paths.envy.wishList.detail(wishList.id) } : { name: 'Mes listes', href: paths.envy.wishList.myLists },
                        { name: title },
                    ]}
                    sx={{ mb: 2, position: 'relative', zIndex: 1 }}
                />
                <Form methods={methods} onSubmit={onSubmit}>
                    <Stack spacing={1} sx={{ mb: 3 }}>
                        <Typography variant="h3">{title}</Typography>
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

                        <Field.Text
                            name="price"
                            label="Prix indicatif (optionnel)"
                            placeholder="0.00"
                            type="number"
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">€</InputAdornment>,
                            }}
                        />

                        {scrappedImagesUrls.length > 0 && (
                            <Stack spacing={1} direction="column">
                                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                                    Choisissez une image pour votre envie.
                                </Typography>
                                <ImageSelector
                                    imagesUrls={scrappedImagesUrls}
                                    selectedImage={methods.watch('imageUrl')}
                                    onSelectImage={(url) => methods.setValue('imageUrl', url)}
                                />
                            </Stack>
                        )}

                        <Divider />

                        <Stack spacing={1}>
                            <Typography variant="h6">Options supplémentaires</Typography>
                            <Field.Switch name="isFavorite" label="Envie coup de cœur" />
                            <Field.Switch name="isSecondHand" label="Je préfère l'occasion si possible" />
                            <Field.Switch name="acceptEquivalent" label="J'accepte de recevoir un cadeau équivalent" />
                        </Stack>

                        <LoadingButton
                            color="inherit"
                            size="large"
                            type="submit"
                            variant="contained"

                            sx={{ borderRadius: 9999, position: 'sticky', bottom: 100, zIndex: 1000, mt: 2, mx: 2 }}
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