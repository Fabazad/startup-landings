import { Badge, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { m } from "framer-motion";
import { varHover } from "src/components/animate";

export const NotificationsButton = ({ totalUnRead, onClick }: { totalUnRead: number; onClick: () => void }) => {
    const text = "Notifications";

    return (
        <>
            <Stack sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Tooltip title={text} placement="bottom"
                    slotProps={{ tooltip: { sx: { fontSize: '1rem', padding: '8px 16px' } } }} arrow>
                    <IconButton
                        component={m.button}
                        whileTap="tap"
                        whileHover="hover"
                        variants={varHover(1.05)}
                        onClick={onClick}
                        sx={{ pb: { xs: 0, sm: 1 } }}
                    >
                        <Badge badgeContent={totalUnRead} color="error">
                            <Iconify icon="solar:bell-bing-bold-duotone" width={24} />
                        </Badge>
                    </IconButton>
                </Tooltip >
            </Stack>
            <Button
                sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', alignItems: 'center' }}
                onClick={onClick}>
                <Badge badgeContent={totalUnRead} color="error">
                    <Iconify color="action.active" icon="solar:bell-bing-bold-duotone" width={24} />
                </Badge>
                <Typography variant="subtitle2">{text}</Typography>
            </Button>
        </>
    );
}