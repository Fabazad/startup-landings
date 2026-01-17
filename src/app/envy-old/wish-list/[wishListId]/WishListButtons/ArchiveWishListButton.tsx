"use client";

import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { toast } from "src/components/snackbar";
import { Iconify } from "src/components/iconify";
import { useState } from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { getClientWishListQuery } from "src/app/envy-old/queries/wishList/client";

export const ArchiveWishListButton = ({ wishListId }: { wishListId: number }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const text = "Archiver";
    const icon = "solar:archive-bold-duotone";

    const clientWishListQuery = getClientWishListQuery();

    const archiveListHandler = async () => {
        if (!confirm("Êtes-vous sûr de vouloir archiver cette liste ?")) return;
        try {
            setLoading(true);
            await clientWishListQuery.archiveWishList(wishListId);
            router.refresh();
            toast.success("Liste archivée avec succès");
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
                sx={{
                    borderRadius: 9999,
                    width: '100%',
                    px: 5,
                    display: { xs: 'none', sm: 'flex' },
                    bgcolor: 'background.paper',
                    "&:hover": { bgcolor: 'background.neutral' }
                }}
                onClick={archiveListHandler}
                startIcon={<Iconify icon={icon} />}
                loading={loading}
            >
                {text}
            </LoadingButton>
            <ListItemButton onClick={archiveListHandler} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <ListItemIcon>
                    <Iconify icon={icon} width={24} />
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>

        </>
    )
}