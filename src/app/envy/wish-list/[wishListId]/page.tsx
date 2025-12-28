import { Divider, Stack, Typography, Container, Avatar, Box } from "@mui/material";
import { Wishes } from "../../components/Wishes";
import { View500 } from "src/sections/error";
import { NotFoundView } from "src/sections/error";
import { getAuthUser } from "src/auth/getAuthUser";
import { paths } from "src/routes/paths";
import { WishListButtons } from "./WishListButtons";
import { redirect } from "next/navigation";
import { getServerWishListQuery } from "../../queries/wishList/server";
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { Image } from "src/components/image";

export default async function WishListPage({ params, searchParams }: {
    params: { wishListId: number },
    searchParams?: { sharedLink?: string }
}) {
    const { wishListId } = params;

    const sharedLink = searchParams?.sharedLink === "true";
    const userRes = await getAuthUser()
    if (!userRes.success) return <View500 />
    const user = userRes.user || undefined;

    const serverWishListQuery = await getServerWishListQuery();
    const result = await serverWishListQuery.getWishList(wishListId, user?.id);
    if (!result.success) return <View500 />
    const wishList = result.wishList;
    if (!wishList) return <NotFoundView />

    const owner = wishList.user;
    const isOwner = owner.id === user?.id;

    if (user && sharedLink && owner.id !== user.id && !wishList.isFollowedByMe) {
        await serverWishListQuery.followList(wishList.id, user.id);
        return redirect(paths.envy.wishList.detail(wishList.id));
    }

    return (
        <Box >
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
            >
                <CustomBreadcrumbs
                    links={[
                        isOwner ? { name: 'Mes listes', href: paths.envy.wishList.myLists } : { name: 'Listes suivies', href: paths.envy.wishList.followedLists },
                        { name: wishList.name },
                    ]}
                    sx={{ position: 'relative', zIndex: 1 }}
                />

                <Stack direction="row" spacing={1} width="100%" sx={{ position: "relative", p: 3, height: { xs: 128, sm: 256 } }}>
                    <Image
                        src={wishList.imageUrl}
                        alt={wishList.name}
                        width="100%"
                        sx={{ borderRadius: 2, height: { xs: 128, sm: 256 }, position: "absolute", top: 0, left: 0, right: 0 }}
                    />
                    <Stack sx={{ position: 'absolute', top: { xs: 12, sm: 24 }, right: { xs: 12, sm: 24 } }}>
                        <WishListButtons wishList={wishList} user={user} />
                    </Stack>
                </Stack>

                <Stack direction="column" justifyContent="space-between" width="100%" alignItems="center">
                    <Box sx={{ p: 0.5, bgcolor: "background.paper", borderRadius: 999, mt: { xs: -7, sm: -10 }, zIndex: 1 }}>
                        <Avatar src={owner.avatar_url} alt={owner.display_name} sx={{
                            width: { xs: 56, sm: 100 },
                            height: { xs: 56, sm: 100 }
                        }} />
                    </Box>
                    <Typography variant="subtitle2" color="text.secondary">
                        {owner.display_name}
                    </Typography>
                    <Typography variant="h3">
                        {wishList.name}
                    </Typography>
                    {wishList.description && (
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5, whiteSpace: 'pre-wrap', textAlign: 'center' }}>
                            {wishList.description}
                        </Typography>
                    )}
                </Stack>
            </Stack>

            <Divider sx={{ mb: 5, mt: 2 }} />

            <Box sx={{ width: "100%", mb: 10 }}>
                <Wishes wishListId={wishListId} />
            </Box>

        </Box >
    )
}