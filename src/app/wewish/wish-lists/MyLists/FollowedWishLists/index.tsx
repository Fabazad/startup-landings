"use client";

import { Box } from "@mui/material";
import { AnimateLogo } from "src/components/animate";
import { useFollowedWishLists } from "src/app/wewish/hooks/useFollowedWishLists";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { WishListItem } from "src/app/wewish/components/WishListGrid/WishListItem";

export const FollowedWishLists = () => {

    const { user } = useAuthContext();

    const { wishLists, isLoading } = useFollowedWishLists(user?.id);

    if (isLoading) return <AnimateLogo />;

    return (
        <Box gap={3}
            display="grid"
            gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
            }}>
            {wishLists?.map((list) => (
                <Box key={list.id}>
                    <WishListItem wishList={list} />
                </Box>
            ))}
        </Box>)
}