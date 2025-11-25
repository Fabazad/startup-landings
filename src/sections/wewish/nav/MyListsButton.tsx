import { Button } from '@mui/material';
import { Iconify } from 'src/components/iconify';


export const MyListsButton = () => {
    return (
        <Button sx={{ display: 'flex', flexDirection: "column" }}>
            <Iconify icon="mdi:folder-outline" width={24} />
            My Lists
        </Button>
    );
}