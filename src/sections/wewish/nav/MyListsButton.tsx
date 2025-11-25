import { Button } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import Link from 'next/link';

export const MyListsButton = () => {
    return (
        <Link href="/wewish/wish-lists" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button sx={{ display: 'flex', flexDirection: "column" }}>
                <Iconify icon="mdi:folder-outline" width={24} />
                My Lists
            </Button>
        </Link>
    );
}