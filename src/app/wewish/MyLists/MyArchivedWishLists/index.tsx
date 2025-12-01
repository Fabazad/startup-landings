"use client";

import { useMyWishLists } from "src/app/wewish/hooks/useMyWishLists";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { WishLists } from "../../components/WishLists";

export const MyArchivedWishLists = () => {

    const { user } = useAuthContext();

    const { wishLists, isLoading } = useMyWishLists({ archived: true, userId: user?.id });

    return (
        <WishLists wishLists={wishLists} isLoading={isLoading} emptyContent={{
            title: "Vous avez aucune liste d'envies archivée"
        }} />
    )
}