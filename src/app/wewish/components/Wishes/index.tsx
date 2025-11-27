"use client"

import { LoadingButton } from "@mui/lab";
import { useWishes } from "../../hooks/useWishes";
import { Box, Button, Divider } from "@mui/material";
import { Typography } from "@mui/material";
import Link from "next/link";
import { SplashScreen } from "src/components/loading-screen";

export const Wishes = ({ wishListId }: { wishListId?: number }) => {

    const { wishes, isLoading, deleteWish, isDeletingWish } = useWishes({ wishListId });

    if (isLoading) return <SplashScreen />;

    return (
        <Box>
            <Typography variant="h3">Wishes</Typography>
            {wishes.length > 0 && (
                <Box>
                    <Link href={`/wewish/wish-list/${wishListId}/add-wish`}>
                        <Button variant="contained" sx={{ borderRadius: 9999 }}>Ajouter un souhait</Button>
                    </Link>
                    {wishes.map((wish) => (
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
                            <LoadingButton variant="contained" sx={{ borderRadius: 9999 }} onClick={() => deleteWish(wish.id)} loading={isDeletingWish === wish.id}>
                                Supprimer
                            </LoadingButton>
                        </Box>
                    ))}
                </Box>
            )}
            {wishes.length === 0 && (
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