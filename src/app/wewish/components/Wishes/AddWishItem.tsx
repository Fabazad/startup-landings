import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { RouterLink } from 'src/routes/components';
import { Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------


export function AddWishItem({ wishListId }: { wishListId: number }) {

    const linkTo = `/wewish/wish-list/${wishListId}/add-wish`;

    return (
        <Link component={RouterLink} href={linkTo} style={{ textDecoration: "none" }}>
            <Card sx={{
                "&:hover": { boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", transition: "all 0.2s ease-in-out", opacity: 1 },
                "&:hover .icon": { width: 120, height: 120, transition: "all 0.2s ease-in-out" },
                "&:hover > .text": { fontWeight: 800 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                minHeight: 300,
                opacity: 0.8,
                transition: "all 0.2s ease-in-out",
            }}>
                <Iconify icon="solar:add-square-bold" width={90} sx={{ color: "warning.main", transition: "all 0.2s ease-in-out" }} className="icon" />
                <Typography variant="subtitle1" noWrap className='text' sx={{ mt: 2, transition: "all 0.2s ease-in-out" }}>Ajouter une envie</Typography>
            </Card>
        </Link >
    );
}
