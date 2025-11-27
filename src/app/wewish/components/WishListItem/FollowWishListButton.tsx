"use client";

import { LoadingButton } from "@mui/lab";
import { followListQuery } from "../../queries/wishList";
import { toast } from "src/components/snackbar";
import { useRouter } from "next/navigation";

export const FollowWishListButton = ({ wishListId, userId }: { wishListId: number; userId: string }) => {
    const router = useRouter();


    const followListHandler = async () => {
        try {
            await followListQuery(wishListId, userId);
            router.refresh();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <LoadingButton variant="contained" sx={{ borderRadius: 9999 }} onClick={followListHandler}>
            Suivre la liste
        </LoadingButton>
    )
}