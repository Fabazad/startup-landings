"use client";

import { LoadingButton } from "@mui/lab";
import { toast } from "src/components/snackbar";
import { useRouter } from "next/navigation";
import { followListQuery } from "src/app/wewish/queries/wishList";
import { Iconify } from "src/components/iconify";
import { useState } from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export const FollowWishListButton = ({ wishListId, userId }: { wishListId: number; userId: string }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const text = "Suivre la liste";
    const icon = "weui:eyes-on-filled";


    const followListHandler = async () => {
        setLoading(true);
        try {
            await followListQuery(wishListId, userId);
            router.refresh();
            toast.success("Vous suivez maintenant cette liste");
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
                onClick={followListHandler}
                startIcon={<Iconify icon={icon} />}
                loading={loading}
            >
                {text}
            </LoadingButton>
            <ListItemButton onClick={followListHandler} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <ListItemIcon>
                    <Iconify icon={icon} width={24} />
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </>
    )
}