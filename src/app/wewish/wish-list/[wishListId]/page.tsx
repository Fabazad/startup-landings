"use client";

import { useRouter } from "next/navigation";
import { useWishList } from "src/app/wewish/hooks/useWishList";
import { Box, Button, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { SplashScreen } from "src/components/loading-screen";
import { toast } from "sonner";
import { LoadingButton } from "@mui/lab";
import { Wishes } from "../../components/Wishes";

export default function WishListPage({ params }: { params: { wishListId: string } }) {
    const { wishListId } = params;
    const { wishList, isLoading, deleteList, isDeleting } = useWishList({ wishListId });
    const router = useRouter();

    if (isLoading) {
        return <SplashScreen />;
    }

    if (wishList === undefined) {
        router.push('/not-found');
        return;
    }

    const deleteListHandler = async () => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette liste ?")) return;
        try {
            await deleteList();
            router.push('/wewish/wish-lists');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Box>
            <Typography variant="h3">{wishList.name}</Typography>
            <Typography variant="body2">{wishList.description}</Typography>
            <Link href={`/wewish/wish-list/${wishListId}/update`}>
                <Button variant="contained" sx={{ borderRadius: 9999 }}>Modifier</Button>
            </Link>
            <LoadingButton variant="contained" sx={{ borderRadius: 9999 }} onClick={deleteListHandler} loading={isDeleting}>
                Supprimer
            </LoadingButton>
            <Divider />
            <Wishes wishListId={wishListId} />
        </Box>
    )
}