import { Button } from '@mui/material';
import { Iconify } from 'src/components/iconify';

export const MyListsButton = () => {
    return (
        <Button
            href="/wewish/wish-lists"
            sx={{ display: 'flex', flexDirection: "column", textDecoration: 'none', color: 'inherit' }}
        >
            <Iconify icon="mdi:folder-outline" width={24} />
            My Lists
        </Button>
    );
}