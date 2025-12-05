import { Fab, Tooltip } from "@mui/material";
import { Iconify } from "src/components/iconify";

export const BookButton = ({ wishId }: { wishId: number }) => {
    return (
        <Tooltip title="Réserver l'envie" placement="top" arrow slotProps={{ tooltip: { sx: { fontSize: '1rem', padding: '8px 16px' } } }}>

            <Fab
                color="secondary"
                size="medium"
                className="hided-button"
                href={`/wewish/wish/${wishId}/book`}
                sx={{
                    right: 16,
                    bottom: 16,
                    zIndex: 9,
                    position: 'absolute',
                    opacity: 0,
                    transition: (theme) =>
                        theme.transitions.create('all', {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.shorter,
                        }),
                }}
            >
                <Iconify icon="solar:gift-broken" width={24} />
            </Fab>
        </Tooltip>
    )
}