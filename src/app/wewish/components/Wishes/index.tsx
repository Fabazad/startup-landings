"use client"

import { LoadingButton } from "@mui/lab";
import { useWishes } from "../../hooks/useWishes";
import { Box, Button, Container, Divider } from "@mui/material";
import { Typography } from "@mui/material";
import Link from "next/link";
import { WishItem } from "./WishItem";
import { WishItemSkeleton } from "./WishItemSekeleton";
import { EmptyContent } from "src/components/empty-content";
import { Iconify } from "src/components/iconify";
import { AddWishItem } from "./AddWishItem";

export const Wishes = ({ wishListId }: { wishListId?: number }) => {

    const { wishes, deleteWish, isDeletingWish, isLoading } = useWishes({ wishListId });



    return (
        <Container>
            <Typography variant="h1">Wishes</Typography>
            {!isLoading && wishes.length === 0 && (
                <EmptyContent title="Aucune envie" description="Vous n'avez pas mis d'envies dans cette liste"
                    action={
                        <Box sx={{ mt: 2 }}>
                            <Link href={`/wewish/wish-list/${wishListId}/add-wish`}>
                                <Button variant="contained" sx={{ borderRadius: 9999 }} size="large">
                                    <Iconify icon="material-symbols:add" width={24} sx={{ mr: 1 }} />
                                    <Typography variant="body1">Ajouter une envie</Typography>
                                </Button>
                            </Link>
                        </Box>
                    }
                />
            )}

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
        </Container >
    )
}