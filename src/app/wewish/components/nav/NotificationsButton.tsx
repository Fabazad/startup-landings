import { Button } from '@mui/material';
import { Iconify } from 'src/components/iconify';


export const NotificationsButton = () => {
    return (
        <Button sx={{ display: 'flex', flexDirection: "column" }}>
            <Iconify icon="mdi:bell-outline" width={24} />
            Notifications
        </Button>
    );
}