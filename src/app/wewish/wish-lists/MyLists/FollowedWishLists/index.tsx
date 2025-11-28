"use client";

import { useFollowedWishLists } from "src/app/wewish/hooks/useFollowedWishLists";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { WishListGrid } from "src/app/wewish/components/WishListGrid";

export const FollowedWishLists = () => {

    const { user } = useAuthContext();

    const { wishLists, isLoading } = useFollowedWishLists(user?.id);

    return <WishListGrid wishLists={wishLists} isLoading={isLoading} emptyContent={{
        title: "Vous ne suivez aucune liste d'envies"
    }} />
}