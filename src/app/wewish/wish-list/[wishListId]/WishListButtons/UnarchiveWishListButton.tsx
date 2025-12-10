"use client";

import { LoadingButton } from "@mui/lab";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter } from "next/navigation";
import { unarchiveWishListQuery } from "src/app/wewish/queries/wishList";
import { Iconify } from "src/components/iconify";
import { toast } from "src/components/snackbar";
import { useState } from "react";

export const UnarchiveWishListButton = ({ wishListId }: { wishListId: number }) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const text = "Désarchiver";
    const icon = "lucide:archive";

    const unarchiveListHandler = async () => {
        if (!confirm("Êtes-vous sûr de vouloir désarchiver cette liste ?")) return;
        try {
            setLoading(true);
            await unarchiveWishListQuery(wishListId);
            router.refresh();
            toast.success("Liste désarchivée avec succès");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <LoadingButton
                variant="contained"
                sx={{ borderRadius: 9999, width: '100%', px: 5, display: { xs: 'none', sm: 'flex' } }}
                onClick={unarchiveListHandler}
                startIcon={<Iconify icon={icon} />}
                loading={loading}
            >
                {text}
            </LoadingButton>
            <ListItemButton onClick={unarchiveListHandler} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <ListItemIcon>
                    <Iconify icon={icon} width={24} />
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </>
    )
}
