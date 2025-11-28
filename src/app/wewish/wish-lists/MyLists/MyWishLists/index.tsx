"use client";

import { Button } from "@mui/material";
import { useMyWishLists } from "src/app/wewish/hooks/useMyWishLists";
import { AnimateLogo } from "src/components/animate";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { EmptyContent } from "src/components/empty-content";
import Link from "next/link";
import { Iconify } from "src/components/iconify";
import { WishListGrid } from "src/app/wewish/components/WishListGrid";

export const MyWishLists = () => {

    const { user } = useAuthContext();

    const { wishLists, isLoading } = useMyWishLists({ archived: false, userId: user?.id });

    if (isLoading) return <AnimateLogo />;

    if (!wishLists?.length) return <EmptyContent
        title="Vous avez aucune liste d'envies"
        action={
            <Link href="/wewish/wish-list" style={{ marginTop: "1rem" }}>
                <Button variant="contained" sx={{ borderRadius: 999, px: 2 }}>
                    <Iconify icon="material-symbols:add" sx={{ mr: 1 }} />
                    Créer une liste d'envies
                </Button>
            </Link>
        } filled sx={{ py: 10 }} />

    return (
        <WishListGrid wishLists={wishLists} />)
}