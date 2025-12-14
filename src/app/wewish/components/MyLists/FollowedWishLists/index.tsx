"use client";

import { useFollowedWishLists } from "src/app/wewish/hooks/useFollowedWishLists";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { WishLists } from "src/app/wewish/components/WishLists";

export const FollowedWishLists = () => {

    const { user } = useAuthContext();

    const { wishLists, isLoading } = useFollowedWishLists(user?.id);

    return <WishLists wishLists={wishLists} isLoading={isLoading} emptyContent={{
        title: "Vous ne suivez aucune liste d'envies"
    }} />
}