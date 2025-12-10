import { Box, Divider, Stack, Typography, Container, Avatar } from "@mui/material";
import { Wishes } from "../../components/Wishes";
import { getWishListQuery } from "../../queries/wishList";
import { View500 } from "src/sections/error";
import { NotFoundView } from "src/sections/error";
import { getAuthUser } from "src/auth/getAuthUser";
import { paths } from "src/routes/paths";
import { BackButton } from "src/app/wewish/components/BackButton";
import { WishListButtons } from "./WishListButtons";

export default async function WishListPage({ params }: { params: { wishListId: number } }) {
    const { wishListId } = params;

    const userRes = await getAuthUser()
    if (!userRes.success) return <View500 />
    const user = userRes.user || undefined;

    const result = await getWishListQuery(wishListId, user?.id);

    if (!result.success) return <View500 />
    const wishList = result.wishList;
    if (!wishList) return <NotFoundView />

    const owner = wishList.user;

    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <Stack direction="row" sx={{ mb: 2 }} justifyContent="space-between">
                <BackButton fallbackPath={paths.wewish.root} />
                <Stack sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <WishListButtons wishList={wishList} user={user} />
                </Stack>
            </Stack>

            <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', md: 'center' }}
                spacing={2}
                sx={{ mb: 3 }}
            >
                <Stack direction="column" spacing={1}>
                    <Typography variant="h3">
                        {wishList.name}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar src={owner.avatar_url} alt={owner.display_name} sx={{ width: 24, height: 24 }} />
                        <Typography variant="subtitle2" color="text.secondary">
                            par {owner.display_name}
                        </Typography>
                    </Stack>
                </Stack>


                <Stack sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <WishListButtons wishList={wishList} user={user} />
                </Stack>
            </Stack>

            {
                wishList.description && (
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5, whiteSpace: 'pre-wrap' }}>
                        {wishList.description}
                    </Typography>
                )
            }

            <Divider sx={{ mb: 5 }} />

            <Wishes wishListId={wishListId} />

        </Container >
    )
}