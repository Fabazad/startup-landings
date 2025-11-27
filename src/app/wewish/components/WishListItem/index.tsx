"use client";

import { WishList } from "../../types/WishList";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { ArchiveWishListButton } from "./ArchiveWishListButton";
import { DeleteWishListButton } from "./DeleteWishListButton";
import { UnarchiveWishListButton } from "./UnarchiveWishListButton";
import { UnfollowWishListButton } from "./UnfollowWishListButton";
import { FollowWishListButton } from "./FollowWishListButton";

export const WishListItem = ({ wishList, userId }: { wishList: WishList, userId?: string }) => {

    const isFollowedByMe = wishList.isFollowedByMe;
    const isOwner = wishList.user_id === userId;
    const isArchived = !!wishList.archivedAt;

    return (
        <Box>
            <Typography variant="h5">{wishList.name}</Typography>
            <Typography variant="body2">{wishList.description}</Typography>
            <Link href={`/wewish/wish-list/${wishList.id}`}>
                <Button variant="contained" sx={{ borderRadius: 9999 }}>Voir</Button>
            </Link>
            {isOwner && (
                <>
                    {isArchived ? <UnarchiveWishListButton wishListId={wishList.id} /> : <ArchiveWishListButton wishListId={wishList.id} />}
                    <DeleteWishListButton wishListId={wishList.id} />
                    <Link href={`/wewish/wish-list/${wishList.id}/update`}>
                        <Button variant="contained" sx={{ borderRadius: 9999 }}>Modifier</Button>
                    </Link>
                </>
            )}
            {!isOwner && userId && (
                <>
                    {isFollowedByMe ? <UnfollowWishListButton wishListId={wishList.id} userId={userId} /> : <FollowWishListButton wishListId={wishList.id} userId={userId} />}
                </>
            )}
        </Box>
    );
}