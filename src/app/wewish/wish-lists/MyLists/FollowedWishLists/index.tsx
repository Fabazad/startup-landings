"use client";

import { Box } from "@mui/material";
import { WishListItem } from "src/app/wewish/components/WishListItem";
import { AnimateLogo } from "src/components/animate";
import { useFollowedWishLists } from "src/app/wewish/hooks/useFollowedWishLists";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { View403 } from "src/sections/error";

export const FollowedWishLists = () => {

    const { user } = useAuthContext();

    if (!user) return <View403 />

    const { wishLists, isLoading } = useFollowedWishLists(user.id);

    if (isLoading) return <AnimateLogo />;

    return (
        <Box>
            {wishLists?.map((list) => (
                <Box key={list.id}>
                    <WishListItem wishList={list} userId={user.id} />
                </Box>
            ))}
        </Box>)
}