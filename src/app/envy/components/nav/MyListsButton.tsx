import { Button } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { paths } from 'src/routes/paths';

export const MyListsButton = () => {
    return (
        <Button
            href={paths.envy.root}
            sx={{ display: 'flex', flexDirection: "column", textDecoration: 'none', color: 'inherit' }}
        >
            <Iconify icon="line-md:clipboard-list" width={24} />
            Mes listes
        </Button>
    );
}