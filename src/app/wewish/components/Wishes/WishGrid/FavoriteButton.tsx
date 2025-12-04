import { Fab } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { Tooltip } from "@mui/material";


const getTooltipText = (isFavorite: boolean, isUserOwner: boolean) => {
    if (isUserOwner) {
        return isFavorite ? "Retirer des favoris" : "Ajouter aux favoris";
    }
    return isFavorite ? "Favori" : "Non favori";
}

export const FavoriteButton = ({ isFavorite, onClick, isUserOwner }: { isFavorite: boolean; onClick: () => void; isUserOwner: boolean }) => {

    return (
        <Tooltip title={getTooltipText(isFavorite, isUserOwner)} placement="top" arrow
            slotProps={{ tooltip: { sx: { fontSize: '1rem', padding: '8px 16px' } } }}>
            <Fab
                color={isFavorite ? "primary" : "default"}
                size="medium"
                className="hided-button"
                sx={{
                    right: 16, top: 16, zIndex: 9, position: 'absolute', cursor: isUserOwner ? "pointer" : "default", opacity: 0,
                    transition: (theme) =>
                        theme.transitions.create('all', {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.shorter,
                        }),
                }}
                onClick={isUserOwner ? onClick : undefined}
            >
                <Iconify icon="solar:heart-bold" width={24} />
            </Fab>
        </Tooltip>
    )
}