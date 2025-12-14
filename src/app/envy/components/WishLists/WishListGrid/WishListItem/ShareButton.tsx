import { Fab, Tooltip } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { paths } from "src/routes/paths";

export const ShareButton = ({ wishListId }: { wishListId: number }) => {
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
                href={paths.envy.wishList.share(wishListId)}
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
                <Iconify icon="solar:share-bold" width={24} />
            </Fab>
        </Tooltip>
    )
}