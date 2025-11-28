"use client";

import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { deleteWishListQuery } from "src/app/wewish/queries/wishList";
import { toast } from "src/components/snackbar";

export const DeleteWishListButton = ({ wishListId }: { wishListId: number }) => {

    const router = useRouter();

    const deleteListHandler = async () => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette liste ?")) return;
        try {
            await deleteWishListQuery(wishListId);
            router.push('/wewish/wish-lists');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <LoadingButton variant="contained" sx={{ borderRadius: 9999 }} onClick={deleteListHandler}>
            Supprimer
        </LoadingButton>
    )
}