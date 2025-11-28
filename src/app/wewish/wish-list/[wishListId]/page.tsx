import { Box, Button, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { Wishes } from "../../components/Wishes";
import { getWishListQuery } from "../../queries/wishList";
import { View500 } from "src/sections/error";
import { NotFoundView } from "src/sections/error";
import { getAuthUser } from "src/auth/getAuthUser";
import { ArchiveWishListButton } from "../../components/WishListGrid/WishListItem/ArchiveWishListButton";
import { DeleteWishListButton } from "../../components/WishListGrid/WishListItem/DeleteWishListButton";
import { FollowWishListButton } from "../../components/WishListGrid/WishListItem/FollowWishListButton";
import { UnfollowWishListButton } from "../../components/WishListGrid/WishListItem/UnfollowWishListButton";

export default async function WishListPage({ params }: { params: { wishListId: number } }) {
    const { wishListId } = params;

    const userRes = await getAuthUser()
    if (!userRes.success) return <View500 />
    const user = userRes.user;

    const result = await getWishListQuery(wishListId, user?.id);

    if (!result.success) return <View500 />
    const wishList = result.wishList;
    if (!wishList) return <NotFoundView />

    return (
        <Box>
            <Typography variant="h3">{wishList.name}</Typography>
            <Typography variant="body2">{wishList.description}</Typography>
            {wishList.user.id === user?.id && (
                <>
                    <Link href={`/wewish/wish-list/${wishListId}/update`}>
                        <Button variant="contained" sx={{ borderRadius: 9999 }}>Modifier</Button>
                    </Link>
                    <ArchiveWishListButton wishListId={wishListId} />
                    <DeleteWishListButton wishListId={wishListId} />
                    <Divider />
                </>
            )}
            {user && !wishList.isFollowedByMe && (<FollowWishListButton wishListId={wishListId} userId={user.id} />)}
            {user && wishList.isFollowedByMe && (<UnfollowWishListButton wishListId={wishListId} userId={user.id} />)}

            <Wishes wishListId={wishListId} />
        </Box >
    )
}