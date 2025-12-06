"use client"

import { useWishes } from "../../hooks/useWishes";
import { Box, Container } from "@mui/material";
import { Typography } from "@mui/material";
import { WishGrid } from "./WishGrid";
import { WishList } from "./WishList";

export const Wishes = ({ wishListId }: { wishListId: number }) => {

    const { wishes, deleteWish, isLoading, setIsFavorite, unbookWish } = useWishes({ wishListId });

    return (
        <Container>
            <Typography variant="h1">Envies</Typography>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
                <WishGrid wishListId={wishListId} wishes={wishes} isLoading={isLoading}
                    onFavoriteClick={(wishId, isFavorite) => setIsFavorite(wishId, isFavorite)}
                    onDelete={(wishId) => deleteWish(wishId)}
                    onUnbook={(wishId) => unbookWish(wishId)}
                />
            </Box>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
                <WishList wishes={wishes} isLoading={isLoading} wishListId={wishListId}
                    onFavoriteClick={(wishId, isFavorite) => setIsFavorite(wishId, isFavorite)}
                    onDelete={(wishId) => deleteWish(wishId)}
                    onUnbook={(wishId) => unbookWish(wishId)}
                />
            </Box>
        </Container >
    )
}