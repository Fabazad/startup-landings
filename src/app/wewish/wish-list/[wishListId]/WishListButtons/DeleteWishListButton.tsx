"use client";

import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { deleteWishListQuery } from "src/app/wewish/queries/wishList";
import { toast } from "src/components/snackbar";
import { paths } from "src/routes/paths";
import { Iconify } from "src/components/iconify"; // Import Iconify
import { useState } from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export const DeleteWishListButton = ({ wishListId }: { wishListId: number }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const text = "Supprimer";
    const icon = "solar:trash-bin-trash-bold";

    const deleteListHandler = async () => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette liste ?")) return;
        try {
            setLoading(true);
            await deleteWishListQuery(wishListId);
            router.push(paths.wewish.root);
            toast.success("Liste supprimée avec succès");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <LoadingButton
                variant="outlined"
                sx={{ borderRadius: 9999, width: '100%', px: 5, display: { xs: 'none', sm: 'flex' } }}
                onClick={deleteListHandler}
                startIcon={<Iconify icon={icon} />}
                color="error"
                loading={loading}
            >
                {text}
            </LoadingButton>
            <ListItemButton onClick={deleteListHandler} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <ListItemIcon>
                    <Iconify icon={icon} width={24} color="error.main" />
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </>
    )
}