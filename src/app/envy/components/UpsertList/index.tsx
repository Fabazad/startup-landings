'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'src/components/hook-form';
import { Box, ClickAwayListener, Divider, IconButton, MenuItem, Stack, Tooltip, Typography, useColorScheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Field } from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
import { supabase } from 'src/lib/supabase-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ListType, WishList } from 'src/app/envy/types/WishList';
import { paths } from 'src/routes/paths';
import { Image } from 'src/components/image';
import { CONFIG } from 'src/config-global';
import { ImageSelector } from '../ImageSelector';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useState } from 'react';
import { uploadListImageAndGetUrl } from '../../queries/storage';
import { Iconify } from 'src/components/iconify';

const getImageUrl = async (image: string | File): Promise<string> => {
  if (image instanceof File) {
    const url = await uploadListImageAndGetUrl(image);
    return url;
  } else {
    return image;
  }
}

const images: Record<ListType, string[]> = {
  [ListType.WISH_LIST]: [
    `${CONFIG.assetsDir}/assets/images/list/birthday1.svg`,
    `${CONFIG.assetsDir}/assets/images/list/birthday2.svg`,
    `${CONFIG.assetsDir}/assets/images/list/birthday3.svg`,
    `${CONFIG.assetsDir}/assets/images/list/birthday4.svg`,
  ],
  [ListType.CHRISTMAS]: [
    `${CONFIG.assetsDir}/assets/images/list/christmas1.svg`,
    `${CONFIG.assetsDir}/assets/images/list/christmas2.svg`,
    `${CONFIG.assetsDir}/assets/images/list/christmas3.svg`,
    `${CONFIG.assetsDir}/assets/images/list/christmas4.svg`,
    `${CONFIG.assetsDir}/assets/images/list/christmas5.svg`,
  ],
  [ListType.BIRTHDAY]: [
    `${CONFIG.assetsDir}/assets/images/list/birthday1.svg`,
    `${CONFIG.assetsDir}/assets/images/list/birthday2.svg`,
    `${CONFIG.assetsDir}/assets/images/list/birthday3.svg`,
    `${CONFIG.assetsDir}/assets/images/list/birthday4.svg`,
    `${CONFIG.assetsDir}/assets/images/list/birthday5.svg`,
  ],
  [ListType.BIRTH]: [
    `${CONFIG.assetsDir}/assets/images/list/birth1.svg`,
    `${CONFIG.assetsDir}/assets/images/list/birth2.svg`,

  ],
  [ListType.WEDDING]: [
    `${CONFIG.assetsDir}/assets/images/list/wedding1.svg`,
    `${CONFIG.assetsDir}/assets/images/list/wedding2.svg`,
    `${CONFIG.assetsDir}/assets/images/list/wedding3.svg`,
    `${CONFIG.assetsDir}/assets/images/list/wedding4.svg`,

  ],
  [ListType.HOUSEWARMING]: [
    `${CONFIG.assetsDir}/assets/images/list/housewarming1.svg`,
    `${CONFIG.assetsDir}/assets/images/list/housewarming2.svg`,
    `${CONFIG.assetsDir}/assets/images/list/housewarming3.svg`,

  ],
  [ListType.BAPTISM]: [
    `${CONFIG.assetsDir}/assets/images/list/baptism1.svg`,
    `${CONFIG.assetsDir}/assets/images/list/baptism2.svg`,

  ],
};

