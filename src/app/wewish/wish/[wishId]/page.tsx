import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { NotFoundView, View500 } from "src/sections/error";
import { getWishQuery } from "../../queries/wish";

export default async function WishPage({ params }: { params: { wishId: string } }) {

    const wishResult = await getWishQuery(params.wishId);

    if (!wishResult.success) return <View500 />;
    const wish = wishResult.wish;
    if (!wish) return <NotFoundView />;


    return <Box>
        <Typography variant="h3">{wish.name}</Typography>
        <Typography variant="body2">{wish.description}</Typography>
        <Typography variant="body2">Prix indicatif : {wish.price}</Typography>
        <Typography variant="body2">Envie coup de cœur : {wish.isFavorite ? 'Oui' : 'Non'}</Typography>
        <Typography variant="body2">Je préfère l'occasion si possible : {wish.isSecondHand ? 'Oui' : 'Non'}</Typography>
        <Typography variant="body2">J'accepte de recevoir un cadeau équivalent : {wish.acceptEquivalent ? 'Oui' : 'Non'}</Typography>
        <Typography variant="body2">Lien du produit : {wish.productUrl}</Typography>
        <Link href={`/wewish/wish/${wish.id}/book`}>
            <Button variant="contained" sx={{ borderRadius: 9999 }}>Réserver ce souhait</Button>
        </Link>
    </Box>;
}