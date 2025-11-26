'use client';

import { Box, Button, Typography } from "@mui/material";
import { useMyWishLists } from "src/app/wewish/hooks/useMyWishLists";
import Link from "next/link";

export default function WishListsPage() {

    const { wishLists, deleteOne } = useMyWishLists();

    return (
        <Box>
            <h1>My Wish Lists</h1>
            <Box>
                {wishLists?.map((list) => (
                    <Box key={list.id}>
                        <Typography variant="h5">{list.name}</Typography>
                        <Typography variant="body2">{list.description}</Typography>
                        <Link href={`/wewish/wish-list/${list.id}`}>
                            <Button variant="contained" sx={{ borderRadius: 9999 }}>Voir</Button>
                        </Link>
                        <Button variant="contained" sx={{ borderRadius: 9999 }} onClick={() => deleteOne(list.id)}>Supprimer</Button>
                        <Link href={`/wewish/wish-list/${list.id}/update`}>
                            <Button variant="contained" sx={{ borderRadius: 9999 }}>Modifier</Button>
                        </Link>
                    </Box>
                ))}
            </Box>
        </Box>)
}