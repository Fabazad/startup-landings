"use client"

import { LoadingButton } from "@mui/lab";
import { useWishes } from "../../hooks/useWishes";
import { Box, Button, Divider } from "@mui/material";
import { Typography } from "@mui/material";
import Link from "next/link";

export const Wishes = ({ wishListId }: { wishListId?: number }) => {

    const { wishes, deleteWish, isDeletingWish } = useWishes({ wishListId });

    return (
        <Box>
            <Typography variant="h3">Wishes</Typography>
            {wishes.length > 0 && (
                <Box>
                    <Link href={`/wewish/wish-list/${wishListId}/add-wish`}>
                        <Button variant="contained" sx={{ borderRadius: 9999 }}>Ajouter une envie</Button>
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
                    <Typography variant="body2">Aucune envie</Typography>
                    <Link href={`/wewish/wish-list/${wishListId}/add-wish`}>
                        <Button variant="contained" sx={{ borderRadius: 9999 }}>Ajouter une envie</Button>
                    </Link>
                </Box>
            )}
        </Box>
    )
}