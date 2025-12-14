"use client";

import { useMyWishLists } from "src/app/wewish/hooks/useMyWishLists";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { WishLists } from "../../WishLists";
import { paths } from "src/routes/paths";

export const MyWishLists = () => {

    const { user } = useAuthContext();

    const { wishLists, isLoading } = useMyWishLists({ archived: false, userId: user?.id });

    return <WishLists wishLists={wishLists} isLoading={isLoading} emptyContent={{
        title: "Vous n'avez aucune liste d'envies",
        button: { title: "Créer votre première liste d'envies", href: paths.wewish.wishList.create }
    }} />
}