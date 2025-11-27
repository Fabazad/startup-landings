"use client";

import { WishList } from "../../types/WishList";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { ArchiveWishListButton } from "./ArchiveWishListButton";
import { DeleteWishListButton } from "./DeleteWishListButton";
import { UnarchiveWishListButton } from "./UnarchiveWishListButton";

export const WishListItem = ({ wishList }: { wishList: WishList }) => {

    return (
        <Box>
            <Typography variant="h5">{wishList.name}</Typography>
            <Typography variant="body2">{wishList.description}</Typography>
            <Link href={`/wewish/wish-list/${wishList.id}`}>
                <Button variant="contained" sx={{ borderRadius: 9999 }}>Voir</Button>
            </Link>
            {wishList.archivedAt ? <UnarchiveWishListButton wishListId={wishList.id} /> : <ArchiveWishListButton wishListId={wishList.id} />}
            <DeleteWishListButton wishListId={wishList.id} />
            <Link href={`/wewish/wish-list/${wishList.id}/update`}>
                <Button variant="contained" sx={{ borderRadius: 9999 }}>Modifier</Button>
            </Link>
        </Box>
    );
}