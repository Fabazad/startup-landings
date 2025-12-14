"use client";

import { LoadingButton } from "@mui/lab"
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Iconify } from "src/components/iconify"
import { toast } from "src/components/snackbar";
import { paths } from "src/routes/paths";

export const ShareWishListButton = ({ wishListId }: { wishListId: number }) => {
    const text = "Partager";
    const icon = "lucide:share-2";


    const handleNativeShare = async () => {
        const shareLink = `${window.location.origin}${paths.envy.wishList.detail(wishListId)}?sharedLink=true`;

        if (navigator.share) {
            try {
                await navigator.share({
                    url: shareLink,
                    title: 'Ma liste d\'envies',
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareLink);
                toast.success('Lien copié !');
            } catch (error) {
                toast.error('Erreur lors de la copie du lien');
            }
        }
    };

    return (
        <>
            <LoadingButton
                variant="contained"
                sx={{ borderRadius: 9999, width: '100%', px: 5, display: { xs: 'none', sm: 'flex' } }}
                startIcon={<Iconify icon={icon} />}
                onClick={handleNativeShare}
            >
                {text}
            </LoadingButton>
            <ListItemButton onClick={handleNativeShare} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <ListItemIcon>
                    <Iconify icon={icon} width={24} />
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </>
    )
}