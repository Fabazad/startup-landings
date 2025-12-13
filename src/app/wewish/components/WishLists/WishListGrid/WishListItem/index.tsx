"use client";

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
import { ShareButton } from './ShareButton';
import { AddWishButton } from './AddWishButton';
import { useAuthContext } from 'src/auth/hooks/use-auth-context';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type PostItemProps = {
    wishList: WishList;
};

export function WishListItem({ wishList }: PostItemProps) {
    const linkTo = paths.wewish.wishList.detail(wishList.id);

    const { user } = useAuthContext()

    const isOwner = user?.id === wishList.user.id
    const isArchived = !!wishList.archivedAt


    return (
        <Box sx={{ position: "relative", "&:hover *": { opacity: 1 } }}>
            <Link href={linkTo} style={{ textDecoration: "none" }}>
                <Card sx={{ "&:hover": { boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" } }} >
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
                            alt={wishList.user.display_name}
                            src={wishList.user.avatar_url}
                            sx={{
                                left: 24,
                                zIndex: 9,
                                bottom: -24,
                                position: 'absolute',
                            }}
                        />
                        <Image alt={wishList.name} src={wishList.imageUrl} ratio="4/3" />
                    </Box>

                    <CardContent sx={{ pt: 3.5 }}>
                        <Typography variant="caption" component="div" sx={{ mb: 1, color: 'text.disabled' }}>
                            {wishList.user.display_name}
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
                            sx={{ mt: 1 }}
                        >
                            {wishList.wishCount} envies
                        </Typography>
                    </CardContent>
                </Card>
            </Link >
            {!isArchived && isOwner && <ShareButton wishListId={wishList.id} />}

            {!isArchived && isOwner && <AddWishButton wishListId={wishList.id} />}

        </Box>
    );
}