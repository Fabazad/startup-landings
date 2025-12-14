import { Box, Stack, Typography, alpha, useTheme } from '@mui/material';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
    imagesUrls: string[];
    selectedImage?: string;
    onSelectImage: (image: string) => void;
};

export const ImageSelector = ({ imagesUrls, selectedImage, onSelectImage }: Props) => {
    const theme = useTheme();

    return (
        <Stack direction="row" flexWrap="wrap" gap={2}>
            {imagesUrls.map((url, index) => {
                const isSelected = selectedImage === url;

                return (
                    <Box
                        key={index}
                        onClick={() => onSelectImage(url)}
                        sx={{
                            width: 100,
                            height: 100,
                            cursor: 'pointer',
                            overflow: 'hidden',
                            borderRadius: 1.5,
                            position: 'relative',
                            border: `2px solid ${isSelected ? theme.palette.primary.main : 'transparent'}`,
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
                                    right: 6,
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
                );
            })}
            {/* <Field.UploadImage
                name="singleUpload"
                maxSize={3145728}
                onUpload={console.log}
            /> */}
        </Stack>
    );
};