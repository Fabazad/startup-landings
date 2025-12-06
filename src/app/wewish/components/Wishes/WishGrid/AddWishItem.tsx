import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { RouterLink } from 'src/routes/components';
import { Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------


export function AddWishItem({ wishListId }: { wishListId: number }) {

    const linkTo = paths.wewish.wishList.addWish(wishListId);

    return (
        <Link component={RouterLink} href={linkTo} style={{ textDecoration: "none" }}>
            <Card sx={{
                "&:hover": { boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", transition: "all 0.2s ease-in-out", opacity: 1 },
                "&:hover .icon": { width: { sm: 106, xs: 70 }, height: { sm: 106, xs: 70 }, transition: "all 0.2s ease-in-out" },
                "&:hover > .text": { fontWeight: 800 },
                display: "flex",
                flexDirection: { sm: "column", xs: "row" },
                alignItems: "center",
                justifyContent: { sm: "center", xs: "flex-start" },
                height: "100%",
                minHeight: { sm: 300, xs: 100 },
                maxHeight: { sm: "inherit", xs: 100 },
                opacity: 0.8,
                transition: "all 0.2s ease-in-out",
                p: 2,
                gap: 2,
            }}>
                <Iconify icon="line-md:plus-circle-filled" className="icon" sx={{
                    color: "warning.main",
                    transition: "all 0.2s ease-in-out",
                    width: { sm: 90, xs: 60 },
                    height: { sm: 90, xs: 60 }
                }}
                />
                <Typography variant="h6" noWrap className='text' fontWeight={800} sx={{ transition: "all 0.2s ease-in-out" }}>Ajouter une envie</Typography>
            </Card>
        </Link >
    );
}
