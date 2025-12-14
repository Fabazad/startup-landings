import { Box, Typography, Grid, Stack, Chip, Divider, Card } from "@mui/material";
import { Image } from 'src/components/image';
import { Iconify } from "src/components/iconify";
import { WishDetailActions } from "./WishDetailActions";
import { defaultWishImageUrl, Wish } from "src/app/envy/types/Wish";
import { BackButton } from "src/app/envy/components/BackButton";
import { User } from "src/app/envy/types/User";

export const WishDetail = ({ wish, user }: { wish: Wish; user?: User }) => {
    return (
        <Grid container spacing={5}>

            <Grid item xs={12} md={6} sx={{ position: { md: 'sticky' }, top: { md: 100 }, height: 'fit-content' }} >

                <Box sx={{ mb: 2 }}>
                    <BackButton />
                </Box>
                <Card sx={{ p: 2, borderRadius: 2 }}>
                    <Image
                        alt={wish.name}
                        src={wish.imageUrl || defaultWishImageUrl}
                        ratio="1/1"
                        sx={{ borderRadius: 2, cursor: 'pointer' }}
                    />
                </Card>
            </Grid>

            <Grid item xs={12} md={6} sx={{ pb: 6 }}>
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
                                icon={<Iconify icon="eva:swap-outline" />}
                                label="Cadeau équivalent accepté"
                                color="info"
                                variant="outlined"
                            />
                        )}
                    </Stack>

                    <WishDetailActions wish={wish} user={user} />
                </Stack>
            </Grid>
        </Grid>
    );
}