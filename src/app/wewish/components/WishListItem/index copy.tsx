import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import { RouterLink } from 'src/routes/components';

import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { ColorPreview } from 'src/components/color-utils';
import { WishList } from '../../types/WishList';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

export function WishListItem2({ wishList }: { wishList: WishList }) {

    const { id, name } = wishList;

    const renderLabels = (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
                position: 'absolute',
                zIndex: 9,
                top: 16,
                right: 16,
            }}
        >
            <Label variant="filled" color="error">
                Test
            </Label>
        </Stack>
    );

    const renderImg = (
        <Box sx={{ position: 'relative', p: 1 }}>
            <Fab
                color="warning"
                size="medium"
                onClick={() => {
                    console.log("click");
                }}
                sx={{
                    right: 16,
                    bottom: 16,
                    zIndex: 99,
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
                minWidth={200}
                minHeight={200}
                src="https://img.freepik.com/free-photo/woman-beach-with-her-baby-enjoying-sunset_52683-144131.jpg?size=626&ext=jpg"
                alt={name}
                ratio="1/1"
                sx={{ borderRadius: 1.5 }}
            />
        </Box>
    );

    const renderContent = (
        <Stack spacing={2.5} sx={{ p: 3, pt: 2 }}>
            <Typography variant="subtitle1">{name}</Typography>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
                    <Box component="span">{fCurrency(20)}</Box>
                </Stack>
            </Stack>
        </Stack >
    );

    return (
        <Link component={RouterLink} href={`/wewish/wish-list/${id}`} color="inherit" variant="subtitle2" noWrap>

            <Card sx={{ '&:hover .add-cart-btn': { opacity: 1 } }}>
                {renderLabels}

                {renderImg}

                {renderContent}
            </Card>
        </Link>
    );
}
