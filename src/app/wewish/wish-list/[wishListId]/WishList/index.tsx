"use client";

import { useRouter } from "next/navigation";
import { useWishList } from "src/app/wewish/hooks/useWishList";
import { Box, Button, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { SplashScreen } from "src/components/loading-screen";

export const WishList = ({ wishListId }: { wishListId: string }) => {

    const { wishList, isLoading } = useWishList({ wishListId });
    const router = useRouter();

    if (isLoading) {
        return <SplashScreen />;
    }

    if (wishList === undefined) {
        router.push('/not-found');
        return;
    }

    return (
        <Box>
            <Typography variant="h3">{wishList.name}</Typography>
            <Typography variant="body2">{wishList.description}</Typography>
            <Divider />
            {wishList.wishes.length > 0 && (
                <Box>
                    <Link href={`/wewish/wish-list/${wishListId}/add-wish`}>
                        <Button variant="contained" sx={{ borderRadius: 9999 }}>Ajouter un souhait</Button>
                    </Link>
                    {wishList.wishes.map((wish) => (
                        <Box key={`wish-${wish.id}`}>
                            <Typography variant="h4">{wish.name}</Typography>
                            <Typography variant="body2">{wish.description}</Typography>
                            <Typography variant="body2">{wish.price}</Typography>
                            <Link href={`/wewish/wish/${wish.id}`}>
                                <Button variant="contained" sx={{ borderRadius: 9999 }}>Voir</Button>
                            </Link>
                            <Link href={`/wewish/wish/${wish.id}/book`}>
                                <Button variant="contained" sx={{ borderRadius: 9999 }}>Réserver</Button>
                            </Link>
                        </Box>
                    ))}
                </Box>
            )}
            {wishList.wishes.length === 0 && (
                <Box>
                    <Divider />
                    <Typography variant="body2">Aucun souhait</Typography>
                    <Link href={`/wewish/wish-list/${wishListId}/add-wish`}>
                        <Button variant="contained" sx={{ borderRadius: 9999 }}>Ajouter un souhait</Button>
                    </Link>
                </Box>
            )}
        </Box>
    )
}