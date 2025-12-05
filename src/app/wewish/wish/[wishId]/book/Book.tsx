'use client';

import { Box, Divider, Typography } from "@mui/material";
import { useWish } from "src/app/wewish/hooks/useWish";
import { useAuthContext } from "src/auth/hooks";
import { toast } from "sonner";
import { Field, Form } from "src/components/hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { NotFoundView } from "src/sections/error";
import { SplashScreen } from "src/components/loading-screen";

export const Book = ({ wishId }: { wishId: number }) => {

    const { wish, bookWishByUser, bookWishByName, isBooking, isLoading } = useWish({ wishId });
    const { user } = useAuthContext();

    const bookedByNameFormSchema = z.object({
        bookedByName: z.string().min(1, { message: "Le nom est requis" }),
    });

    const methods = useForm({
        resolver: zodResolver(bookedByNameFormSchema),
        defaultValues: { bookedByName: '' }
    });

    if (isLoading) return <SplashScreen />
    if (wish === undefined) return <NotFoundView />

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const bookyByUser = async (userId: string) => {
        try {
            await bookWishByUser(userId);
            toast.success('Envie réservé');
        } catch (error) {
            toast.error(error.message);
        }
    }

    const onSubmit = async () => {
        const data = methods.getValues();
        try {
            await bookWishByName(data.bookedByName);
            toast.success('Envie réservé');
        } catch (error) {
            toast.error(error.message);
        }
    }

    const renderForm = () => (
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Field.Text name="bookedByName" label="Réserver par" />
            <LoadingButton variant="contained" sx={{ borderRadius: 9999 }} type="submit" loading={isSubmitting}>
                Réserver
            </LoadingButton>
        </Form>
    )


    return (
        <Box>
            <Typography variant="h3">{wish.name}</Typography>
            <Typography variant="body2">{wish.description}</Typography>
            <Typography variant="body2">{wish.price}</Typography>
            {wish.bookedByUser && <Typography variant="body2">Envie déjà réservé par {wish.bookedByUser.full_name}</Typography>}
            {wish.bookedByName && <Typography variant="body2">Envie déjà réservé par {wish.bookedByName}</Typography>}
            {user ? (
                <Box>
                    <LoadingButton variant="contained" sx={{ borderRadius: 9999 }} onClick={() => bookyByUser(user.id)} loading={isBooking}>
                        Réserver par moi
                    </LoadingButton>
                    <Divider sx={{ my: 2 }}><Typography variant="body2">OU</Typography></Divider>
                    {renderForm()}
                </Box>
            ) : renderForm()}
        </Box>
    );
}