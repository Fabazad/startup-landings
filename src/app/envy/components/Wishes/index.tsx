"use client"

import { useWishes } from "../../hooks/useWishes";
import { Box } from "@mui/material";
import { WishGrid } from "./WishGrid";
import { useAuthContext } from "src/auth/hooks";
import { WishList } from "./WishList";

export const Wishes = ({ wishListId, isBookedByUser, isArchived }: { wishListId?: number; isBookedByUser?: string; isArchived?: boolean }) => {

    const { wishes, deleteWish, isLoading, setIsFavorite, unbookWish, wishList, voteWish, removeVoteWish } = useWishes({ wishListId, isBookedByUser, isArchived });
    const { user } = useAuthContext();

    const isUserOwner = user && wishList && user.id === wishList.user.id;
    const canAddWish = !!(user && wishList && (wishList.isCollaborative || isUserOwner));
    const canBook = !!(user && wishList && (wishList.isCollaborative || !isUserOwner));
    const canVote = !!(user && wishList && wishList.isCollaborative);

    console.log({ canAddWish})

    return (
        <Box>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
                <WishGrid wishList={wishList} wishes={wishes} isLoading={isLoading}
                    onFavoriteClick={(wishId, isFavorite) => setIsFavorite(wishId, isFavorite)}
                    onDelete={(wishId) => deleteWish(wishId)}
                    showList={!wishList}
                    canAddWish={canAddWish}
                    canBook={canBook}
                    onVote={(wishId) => voteWish(wishId)}
                    onRemoveVote={(wishId) => removeVoteWish(wishId)}
                    canVote={canVote}
                />
            </Box>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
                <WishList wishes={wishes} isLoading={isLoading} wishList={wishList}
                    onFavoriteClick={(wishId, isFavorite) => setIsFavorite(wishId, isFavorite)}
                    onDelete={(wishId) => deleteWish(wishId)}
                    onUnbook={(wishId) => unbookWish(wishId)}
                    showList={!wishList}
                    canAddWish={canAddWish}
                    canBook={canBook}
                    voteWish={(wishId) => voteWish(wishId)}
                    removeVoteWish={(wishId) => removeVoteWish(wishId)}
                    canVote={canVote}
                />
            </Box>
        </Box >
    )
}