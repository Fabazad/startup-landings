import { Button } from '@mui/material';
import { Iconify } from 'src/components/iconify';

export const MyListsButton = () => {
    return (
        <Button
            href="/wewish"
            sx={{ display: 'flex', flexDirection: "column", textDecoration: 'none', color: 'inherit' }}
        >
            <Iconify icon="mdi:folder-outline" width={24} />
            Mes listes
        </Button>
    );
}