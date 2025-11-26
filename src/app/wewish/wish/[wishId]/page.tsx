'use client';

import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWish } from "src/app/wewish/hooks/useWish";
import { SplashScreen } from "src/components/loading-screen";

export default function WishPage({ params }: { params: { wishId: string } }) {

    const { wish, isLoading } = useWish({ wishId: params.wishId });
    const router = useRouter();

    if (isLoading) return <SplashScreen />;
    if (wish === undefined) return router.push('/not-found');

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