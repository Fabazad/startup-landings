import { Box, Button, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { Wishes } from "../../components/Wishes";
import { getWishListQuery } from "../../queries/wishList";
import { View500 } from "src/sections/error";
import { NotFoundView } from "src/sections/error";
import { ArchiveWishListButton } from "../../components/WishListItem/ArchiveWishListButton";
import { DeleteWishListButton } from "../../components/WishListItem/DeleteWishListButton";
import { getAuthUser } from "src/auth/getAuthUser";

export default async function WishListPage({ params }: { params: { wishListId: number } }) {
    const { wishListId } = params;

    const [result, userRes] = await Promise.all([getWishListQuery(wishListId), getAuthUser()]);

    if (!result.success || !userRes.success) return <View500 />
    const wishList = result.wishList;
    if (!wishList) return <NotFoundView />
    const user = userRes.user;

    return (
        <Box>
            <Typography variant="h3">{wishList.name}</Typography>
            <Typography variant="body2">{wishList.description}</Typography>
            {wishList.user_id === user.id ? (
                <>
                    <Link href={`/wewish/wish-list/${wishListId}/update`}>
                        <Button variant="contained" sx={{ borderRadius: 9999 }}>Modifier</Button>
                    </Link>
                    <ArchiveWishListButton wishListId={wishListId} />
                    <DeleteWishListButton wishListId={wishListId} />
                    <Divider />
                </>
            ) : (<Button variant="contained" sx={{ borderRadius: 9999 }}>Suivre la liste</Button>)}

            <Wishes wishListId={wishListId} />
        </Box >
    )
}