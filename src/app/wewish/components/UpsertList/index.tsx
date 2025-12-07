'use client';

import { useTranslate } from "src/locales";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "src/components/hook-form";
import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Field } from "src/components/hook-form";
import { useAuthContext } from "src/auth/hooks";
import { supabase } from "src/lib/supabase-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { WishList } from "src/app/wewish/types/WishList";
import { paths } from "src/routes/paths";

export const UpsertList = ({ wishList }: { wishList?: WishList }) => {
    const { t } = useTranslate();
    const { user } = useAuthContext();
    const router = useRouter();

    const defaultValues = {
        listName: wishList?.name || '',
        description: wishList?.description || '',
    };
    const createListFormSchema = z.object({
        listName: z.string().min(1, { message: t("wewish.listNameIsRequired") }),
        description: z.string().optional(),
    });
    type CreateListFormSchemaType = z.infer<typeof createListFormSchema>;

    const methods = useForm<CreateListFormSchemaType>({
        resolver: zodResolver(createListFormSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async () => {
        const values = methods.getValues();

        if (wishList) {
            const { error } = await supabase.from('wish-lists').update({
                name: values.listName,
                description: values.description,
            }).eq('id', wishList.id);

            if (error) toast.error(error.message);
            else toast.success('Liste mise à jour');

            router.push(paths.wewish.wishList.detail(wishList.id));
        } else {
            const { data, error } = await supabase.from('wish-lists').insert({
                name: values.listName,
                description: values.description,
                user_id: user?.id,
            }).select("id").single<{ id: number }>();

            if (error) toast.error(error.message);

            if (!data) return;

            router.push(paths.wewish.wishList.detail(data.id));
        }
    };

    return (
        <Box sx={{ mt: 3, p: 10 }}>
            <Form methods={methods} onSubmit={handleSubmit(onSubmit)} >
                <Typography variant="h4" sx={{ mb: 2 }}>{wishList ? `Mettre à jour la liste "${wishList.name}"` : "Créer une liste d'envies"}</Typography>
                <Typography variant="body1">Créez une liste pour regrouper tous vos souhaits et cadeaux.<br />Vos proches pourront la consulter et savoir exactement ce qui vous ferait plaisir.</Typography>
                <Field.Text name="listName" label="Nom de la liste" sx={{ mt: 3 }} autoFocus placeholder={`Ex: Liste de Noël de Gustave`} />
                <Field.Text name="description" label="Description" sx={{ mt: 3 }} placeholder="Description de la liste" />
                <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={isSubmitting}
                    sx={{ borderRadius: '9999px', mt: 3 }}
                >
                    {wishList ? "Mettre à jour la liste" : "Créer la liste"}
                </LoadingButton>
            </Form>
        </Box>
    );
}   