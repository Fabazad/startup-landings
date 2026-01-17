import { LoadingButton } from "@mui/lab";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Card, Divider, Stack, Typography } from "@mui/material";
import { Field, Form } from "src/components/hook-form";
import { Iconify } from "src/components/iconify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "src/components/snackbar";
import { User } from "src/app/envy-old/types/User";
import { Wish } from "src/app/envy-old/types/Wish";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { getClientWishQueries } from "src/app/envy-old/queries/wish/client";

const { bookWishQuery, unbookWishQuery } = getClientWishQueries();


export const BookingCard = ({ user, wish }: { user?: User, wish: Wish }) => {
    const [isBooking, setIsBooking] = useState(false);
    const bookedByNameInputRef = useRef<HTMLInputElement>(null);
    const [isUnbooking, setIsUnbooking] = useState(false);

    const router = useRouter();

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

    const onSubmit = async () => {
        const data = methods.getValues();
        try {
            await bookWishQuery({ wishId: wish.id, name: data.bookedByName, userId: user?.id });
            router.refresh();
            toast.success('Envie réservée');
        } catch (error) {
            toast.error(error.message);
        }
    }

    const bookByUser = async (userId: string) => {
        try {
            setIsBooking(true);
            await bookWishQuery({ wishId: wish.id, userId });
            router.refresh();
            toast.success('Envie réservée');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsBooking(false);
        }
    }

    const handleAccordionChange = (_: any, expanded: boolean) => {
        if (expanded) setTimeout(() => {
            bookedByNameInputRef.current?.focus();
            scrollTo({
                top: document.getElementById('booking-form')?.offsetTop,
                behavior: 'smooth'
            });
        }, 200);

    }

    const handleUnbook = async () => {
        if (!confirm("Voulez-vous vraiment annuler la réservation ?")) return;
        setIsUnbooking(true);
        const res = await unbookWishQuery(wish.id);
        setIsUnbooking(false);
        if (res.success) {
            toast.success("Réservation annulée");
            router.refresh();
        } else {
            toast.error("Erreur lors de l'annulation");
        }
    }

    const isBooked = !!(wish.bookedByName || wish.bookedByUser);
    const bookedLabel = wish.bookedByUser && !wish.bookedByName ? `Réservé par ${wish.bookedByUser.display_name}` : `Réservé par ${wish.bookedByName}`;
    const isBookedByAuthUser = !!(user && wish.bookedByUser?.id === user.id);


    const renderBookingForm = () => (
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{ mt: 2 }}>
                <Field.Text name="bookedByName" label="Nom de la personne" inputRef={bookedByNameInputRef} />
                <LoadingButton
                    fullWidth
                    size="large"
                    variant="contained"
                    sx={{ borderRadius: 9999 }}
                    type="submit"
                    loading={isSubmitting}
                    startIcon={<Iconify icon="solar:lock-keyhole-minimalistic-bold-duotone" />}
                >
                    Réserver
                </LoadingButton>
            </Stack>
        </Form>
    );

    return (
        <Card sx={{ p: 3 }} id="booking-form">
            <Stack spacing={2}>
                <Typography variant="h6" fontWeight={700}>Envie d’offrir ce cadeau ?</Typography>
                <Typography variant="body1">Pensez à le réserver pour prévenir les autres et éviter les doublons.</Typography>


                {isBooked && (
                    <Alert severity="info" sx={{ borderRadius: 1, textAlign: 'center' }}>
                        {bookedLabel}
                    </Alert>
                )}

                {isBookedByAuthUser && (
                    <LoadingButton
                        fullWidth
                        size="large"
                        variant="outlined"
                        color="secondary"
                        startIcon={<Iconify icon="solar:lock-keyhole-minimalistic-bold-duotone" />}
                        onClick={handleUnbook}
                        loading={isUnbooking}
                        sx={{ borderRadius: 9999 }}
                    >
                        Annuler ma réservation
                    </LoadingButton>
                )}
                {!isBooked && user && (
                    <>
                        <LoadingButton
                            fullWidth
                            size="large"
                            variant="contained"
                            color="secondary"
                            sx={{ borderRadius: 9999 }}
                            onClick={() => bookByUser(user.id)}
                            loading={isBooking}
                            startIcon={<Iconify icon="solar:lock-keyhole-minimalistic-bold-duotone" />}
                        >
                            Réserver ce cadeau
                        </LoadingButton>
                        <Divider>
                        </Divider>
                        <Accordion onChange={handleAccordionChange}>
                            <AccordionSummary
                                expandIcon={<Iconify icon="ic:round-expand-more" />}
                                aria-controls="panel1-book-for-other"
                                id="panel1-book-for-other"
                            >
                                <Typography component="span">Réserver à la place de quelqu'un d'autre</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {renderBookingForm()}
                            </AccordionDetails>
                        </Accordion>
                    </>
                )}
                {!isBooked && !user && renderBookingForm()}
            </Stack>
        </Card >
    )
}
