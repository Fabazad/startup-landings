'use client';

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
import { WishList } from 'src/app/envy/types/WishList';
import { paths } from 'src/routes/paths';
import { Image } from 'src/components/image';
import { BackButton } from '../BackButton';
import { CONFIG } from 'src/config-global';
import { ImageSelector } from '../ImageSelector';

const images = [
  `${CONFIG.assetsDir}/assets/images/list/birthday1.svg`,
  `${CONFIG.assetsDir}/assets/images/list/birthday2.svg`,
  `${CONFIG.assetsDir}/assets/images/list/birthday3.svg`,
  `${CONFIG.assetsDir}/assets/images/list/christmas1.svg`,
  `${CONFIG.assetsDir}/assets/images/list/christmas2.svg`,
  `${CONFIG.assetsDir}/assets/images/list/christmas3.svg`,
  `${CONFIG.assetsDir}/assets/images/list/housewarming1.svg`,
  `${CONFIG.assetsDir}/assets/images/list/wedding1.svg`,
  `${CONFIG.assetsDir}/assets/images/list/wedding2.svg`,
]

export const UpsertList = ({ wishList }: { wishList?: WishList }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const { mode, systemMode } = useColorScheme();

  const isDarkMode = mode === 'dark' || (mode === 'system' && systemMode === 'dark');

  const createListFormSchema = z.object({
    listName: z.string().min(1, { message: "Le nom de la liste est requis" }),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
  });

  type CreateListFormSchemaType = z.infer<typeof createListFormSchema>;

  const defaultValues: CreateListFormSchemaType = {
    listName: wishList?.name || '',
    description: wishList?.description || '',
    imageUrl: wishList?.imageUrl || images[0],
  };

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
          imageUrl: values.imageUrl,
        })
        .eq('id', wishList.id);

      if (error) toast.error(error.message);
      else toast.success('Liste mise à jour');

      router.push(paths.envy.wishList.detail(wishList.id));
    } else {
      const { data, error } = await supabase
        .from('wish-lists')
        .insert({
          name: values.listName,
          description: values.description,
          imageUrl: values.imageUrl,
          user_id: user?.id,
        })
        .select('id')
        .single<{ id: number }>();

      if (error) toast.error(error.message);
      if (!data) return;
      toast.success('Liste créée');

      router.push(paths.envy.wishList.addWish(data.id));
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
          <BackButton path={wishList ? paths.envy.wishList.detail(wishList.id) : paths.envy.root} />
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
            label="Description (optionnel)"
            sx={{ mt: 3 }}
            placeholder="Description de la liste"
            multiline
            minRows={3}
            maxRows={6}
          />

          <Stack sx={{ mt: 3 }}>
            <Typography variant="body1" sx={{ mt: 3 }}>
              Image de la liste
            </Typography>
            <ImageSelector
              imagesUrls={images}
              selectedImage={methods.watch('imageUrl')}
              onSelectImage={(image) => methods.setValue('imageUrl', image)}
            />
          </Stack>

          <LoadingButton
            variant="contained"
            type="submit"
            loading={isSubmitting}
            sx={{
              borderRadius: '9999px',
              mt: { xs: 4, sm: 3 },
              width: '100%',
              height: '48px',
              position: { xs: "sticky", sm: "relative" },
              bottom: { xs: 100, sm: 0 },
              zIndex: 1000,
            }}
          >
            {wishList ? 'Mettre à jour la liste' : 'Créer la liste'}
          </LoadingButton>
        </Form>
      </Stack>
    </Stack>
  );
};