export const UpsertList = ({ wishList }: { wishList?: WishList }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const { mode, systemMode } = useColorScheme();
  const [selectableImages, setSelectableImages] = useState<string[]>(images[wishList?.type || ListType.WISH_LIST]);
  const [isCollaborativeTooltipOpen, setIsCollaborativeTooltipOpen] = useState(false);

  const isDarkMode = mode === 'dark' || (mode === 'system' && systemMode === 'dark');

  const listTypeNameRecord: Record<ListType, string> = {
    [ListType.WISH_LIST]: 'Liste d\'envies (classique)',
    [ListType.CHRISTMAS]: 'Liste de noël',
    [ListType.BIRTHDAY]: 'Liste d\'anniversaire',
    [ListType.BIRTH]: 'Liste de naissance',
    [ListType.WEDDING]: 'Liste de mariage',
    [ListType.HOUSEWARMING]: 'Liste de crémaillère',
    [ListType.BAPTISM]: 'Liste de baptême',
  }

  const createListFormSchema = z.object({
    listName: z.string().min(1, { message: "Le nom de la liste est requis" }),
    description: z.string().optional(),
    type: z.nativeEnum(ListType),
    image: z.union([z.instanceof(File), z.string()]),
    fundraising: z.string().optional(),
    isCollaborative: z.boolean().default(false),
  });

  type CreateListFormSchemaType = z.infer<typeof createListFormSchema>;

  const methods = useForm<CreateListFormSchemaType>({
    resolver: zodResolver(createListFormSchema),
    defaultValues: {
      listName: wishList?.name,
      description: wishList?.description || undefined,
      type: wishList?.type || ListType.WISH_LIST,
      image: wishList?.imageUrl || images[ListType.WISH_LIST][0],
      isCollaborative: wishList?.isCollaborative || false,
      fundraising: wishList?.fundraising || undefined,
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    const values = methods.getValues();

    const imageUrl = await getImageUrl(values.image);

    if (wishList) {
      const { error } = await supabase
        .from('wish-lists')
        .update({
          name: values.listName,
          description: values.description,
          imageUrl,
          type: values.type,
          isCollaborative: values.isCollaborative,
          fundraising: values.fundraising,
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
          imageUrl,
          user_id: user?.id,
          type: values.type,
          isCollaborative: values.isCollaborative,
          fundraising: values.fundraising,
        })
        .select('id')
        .single<{ id: number }>();

      if (error) toast.error(error.message);
      if (!data) return;
      toast.success('Liste créée');

      router.push(paths.envy.wishList.addWish(data.id));
    }
  };

  const handleListTypeChange = (type: ListType) => {
    methods.setValue('type', type);
    setSelectableImages(images[type]);
    methods.setValue('image', images[type][0]);
  };

  const title = wishList ? `Mettre à jour la liste "${wishList.name}"` : 'Créer une liste d\'envies';

  return (
    <Stack
      gap={2}
      direction="row"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <Box sx={{
        flex: 1,
        display: { xs: 'none', sm: 'block' },
        position: 'sticky',
        top: {
          sm: 'calc(var(--layout-header-mobile-height, 64px) + 24px)',
          md: 'calc(var(--layout-header-desktop-height, 80px) + 24px)'
        }
      }}>
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

      <Stack flex={1} sx={{ px: { xs: 3, sm: 10 }, mt: { xs: 2, sm: 0 } }}>
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={3}>

            <CustomBreadcrumbs
              links={[
                { name: 'Mes listes', href: paths.envy.wishList.myLists },
                { name: title },
              ]}
            />

            <Typography variant="h4">
              {title}
            </Typography>

            <Typography variant="body1">
              Créez une liste pour regrouper tous vos souhaits et cadeaux.
              <br />
              Vos proches pourront la consulter et savoir exactement ce qui vous ferait plaisir.
            </Typography>

            <Field.Text
              name="listName"
              label="Nom de votre liste"
              autoFocus
              placeholder="Ex: Liste de Noël de Gustave"
            />

            <Field.Select
              name="type"
              label="Type de liste"
              onChange={(e) => handleListTypeChange(e.target.value as ListType)}
            >
              {Object.values(ListType).map((type) => (
                <MenuItem key={type} value={type} sx={{ p: 2 }}>
                  {listTypeNameRecord[type]}
                </MenuItem>
              ))}
            </Field.Select>

            <Field.Text
              name="description"
              label="Texte d'introduction (optionnel)"
              placeholder="Ecrivez en quelques mots votre texte d'introduction"
              multiline
              minRows={3}
              maxRows={6}
            />

            <Divider />
            <Stack spacing={1}>
              <Typography variant="h6">
                Choisir une image pour illustrer votre liste
              </Typography>
              <ImageSelector
                imagesUrls={selectableImages}
                selectedImage={methods.watch('image')}
                onSelectImage={(image) => {
                  methods.setValue('image', image);
                }}
                canUpload
              />
            </Stack>

            <Divider />

            <Typography variant="h6">
              Paramètres de votre liste
            </Typography>
            <Field.Text
              name="fundraising"
              label="Lien de votre cagnotte en ligne"
              placeholder="Ex : https://www.leetchi.com/fr/c/ma-cagnotte"
            />
            <Field.Switch
              name="isCollaborative"
              label={
                <Typography variant="subtitle2">
                  Liste collaborative ?
                  <ClickAwayListener onClickAway={() => setIsCollaborativeTooltipOpen(false)}>
                    <Tooltip
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      open={isCollaborativeTooltipOpen}
                      arrow
                      title={
                        <Typography variant="body2">
                          Permet aux autres utilisateurs de <b>rajouter des envies à votre liste</b> et de <b>voter pour leurs envies préférées</b>.<br />
                          Vous pourrez aussi <b>réserver des envies sur votre propre liste</b>.
                        </Typography>
                      }
                      slotProps={{ tooltip: { sx: { fontSize: '1rem', padding: '8px 16px' } } }}
                    >
                      <IconButton color="inherit" onClick={() => setIsCollaborativeTooltipOpen(!isCollaborativeTooltipOpen)}>
                        <Iconify icon="eva:question-mark-circle-outline" />
                      </IconButton>
                    </Tooltip>
                  </ClickAwayListener>
                </Typography>
              }
            />

            <LoadingButton
              variant="contained"
              type="submit"
              loading={isSubmitting}
              sx={{
                borderRadius: '9999px',
                mt: { xs: 4, scrollMargin: 3 },
                mx: 3,
                height: '48px',
                position: "sticky",
                bottom: { xs: 100, sm: 0 },
                zIndex: 1000,
              }}
            >
              {wishList ? 'Mettre à jour la liste' : 'Créer la liste'}
            </LoadingButton>
          </Stack>
        </Form>
      </Stack >
    </Stack >
  );
};