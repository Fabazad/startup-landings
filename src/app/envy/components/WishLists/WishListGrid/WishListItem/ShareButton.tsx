import { Fab, Tooltip } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { toast } from "src/components/snackbar";
import { paths } from "src/routes/paths";

export const ShareButton = ({ wishListId }: { wishListId: number }) => {

    const handleNativeShare = async () => {
        const shareLink = `${window.location.origin}${paths.envy.wishList.detail(wishListId)}?sharedLink=true`;

        if (navigator.share) {
            try {
                await navigator.share({
                    url: shareLink,
                    title: 'Ma liste de d\'envies',
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
        <Tooltip

            title="Partager"
            arrow
            placement='top'
            slotProps={{
                tooltip: {
                    sx: {
                        fontSize: '1rem',
                        padding: '8px 16px',
                    }
                }
            }}
        >
            <Fab
                color="default"
                size="medium"
                onClick={handleNativeShare}
                sx={{
                    display: { xs: 'none', md: 'inline-flex' },
                    right: 16,
                    top: 16,
                    zIndex: 99,
                    opacity: 0,
                    position: 'absolute',
                    transition: (theme) =>
                        theme.transitions.create('all', {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.shorter,
                        }),
                }}
            >
                <Iconify icon="solar:share-line-duotone" width={24} />
            </Fab>
        </Tooltip>
    )
}