'use client';

import { Box, Button, Divider, Typography } from "@mui/material";
import { useWish } from "src/app/wewish/hooks/useWish";
import { SplashScreen } from "src/components/loading-screen";
import { useRouter } from "next/navigation";
import { useAuthContext } from "src/auth/hooks";
import { supabase } from "src/lib/supabase-client";
import { toast } from "sonner";
import { Field, Form } from "src/components/hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

export default function BookPage({ params }: { params: { wishId: string } }) {
    const { wishId } = params;
    const { wish, isLoading } = useWish({ wishId });
    const router = useRouter();
    const { user } = useAuthContext();

    const bookedByNameFormSchema = z.object({
        bookedByName: z.string().min(1, { message: "Le nom est requis" }),
    });

    const methods = useForm({
        resolver: zodResolver(bookedByNameFormSchema),
        defaultValues: { bookedByName: '' }
    });

    if (isLoading) return <SplashScreen />;
    if (wish === undefined) return router.push('/not-found');

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;


    const bookyByUser = async (userId: string) => {
        const { data, error } = await supabase
            .from('wishes')
            .update({ bookedByUser: userId })
            .eq('id', wishId);

        if (error) toast.error(error.message);
        else toast.success('Souhait réservé');
    }

    const onSubmit = async () => {
        const data = methods.getValues();
        console.log(data);
        const { error } = await supabase.from('wishes').update({ bookedByName: data.bookedByName }).eq('id', wishId);
        if (error) toast.error(error.message);
        else toast.success('Souhait réservé');
    }

    const renderForm = () => (
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Field.Text name="bookedByName" label="Réserver par" />
            <LoadingButton variant="contained" sx={{ borderRadius: 9999 }} type="submit" loading={isSubmitting}>Réserver</LoadingButton>
        </Form>
    )


    return (
        <Box>
            <Typography variant="h3">{wish.name}</Typography>
            <Typography variant="body2">{wish.description}</Typography>
            <Typography variant="body2">{wish.price}</Typography>
            {user ? (
                <Box>
                    <Button variant="contained" sx={{ borderRadius: 9999 }} onClick={() => bookyByUser(user.id)}>Réserver par moi</Button>
                    <Divider sx={{ my: 2 }}><Typography variant="body2">OU</Typography></Divider>
                    {renderForm()}
                </Box>
            ) : renderForm()}
        </Box>
    );
}