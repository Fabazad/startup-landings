import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { fCurrency } from 'src/utils/format-number';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { WishList } from '../../types/WishList';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

export function WishListItem({ wishList }: { wishList: WishList }) {

    const { id, name, wishCount } = wishList;

    const renderImg = (
        <Box sx={{ position: 'relative', p: 1 }}>
            <Tooltip
                title="Partager"
                arrow
                placement='top'
                slotProps={{
                    tooltip: {
                        sx: {
                            fontSize: '1rem',
                            padding: '8px 16px',
                        }
                    }
                }}
            >
                <Fab
                    color="default"
                    size="medium"
                    href={`/wewish/wish-list/${id}/share`}
                    onClick={(e) => {
                        e.stopPropagation()
                        console.log("click");
                    }}
                    sx={{
                        right: 16,
                        top: 16,
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
                    <Iconify icon="solar:share-bold" width={24} />
                </Fab>
            </Tooltip>

            <Tooltip
                title="Ajouter une envie"
                arrow
                placement='top'
                slotProps={{
                    tooltip: {
                        sx: {
                            fontSize: '1rem',
                            padding: '8px 16px',
                        }
                    }
                }}
            >
                <Fab
                    color="primary"
                    size="medium"
                    href={`/wewish/wish-list/${id}/add-wish`}
                    onClick={(e) => {
                        e.stopPropagation()
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
                    <Iconify icon="material-symbols:add" width={24} />
                </Fab>
            </Tooltip>

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
            <Typography variant="subtitle1" fontWeight="bold">{name}</Typography>


            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">{wishCount} envie{wishCount === 1 ? "" : "s"}</Typography>

                <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
                    <Box component="span">{fCurrency(20)}</Box>
                </Stack>
            </Stack>
        </Stack >
    );

    return (
        <Link href={`/wewish/wish-list/${id}`} style={{ textDecoration: 'none' }}>

            <Card sx={{ "&:hover": { boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" }, '&:hover *': { opacity: 1 } }}>
                {renderImg}

                {renderContent}
            </Card>
        </Link>
    );
}
