import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { RouterLink } from 'src/routes/components';
import { fCurrency } from 'src/utils/format-number';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { Wish } from '../../../types/Wish';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------


export function WishItem({ wish }: { wish: Wish }) {

    const linkTo = `/wewish/wish/${wish.id}`;



    const renderImg = (
        <Box sx={{ position: 'relative', p: 1 }}>
            <Fab
                color="warning"
                size="medium"
                className="add-cart-btn"
                sx={{
                    right: 16,
                    bottom: 16,
                    zIndex: 9,
                    opacity: 0,
                    position: 'absolute',
                    transition: (theme) =>
                        theme.transitions.create('all', {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.shorter,
                        }),
                }}
            >
                <Iconify icon="solar:cart-plus-bold" width={24} />
            </Fab>

            <Image
                alt={wish.name}
                src="https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-17.webp"
                ratio="1/1"
                sx={{ borderRadius: 1.5 }}
            />
        </Box >
    );

    const renderContent = (
        <Stack spacing={2.5} sx={{ p: 3, pt: 2 }}>
            <Typography variant="subtitle1" noWrap>{wish.name}</Typography>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
                    <Box component="span">{fCurrency(wish.price)}</Box>
                </Stack>
            </Stack>
        </Stack>
    );

    return (
        <Link component={RouterLink} href={linkTo} style={{ textDecoration: "none" }}>
            <Card sx={{ '&:hover .add-cart-btn': { opacity: 1 }, "&:hover": { boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" } }}>
                {renderImg}
                {renderContent}
            </Card>
        </Link >
    );
}
