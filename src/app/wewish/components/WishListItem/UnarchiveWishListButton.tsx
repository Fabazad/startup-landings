"use client";

import { LoadingButton } from "@mui/lab";
import { unarchiveWishListQuery } from "../../queries/wishList";
import { useRouter } from "next/navigation";
import { toast } from "src/components/snackbar";

export const UnarchiveWishListButton = ({ wishListId }: { wishListId: number }) => {

    const router = useRouter();

    const unarchiveListHandler = async () => {
        if (!confirm("Êtes-vous sûr de vouloir désarchiver cette liste ?")) return;
        try {
            await unarchiveWishListQuery(wishListId);
            router.push('/wewish/wish-lists?tab=my-lists');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <LoadingButton variant="contained" sx={{ borderRadius: 9999 }} onClick={unarchiveListHandler}>
            Désarchiver
        </LoadingButton>
    )
}