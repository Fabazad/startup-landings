import { Box, Button, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { Wishes } from "../../components/Wishes";
import { getWishListQuery } from "../../queries/wishList";
import { View500 } from "src/sections/error";
import { NotFoundView } from "src/sections/error";
import { DeleteWishListButton } from "../../components/DeleteWishListButton";


export default async function WishListPage({ params }: { params: { wishListId: number } }) {
    const { wishListId } = params;

    const result = await getWishListQuery(wishListId);

    if (!result.success) return <View500 />
    const wishList = result.wishList;
    if (!wishList) return <NotFoundView />

    return (
        <Box>
            <Typography variant="h3">{wishList.name}</Typography>
            <Typography variant="body2">{wishList.description}</Typography>
            <Link href={`/wewish/wish-list/${wishListId}/update`}>
                <Button variant="contained" sx={{ borderRadius: 9999 }}>Modifier</Button>
            </Link>
            <DeleteWishListButton wishListId={wishListId} />
            <Divider />
            <Wishes wishListId={wishListId} />
        </Box>
    )
}