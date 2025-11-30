"use client";

import { useMyWishLists } from "src/app/wewish/hooks/useMyWishLists";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { WishListGrid } from "src/app/wewish/components/WishListGrid";

export const MyWishLists = () => {

    const { user } = useAuthContext();

    const { wishLists, isLoading } = useMyWishLists({ archived: false, userId: user?.id });

    return (
        <WishListGrid wishLists={wishLists} isLoading={isLoading} emptyContent={{
            button: { title: "Créer votre première liste d'envies", href: "/wewish/wish-list" },
            title: "Vous n'avez aucune liste d'envies"
        }} />
    )
}