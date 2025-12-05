import { Fab, Tooltip } from "@mui/material"
import { Iconify } from "src/components/iconify"

export const UpdateButton = ({ wishId }: { wishId: number }) => {
    return (
        <Tooltip title="Modifier" placement="top" arrow
            slotProps={{ tooltip: { sx: { fontSize: '1rem', padding: '8px 16px' } } }}>
            <Fab
                color="default"
                size="medium"
                className="hided-button"
                href={`/wewish/wish/${wishId}/update`}
                sx={{
                    right: 16, bottom: 16, zIndex: 10,
                    position: 'absolute',
                    opacity: 0,
                    transition: (theme) =>
                        theme.transitions.create('all', {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.shorter,
                        }),
                }}
            >
                <Iconify icon="lucide:edit" width={24} />
            </Fab>
        </Tooltip>
    )
}