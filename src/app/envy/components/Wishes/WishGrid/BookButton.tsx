import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { Iconify } from "src/components/iconify";

export const BookButton = ({ isBookedBy }: { isBookedBy: string | null }) => {

    return (
        <Box>
            {isBookedBy && (
                <Tooltip title={`Réservée par ${isBookedBy}`} placement="top" arrow slotProps={{ tooltip: { sx: { fontSize: '1rem', padding: '8px 16px' } } }}>
                    <Stack sx={{ position: 'absolute', left: 20, top: 20, zIndex: 9, m: 0, flexDirection: 'row', gap: 1, bgcolor: "background.paper", borderRadius: 999, p: 1, px: 2 }}>
                        <Iconify
                            icon="solar:lock-keyhole-minimalistic-bold-duotone"
                            width={24}
                            color="secondary.main"
                        />
                        <Typography variant="body2" color="secondary.main" sx={{ cursor: "default" }}>
                            {isBookedBy}
                        </Typography>

                    </Stack>
                </Tooltip>
            )}
        </Box>
    )
}