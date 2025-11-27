import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { getAuthUser } from "../queries/user";
import { getUserWishLists } from "../queries/wishList";
import { View403, View500 } from "src/sections/error";

export default async function WishListsPage() {

    const userRes = await getAuthUser();
    if (!userRes.success) return <View403 />;
    const user = userRes.user;

    const res = await getUserWishLists(user.id);
    if (!res.success) return <View500 />;
    const wishLists = res.wishLists;

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
                        <Button variant="contained" sx={{ borderRadius: 9999 }}>Supprimer</Button>
                        <Link href={`/wewish/wish-list/${list.id}/update`}>
                            <Button variant="contained" sx={{ borderRadius: 9999 }}>Modifier</Button>
                        </Link>
                    </Box>
                ))}
            </Box>
        </Box>)
}