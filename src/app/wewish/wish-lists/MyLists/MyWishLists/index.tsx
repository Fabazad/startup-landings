"use client";

import { Box } from "@mui/material";
import { useMyWishLists } from "src/app/wewish/hooks/useMyWishLists";
import { WishListItem } from "src/app/wewish/components/WishListItem";
import { AnimateLogo } from "src/components/animate";

export const MyWishLists = () => {

    const { wishLists, isLoading } = useMyWishLists({ archived: false });

    if (isLoading) return <AnimateLogo />;

    return (
        <Box>
            {wishLists?.map((list) => (
                <Box key={list.id}>
                    <WishListItem wishList={list} />
                </Box>
            ))}
        </Box>)
}