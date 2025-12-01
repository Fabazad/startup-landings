"use client"

import { Box, Button, Link } from "@mui/material";
import { Typography } from "@mui/material";
import { Wish } from "src/app/wewish/types/Wish";
import { EmptyContent } from "src/components/empty-content";
import { Iconify } from "src/components/iconify";
import { WishItemSkeleton } from "./WishItemSekeleton";
import { AddWishItem } from "./AddWishItem";
import { WishItem } from "./WishItem";

export const WishGrid = ({ wishes, isLoading, wishListId }: { wishes: Array<Wish>, isLoading: boolean, wishListId?: number }) => {

    if (!isLoading && wishes.length === 0) return (
        <EmptyContent title="Aucune envie" description="Vous n'avez pas mis d'envies dans cette liste"
            action={
                <Box sx={{ mt: 2 }}>
                    <Link href={`/wewish/wish-list/${wishListId}/add-wish`}>
                        <Button variant="contained" sx={{ borderRadius: 9999 }} size="large" color="warning">
                            <Iconify icon="material-symbols:add" width={24} sx={{ mr: 1 }} />
                            <Typography variant="body1">Ajouter une envie</Typography>
                        </Button>
                    </Link>
                </Box>
            }
        />
    )

    return (
        <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
            }}
        >
            {isLoading && <WishItemSkeleton />}
            {wishes.length > 0 && (
                <>
                    {wishListId && <AddWishItem wishListId={wishListId} />}
                    {wishes.map((wish) => (
                        <WishItem key={wish.id} wish={wish} />
                    ))}
                </>
            )}
        </Box>
    )
}