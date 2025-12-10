'use client';

import { useTranslate } from 'src/locales';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'src/components/hook-form';
import { Box, Stack, Typography, useColorScheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Field } from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
import { supabase } from 'src/lib/supabase-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { WishList } from 'src/app/wewish/types/WishList';
import { paths } from 'src/routes/paths';
import { Image } from 'src/components/image';
import { BackButton } from '../BackButton';

export const UpsertList = ({ wishList }: { wishList?: WishList }) => {
  const { t } = useTranslate();
  const { user } = useAuthContext();
  const router = useRouter();
  const { mode, systemMode } = useColorScheme();

  const isDarkMode = mode === 'dark' || (mode === 'system' && systemMode === 'dark');

  const defaultValues = {
    listName: wishList?.name || '',
    description: wishList?.description || '',
  };

  const createListFormSchema = z.object({
    listName: z.string().min(1, { message: t('wewish.listNameIsRequired') }),
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
      const { error } = await supabase
        .from('wish-lists')
        .update({
          name: values.listName,
          description: values.description,
        })
        .eq('id', wishList.id);

      if (error) toast.error(error.message);
      else toast.success('Liste mise à jour');

      router.push(paths.wewish.wishList.detail(wishList.id));
    } else {
      const { data, error } = await supabase
        .from('wish-lists')
        .insert({
          name: values.listName,
          description: values.description,
          user_id: user?.id,
        })
        .select('id')
        .single<{ id: number }>();

      if (error) toast.error(error.message);
      if (!data) return;

      router.push(paths.wewish.wishList.detail(data.id));
    }
  };

  return (
    <Stack
      gap={2}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box sx={{ flex: 1, display: { xs: 'none', sm: 'block' } }}>
        <Image
          src={
            isDarkMode
              ? '/assets/illustrations/illustration-wishlist-dark.svg'
              : '/assets/illustrations/illustration-wishlist.svg'
          }
          alt="Wishlist"
          sx={{ width: '100%', height: '100%' }}
        />
      </Box>

      <Stack flex={1} sx={{ p: { xs: 3, sm: 10 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <BackButton />
        </Stack>
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {wishList ? `Mettre à jour la liste "${wishList.name}"` : "Créer une liste d'envies"}
          </Typography>

          <Typography variant="body1">
            Créez une liste pour regrouper tous vos souhaits et cadeaux.
            <br />
            Vos proches pourront la consulter et savoir exactement ce qui vous ferait plaisir.
          </Typography>

          <Field.Text
            name="listName"
            label="Nom de la liste"
            sx={{ mt: 3 }}
            autoFocus
            placeholder="Ex: Liste de Noël de Gustave"
          />

          <Field.Text
            name="description"
            label="Description"
            sx={{ mt: 3 }}
            placeholder="Description de la liste"
            multiline
            minRows={3}
            maxRows={6}
          />

          <LoadingButton
            variant="contained"
            type="submit"
            loading={isSubmitting}
            sx={{
              borderRadius: '9999px',
              mt: { xs: 4, sm: 3 },
              width: { xs: '100%', sm: '40%' },
              height: '48px',
            }}
          >
            {wishList ? 'Mettre à jour la liste' : 'Créer la liste'}
          </LoadingButton>
        </Form>
      </Stack>
    </Stack>
  );
};