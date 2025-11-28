"use client";

import { LoadingButton } from "@mui/lab";
import { toast } from "src/components/snackbar";
import { useRouter } from "next/navigation";
import { followListQuery } from "src/app/wewish/queries/wishList";

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