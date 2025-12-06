import { Fab, Tooltip } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { paths } from "src/routes/paths";

export const AddWishButton = ({ wishListId }: { wishListId: number }) => (
    <Tooltip
        title="Ajouter une envie"
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
            color="warning"
            size="medium"
            href={paths.wewish.wishList.addWish(wishListId)}
            sx={{
                right: 16,
                top: 184,
                zIndex: 99,
                opacity: 0,
                position: 'absolute',
                display: { xs: 'none', md: 'inline-flex' },
                transition: (theme) =>
                    theme.transitions.create('all', {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.shorter,
                    }),
            }}
        >
            <Iconify icon="material-symbols:add" width={24} />
        </Fab>
    </Tooltip>
)