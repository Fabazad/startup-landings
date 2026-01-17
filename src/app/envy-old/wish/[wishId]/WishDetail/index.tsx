import { Box, Typography, Grid, Stack, Chip, Divider, Card } from "@mui/material";
import { Image } from 'src/components/image';
import { Iconify } from "src/components/iconify";
import { WishDetailActions } from "./WishDetailActions";
import { defaultWishImageUrl, Wish } from "src/app/envy/types/Wish";
import { User } from "src/app/envy/types/User";
import { formatUrl } from "src/utils/format-url";
import { paths } from "src/routes/paths";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

export const WishDetail = ({ wish, user }: { wish: Wish; user?: User }) => {

    const isOwner = user?.id === wish.userId;

    return (
        <Grid container spacing={5} sx={{ display: 'flex', alignItems: 'flex-start', pt: 0 }}>
            <Grid item xs={12} md={6} sx={{ position: { xs: 'relative', md: 'sticky' }, top: { md: 100, xs: 0 }, height: 'fit-content', pt: 0 }} >
                <CustomBreadcrumbs
                    links={[
                        isOwner ? { name: 'Mes listes', href: paths.envy.wishList.myLists } : { name: 'Listes suivies', href: paths.envy.wishList.followedLists },
                        { name: wish.list.name, href: paths.envy.wishList.detail(wish.list.id) },
                        { name: wish.name },
                    ]}
                    sx={{ mb: 3, display: { xs: 'flex', md: 'none' } }}
                />
                <Stack justifyContent={"center"} direction={'row'}>
                    <Card sx={{ p: 2, borderRadius: 2, width: { md: '100%', xs: '50%' } }}>
                        <Image
                            alt={wish.name}
                            src={wish.imageUrl || defaultWishImageUrl}
                            ratio="1/1"
                            sx={{ borderRadius: 2 }}
                        />
                    </Card>
                </Stack>

            </Grid>

            <Grid item xs={12} md={6} sx={{ pb: 6 }}>
                <Stack spacing={3}>
                    <CustomBreadcrumbs
                        links={[
                            isOwner ? { name: 'Mes listes', href: paths.envy.wishList.myLists } : { name: 'Listes suivies', href: paths.envy.wishList.followedLists },
                            { name: wish.list.name, href: paths.envy.wishList.detail(wish.list.id) },
                            { name: wish.name },
                        ]}
                        sx={{ display: { xs: 'none', md: 'flex' } }}
                    />
                    <Box>
                        <Typography variant="h3" component="h1" gutterBottom sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}>
                            {wish.name}
                        </Typography>

                        {
                            wish.productUrl && (
                                <Typography sx={{ mt: 0.5 }} variant="body1" >
                                    {formatUrl(wish.productUrl)}
                                </Typography>
                            )
                        }

                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 3 }}>
                            {wish.isFavorite && (
                                <Chip
                                    icon={<Iconify icon="solar:heart-bold" />}
                                    label="Coup de cœur"
                                    color="error"
                                    variant="soft"
                                />
                            )}
                            {wish.isSecondHand && (
                                <Chip
                                    icon={<Iconify icon="streamline:recycle-1-solid" />}
                                    label="Seconde main acceptée"
                                    color="success"
                                    variant="soft"
                                />
                            )}
                            {wish.acceptEquivalent && (
                                <Chip
                                    icon={<Iconify icon="eva:swap-outline" />}
                                    label="Cadeau équivalent accepté"
                                    color="info"
                                    variant="soft"
                                />
                            )}
                        </Stack>

                    </Box>

                    <Box>
                        <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-wrap', mt: { md: 1 }, mb: { md: 1 } }}>
                            {wish.description || "Aucune description fournie."}
                        </Typography>
                    </Box>

                    <Divider />

                    <WishDetailActions wish={wish} user={user} />
                </Stack>
            </Grid>
        </Grid>
    );
}