import { Box, Fab } from "@mui/material";
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

        <Box>
            {!isUserOwner && (
                <Tooltip title={getTooltipText(isFavorite, isUserOwner)} placement="top" arrow
                    slotProps={{ tooltip: { sx: { fontSize: '1rem', padding: '8px 16px' } } }}>
                    <Iconify
                        icon={isFavorite ? "solar:heart-bold" : "solar:heart-outline"}
                        width={24}
                        color="primary.main"
                        sx={{ position: 'absolute', right: 28, top: 28, zIndex: 19, }}
                    />
                </Tooltip>
            )}
            {isUserOwner && (
                <>
                    <Iconify
                        icon={isFavorite ? "solar:heart-bold" : "solar:heart-outline"}
                        width={24}
                        color="primary.main"
                        sx={{ position: 'absolute', right: 28, top: 28, zIndex: 19, }}
                    />
                    <Tooltip title={getTooltipText(isFavorite, isUserOwner)} placement="top" arrow
                        slotProps={{ tooltip: { sx: { fontSize: '1rem', padding: '8px 16px' } } }}>
                        <Fab
                            color={isFavorite ? "primary" : "default"}
                            size="medium"
                            className="hided-button"
                            sx={{
                                right: 16, top: 16, zIndex: 19,
                                position: 'absolute',
                                opacity: 0,
                                transition: (theme) =>
                                    theme.transitions.create('all', {
                                        easing: theme.transitions.easing.easeInOut,
                                        duration: theme.transitions.duration.shorter,
                                    }),
                            }}
                            onClick={isUserOwner ? onClick : undefined}
                        >
                            <Iconify icon={isFavorite ? "solar:heart-bold" : "solar:heart-outline"} width={24} />
                        </Fab>
                    </Tooltip>
                </>
            )}
        </Box>
    )
}