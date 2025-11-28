import type { CardProps } from '@mui/material/Card';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { maxLine } from 'src/theme/styles';
import { AvatarShape } from 'src/assets/illustrations';
import { Image } from 'src/components/image';
import { WishList } from 'src/app/wewish/types/WishList';
import { Fab, Tooltip } from '@mui/material';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type PostItemProps = CardProps & {
    wishList: WishList;
};

export function WishListItem({ wishList, sx, ...other }: PostItemProps) {
    const linkTo = `/wewish/wish-list/${wishList.id}`;

    return (
        <Link href={linkTo} style={{ textDecoration: "none" }}>
            <Card sx={{ "&:hover": { boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }, "&:hover *": { opacity: 1 }, ...sx }} {...other}>
                <Box sx={{ position: 'relative' }} >
                    <AvatarShape
                        sx={{
                            left: 0,
                            zIndex: 9,
                            width: 88,
                            height: 36,
                            bottom: -16,
                            position: 'absolute',
                        }}
                    />

                    <Avatar
                        alt={wishList.user.full_name}
                        src={wishList.user.avatar_url}
                        sx={{
                            left: 24,
                            zIndex: 9,
                            bottom: -24,
                            position: 'absolute',
                        }}
                    />

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
                            href={`/wewish/wish-list/${wishList.id}/share`}
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
                            color="warning"
                            size="medium"
                            href={`/wewish/wish-list/${wishList.id}/add-wish`}
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

                    <Image alt={wishList.name} src={"https://api-prod-minimal-v700.pages.dev/assets/images/cover/cover-5.webp"} ratio="4/3" />
                </Box>

                <CardContent sx={{ pt: 3.5 }}>
                    <Typography variant="caption" component="div" sx={{ mb: 1, color: 'text.disabled' }}>
                        {wishList.user.full_name}
                    </Typography>

                    <Typography
                        color="inherit"
                        fontWeight={800}
                        sx={(theme) => ({
                            ...maxLine({ line: 2, persistent: theme.typography.subtitle2 }),
                        })}
                    >
                        {wishList.name}
                    </Typography>
                    <Typography
                        color="inherit"
                        variant="subtitle2"
                        sx={{ mt: 0 }}
                    >
                        {wishList.wishCount} envies
                    </Typography>
                </CardContent>
            </Card>
        </Link >
    );
}