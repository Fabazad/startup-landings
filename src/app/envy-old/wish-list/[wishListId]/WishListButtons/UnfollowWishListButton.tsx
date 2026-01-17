"use client";

import { LoadingButton } from "@mui/lab";
import { toast } from "src/components/snackbar";
import { useRouter } from "next/navigation";
import { Iconify } from "src/components/iconify";
import { useState } from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { getClientWishListQuery } from "src/app/envy-old/queries/wishList/client";

export const UnfollowWishListButton = ({ wishListId, userId }: { wishListId: number; userId: string }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const text = "Ne plus suivre la liste";
    const icon = "weui:eyes-off-filled";
    const clientWishListQuery = getClientWishListQuery();

    const unfollowListHandler = async () => {
        try {
            setLoading(true);
            if (!confirm("Êtes-vous sûr de vouloir ne plus suivre cette liste ?")) return;
            await clientWishListQuery.unfollowList(wishListId, userId);
            router.refresh();
            toast.success("Vous ne suivez plus cette liste");
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
                    "&:hover": { bgcolor: 'background.neutral' },
                    whiteSpace: 'nowrap'
                }}
                onClick={unfollowListHandler}
                startIcon={<Iconify icon={icon} />}
                loading={loading}
            >
                {text}
            </LoadingButton>
            <ListItemButton onClick={unfollowListHandler} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <ListItemIcon>
                    <Iconify icon={icon} width={24} />
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </>
    )
}