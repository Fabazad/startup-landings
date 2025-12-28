import { Divider, Stack, Typography, Container, Avatar } from "@mui/material";
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
import { ST } from "next/dist/shared/lib/utils";

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
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
                sx={{ mb: 3 }}

            >
                <CustomBreadcrumbs
                    links={[
                        isOwner ? { name: 'Mes listes', href: paths.envy.wishList.myLists } : { name: 'Listes suivies', href: paths.envy.wishList.followedLists },
                        { name: wishList.name },
                    ]}
                    sx={{ position: 'relative', zIndex: 1 }}
                />

                <Image
                    src={wishList.imageUrl}
                    alt={wishList.name}
                    width="100%"
                    sx={{ borderRadius: 2, height: { xs: 128, sm: 256 } }}
                />

                <Stack direction="row" spacing={1} width="100%" sx={{ position: "relative" }}>

                    <Stack direction="row" justifyContent="space-between" width="100%">

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
                        <Stack sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <WishListButtons wishList={wishList} user={user} />
                        </Stack>
                    </Stack>

                    <Stack sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <WishListButtons wishList={wishList} user={user} />
                    </Stack>

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