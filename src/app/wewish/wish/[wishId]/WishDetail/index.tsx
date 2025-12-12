import { Box, Typography, Grid, Stack, Chip, Divider, Card } from "@mui/material";
import { Image } from 'src/components/image';
import { Iconify } from "src/components/iconify";
import WishDetailActions from "./WishDetailActions";
import { defaultWishImageUrl, Wish } from "src/app/wewish/types/Wish";
import { BackButton } from "src/app/wewish/components/BackButton";

export const WishDetail = ({ wish }: { wish: Wish }) => {
    return (
        <Box>
            <Box sx={{ mb: 2 }}>
                <BackButton />
            </Box>
            <Grid container spacing={{ xs: 3, md: 5 }}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2, borderRadius: 2 }}>
                        <Image
                            alt={wish.name}
                            src={wish.imageUrl || defaultWishImageUrl}
                            ratio="1/1"
                            sx={{ borderRadius: 2, cursor: 'pointer' }}
                        />
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="h3" component="h1" gutterBottom>
                                {wish.name}
                            </Typography>

                            <Stack direction="row" alignItems="center" spacing={2}>
                                {wish.price && (
                                    <Typography variant="body1" color="primary.main" fontWeight="bold">
                                        Prix indicatif : {wish.price} €
                                    </Typography>
                                )}
                            </Stack>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Description
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                                {wish.description || "Aucune description fournie."}
                            </Typography>
                        </Box>

                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                            {wish.isFavorite && (
                                <Chip
                                    icon={<Iconify icon="solar:heart-bold" />}
                                    label="Coup de cœur"
                                    color="primary"
                                    variant="soft"
                                />
                            )}
                            {wish.isSecondHand && (
                                <Chip
                                    icon={<Iconify icon="streamline:recycle-1-solid" />}
                                    label="Seconde main acceptée"
                                    color="success"
                                    variant="outlined"
                                />
                            )}
                            {wish.acceptEquivalent && (
                                <Chip
                                    icon={<Iconify icon="solar:gift-bold" />}
                                    label="Cadeau équivalent accepté"
                                    color="info"
                                    variant="outlined"
                                />
                            )}
                        </Stack>

                        <WishDetailActions wish={wish} />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}