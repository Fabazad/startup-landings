"use client";

import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { archiveWishListQuery } from "src/app/wewish/queries/wishList";
import { toast } from "src/components/snackbar";

export const ArchiveWishListButton = ({ wishListId }: { wishListId: number }) => {

    const router = useRouter();

    const archiveListHandler = async () => {
        if (!confirm("Êtes-vous sûr de vouloir archiver cette liste ?")) return;
        try {
            await archiveWishListQuery(wishListId);
            router.push('/wewish?tab=archived-lists');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <LoadingButton variant="contained" sx={{ borderRadius: 9999 }} onClick={archiveListHandler}>
            Archiver
        </LoadingButton>
    )
}