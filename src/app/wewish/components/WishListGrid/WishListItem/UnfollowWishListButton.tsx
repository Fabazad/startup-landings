"use client";

import { LoadingButton } from "@mui/lab";
import { toast } from "src/components/snackbar";
import { useRouter } from "next/navigation";
import { unfollowListQuery } from "src/app/wewish/queries/wishList";

export const UnfollowWishListButton = ({ wishListId, userId }: { wishListId: number; userId: string }) => {
    const router = useRouter();

    const unfollowListHandler = async () => {
        try {
            await unfollowListQuery(wishListId, userId);
            // Rafraîchit les données du serveur sans recharger la page
            router.refresh();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <LoadingButton variant="contained" sx={{ borderRadius: 9999 }} onClick={unfollowListHandler}>
            Ne plus suivre la liste
        </LoadingButton>
    )
}