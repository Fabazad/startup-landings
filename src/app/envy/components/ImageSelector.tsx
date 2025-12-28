"use client";

import { Box, Divider, Grid, useTheme } from '@mui/material';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { Field } from 'src/components/hook-form';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

type Props = {
    imagesUrls: string[];
    selectedImage: string | File;
    onSelectImage: (image: string | File) => void;
    canUpload?: boolean;
};

export const ImageSelector = ({ imagesUrls, selectedImage, onSelectImage, canUpload = false }: Props) => {
    const theme = useTheme();
    const isUploadSelected = selectedImage instanceof File || !imagesUrls.includes(selectedImage);
    const { t } = useTranslate()

    const onUploadChange = (file?: File) => {
        if (!file) {
            onSelectImage(imagesUrls[0]);

        } else onSelectImage(file);
    };

    return (
        <Box>
            <Grid container spacing={2}>
                {imagesUrls.map((url, index) => {
                    const isSelected = selectedImage === url;

                    return (
                        <Grid item xs={4} key={index}>
                            <Box
                                onClick={() => onSelectImage(url)}
                                sx={{
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    borderRadius: 1.5,
                                    position: 'relative',
                                    border: `3px solid ${isSelected ? theme.palette.primary.main : 'transparent'}`,
                                    transition: theme.transitions.create(['border-color', 'transform', 'box-shadow'], {
                                        duration: theme.transitions.duration.shorter,
                                    }),
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        boxShadow: theme.shadows[4],
                                        ...(isSelected && {
                                            boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                                        }),
                                    },
                                }}
                            >
                                <Image
                                    src={url}
                                    alt="Scrapped image"
                                    ratio="1/1"
                                    sx={{ width: 1, height: 1 }}
                                />

                                {isSelected && (
                                    <Box
                                        sx={{
                                            top: 6,
                                            left: 6,
                                            position: 'absolute',
                                            borderRadius: '50%',
                                            bgcolor: 'primary.main',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 20,
                                            height: 20,
                                            boxShadow: theme.shadows[2],
                                        }}
                                    >
                                        <Iconify icon="eva:checkmark-fill" width={14} sx={{ color: 'white' }} />
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>

            {canUpload && <Divider sx={{ textTransform: 'uppercase', color: 'text.disabled', my: 2 }}>{t('or')}</Divider>}

            {canUpload && <Box sx={{ position: 'relative' }}>
                <Field.UploadImage
                    name="imageFile"
                    sx={{ "> div:first-of-type": { border: (isUploadSelected ? `3px solid ${theme.palette.primary.main}` : "none"), borderRadius: 2 } }}
                    onChange={onUploadChange}
                    value={isUploadSelected ? selectedImage : undefined}
                />
                {isUploadSelected && <Box
                    sx={{
                        top: 20, left: 20,
                        position: 'absolute',
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 20, height: 20,
                        boxShadow: theme.shadows[2],
                    }}
                >
                    <Iconify icon="eva:checkmark-fill" width={14} sx={{ color: 'white' }} />
                </Box>}
            </Box>}
        </Box>
    );
};