import { Box, Fab, Stack, Tooltip, Typography } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { Wish } from "src/app/envy/types/Wish";

export const BookButton = ({ wish, isBookedBy, onUnbook }: { wish: Wish; isBookedBy: string | null, onUnbook: () => void }) => {

    const { user } = useAuthContext();

    const isBookedByAuthUser = !!(user && wish.bookedByUser?.id === user.id);

    const handleBook = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isBookedByAuthUser) {
            e.preventDefault();
            onUnbook();
        }
    }

    return (
        <Box>
            {isBookedBy && (
                <Tooltip title={`Réservée par ${isBookedBy}`} placement="top" arrow slotProps={{ tooltip: { sx: { fontSize: '1rem', padding: '8px 16px' } } }}>
                    <Stack sx={{ position: 'absolute', left: 20, top: 20, zIndex: 9, m: 0, flexDirection: 'row', gap: 2, bgcolor: "background.paper", borderRadius: 1, p: 1, pr: 2 }}>
                        <Iconify
                            icon="material-symbols:lock-open-rounded"
                            width={24}
                            color="secondary.main"
                        />
                        <Typography variant="body2" color="secondary.main" sx={{ cursor: "default" }}>
                            {isBookedBy}
                        </Typography>

                    </Stack>
                </Tooltip>
            )}
            {(!isBookedBy || isBookedByAuthUser) && (
                <Tooltip title={isBookedByAuthUser ? "Annuler la réservation" : "Réserver l'envie"}
                    placement="top" arrow
                    slotProps={{ tooltip: { sx: { fontSize: '1rem', padding: '8px 16px' } } }}
                >
                    <Fab
                        color={isBookedByAuthUser ? "error" : "secondary"}
                        size="medium"
                        className="hided-button"
                        href={`/envy/wish/${wish.id}/book`}
                        disabled={!!isBookedBy && !isBookedByAuthUser}
                        onClick={handleBook}
                        sx={{
                            left: 16,
                            top: 16,
                            zIndex: 10,
                            position: 'absolute',
                            opacity: 0,
                            transition: (theme) =>
                                theme.transitions.create('all', {
                                    easing: theme.transitions.easing.easeInOut,
                                    duration: theme.transitions.duration.shorter,
                                }),
                        }}
                    >
                        <Iconify icon="material-symbols:lock-open-rounded" width={24} />
                    </Fab>
                </Tooltip>
            )}
        </Box>
    )
}