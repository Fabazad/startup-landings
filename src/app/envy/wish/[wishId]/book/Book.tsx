'use client';

import { Box, Divider, Typography, Card, Stack, Container, Grid, Button, Link } from "@mui/material";
import { useWish } from "src/app/envy/hooks/useWish";
import { useAuthContext } from "src/auth/hooks";
import { toast } from "sonner";
import { Field, Form } from "src/components/hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { NotFoundView } from "src/sections/error";
import { SplashScreen } from "src/components/loading-screen";
import { Image } from 'src/components/image';
import { defaultWishImageUrl } from 'src/app/envy/types/Wish';
import { fCurrency } from 'src/utils/format-number';
import { BackButton } from "src/app/envy/components/BackButton";
import { paths } from "src/routes/paths";
import { Iconify } from "src/components/iconify";

// Mock suggestions (Move to a separate file or API in real app)
const MOCK_SUGGESTIONS = [
    { id: 1, name: "Produit Similaire 1", price: 29.99, image: "https://via.placeholder.com/150", url: "#" },
    { id: 2, name: "Alternative Top", price: 45.00, image: "https://via.placeholder.com/150", url: "#" },
    { id: 3, name: "Choix Budget", price: 15.50, image: "https://via.placeholder.com/150", url: "#" },
];

export const Book = ({ wishId }: { wishId: number }) => {

    const { wish, bookWish, isBooking, isLoading } = useWish({ wishId });
    const { user } = useAuthContext();

    const bookedByNameFormSchema = z.object({
        bookedByName: z.string().min(1, { message: "Le nom est requis" }),
    });

    const methods = useForm({
        resolver: zodResolver(bookedByNameFormSchema),
        defaultValues: { bookedByName: '' }
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    if (isLoading) return <SplashScreen />
    if (wish === undefined) return <NotFoundView />

    const bookByUser = async (userId: string) => {
        try {
            await bookWish({ userId });
            toast.success('Envie réservée');
        } catch (error) {
            toast.error(error.message);
        }
    }

    const onSubmit = async () => {
        const data = methods.getValues();
        try {
            await bookWish({ name: data.bookedByName, userId: user?.id });
            toast.success('Envie réservée');
        } catch (error) {
            toast.error(error.message);
        }
    }

    const renderBookingForm = () => (
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{ mt: 2 }}>
                <Field.Text name="bookedByName" label="Réserver par (Nom)" />
                <LoadingButton
                    fullWidth
                    size="large"
                    variant="contained"
                    sx={{ borderRadius: 9999 }}
                    type="submit"
                    loading={isSubmitting}
                    startIcon={<Iconify icon="material-symbols:lock-open-rounded" />}
                >
                    Réserver
                </LoadingButton>
            </Stack>
        </Form>
    );

    const isBooked = !!(wish.bookedByName || wish.bookedByUser);
    const bookedLabel = wish.bookedByUser ? `Réservé par ${wish.bookedByUser.display_name}` : `Réservé par ${wish.bookedByName}`;

    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <Box sx={{ mb: 3 }}>
                <BackButton fallbackPath={paths.envy.root} />
            </Box>

            <Grid container spacing={4}>
                {/* Left Column: Wish Details */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 0, overflow: 'hidden' }}>
                        <Image
                            alt={wish.name}
                            src={wish.imageUrl || defaultWishImageUrl}
                            ratio="4/3"
                            sx={{ borderRadius: 0 }}
                        />
                        <Stack spacing={2} sx={{ p: 3 }}>
                            <Typography variant="h3">{wish.name}</Typography>
                            {wish.price && (
                                <Typography variant="h4" color="primary">
                                    {fCurrency(wish.price)}
                                </Typography>
                            )}
                            {wish.description && (
                                <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {wish.description}
                                </Typography>
                            )}
                        </Stack>
                    </Card>
                </Grid>

                {/* Right Column: Actions */}
                <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                        {/* Booking Status / Actions */}
                        <Card sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Réservation</Typography>

                            {isBooked ? (
                                <Box sx={{ p: 2, bgcolor: 'action.selected', borderRadius: 1, textAlign: 'center' }}>
                                    <Typography variant="subtitle1" color="primary.main">
                                        {bookedLabel}
                                    </Typography>
                                </Box>
                            ) : (
                                <>
                                    {user ? (
                                        <Stack spacing={2}>
                                            <LoadingButton
                                                fullWidth
                                                size="large"
                                                variant="contained"
                                                color="secondary"
                                                sx={{ borderRadius: 9999 }}
                                                onClick={() => bookByUser(user.id)}
                                                loading={isBooking}
                                                startIcon={<Iconify icon="material-symbols:lock-open-rounded" />}
                                            >
                                                Réserver par moi
                                            </LoadingButton>
                                            <Divider>
                                                <Typography variant="caption" color="text.secondary">
                                                    OU PAR QUELQU'UN D'AUTRE
                                                </Typography>
                                            </Divider>
                                            {renderBookingForm()}
                                        </Stack>
                                    ) : (
                                        renderBookingForm()
                                    )}
                                </>
                            )}
                        </Card>

                        {/* Buying Option or Suggestions */}
                        {wish.productUrl ? (
                            <Button
                                fullWidth
                                size="large"
                                variant="outlined"
                                target="_blank"
                                href={wish.productUrl}
                                startIcon={<Typography variant="h4">🛍️</Typography>} // Simple icon or use a real Icon component
                                sx={{ py: 2, borderRadius: 2 }}
                            >
                                Acheter ce produit
                            </Button>
                        ) : (
                            <Box>
                                <Typography variant="h6" sx={{ mb: 2 }}>Suggestions similaires</Typography>
                                <Stack spacing={2}>
                                    {MOCK_SUGGESTIONS.map((product) => (
                                        <Card key={product.id} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                sx={{ width: 64, height: 64, borderRadius: 1, mr: 2 }}
                                            />
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography variant="subtitle2">{product.name}</Typography>
                                                <Typography variant="body2" color="text.primary" fontWeight="bold">
                                                    {fCurrency(product.price)}
                                                </Typography>
                                            </Box>
                                            <Button size="small" variant="soft" href={product.url}>
                                                Voir
                                            </Button>
                                        </Card>
                                    ))}
                                </Stack>
                            </Box>
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}