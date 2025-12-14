"use client"

import { useWishes } from "../../hooks/useWishes";
import { Box } from "@mui/material";
import { WishGrid } from "./WishGrid";
import { useAuthContext } from "src/auth/hooks";
import { WishList } from "./WishList";

export const Wishes = ({ wishListId, isBookedByUser }: { wishListId?: number; isBookedByUser?: string }) => {

    const { wishes, deleteWish, isLoading, setIsFavorite, unbookWish, wishList } = useWishes({ wishListId, isBookedByUser });
    const { user } = useAuthContext();

    return (
        <Box>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
                <WishGrid wishList={wishList} wishes={wishes} isLoading={isLoading}
                    onFavoriteClick={(wishId, isFavorite) => setIsFavorite(wishId, isFavorite)}
                    onDelete={(wishId) => deleteWish(wishId)}
                    onUnbook={(wishId) => unbookWish(wishId)}
                    showList={!wishList}
                    user={user}
                />
            </Box>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
                <WishList wishes={wishes} isLoading={isLoading} wishList={wishList}
                    onFavoriteClick={(wishId, isFavorite) => setIsFavorite(wishId, isFavorite)}
                    onDelete={(wishId) => deleteWish(wishId)}
                    onUnbook={(wishId) => unbookWish(wishId)}
                    showList={!wishList}
                    user={user}
                />
            </Box>
        </Box >
    )
}