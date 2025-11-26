'use client';

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useWish } from "src/app/wewish/hooks/useWish";
import { SplashScreen } from "src/components/loading-screen";

export default function WishPage({ params }: { params: { wishId: string } }) {

    const { wish, isLoading } = useWish({ wishId: params.wishId });
    const router = useRouter();

    if (isLoading) return <SplashScreen />;
    if (wish === undefined) return router.push('/not-found');

    return <Box>Wish {params.wishId}</Box>;
}