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

            router.push(`/wewish/wish-list/${wishList.id}`);
        } else {
            const { data, error } = await supabase.from('wish-lists').insert({
                name: values.listName,
                description: values.description,
                user_id: user?.id,
            }).select("id").single<{ id: number }>();

            if (error) toast.error(error.message);

            if (!data) return;

            router.push(`/wewish/wish-list/${data.id}`);
        }
    };

    return (
        <Box sx={{ mt: 3, p: 10 }}>
            <Form methods={methods} onSubmit={handleSubmit(onSubmit)} >
                <Typography variant="h5">{t('wewish.addListTitle')}</Typography>
                <Typography>{t('wewish.addListDescription')}</Typography>
                <Field.Text name="listName" label="List Name" sx={{ mt: 3 }} autoFocus placeholder={`Ex: John Doe's List`} />
                <Field.Text name="description" label="Description" sx={{ mt: 3 }} />
                <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    loading={isSubmitting}
                    sx={{ borderRadius: '9999px', mt: 3 }}

                >
                    {wishList ? t('wewish.updateList') : t('wewish.addList')}
                </LoadingButton>
            </Form>
        </Box>
    );
}   