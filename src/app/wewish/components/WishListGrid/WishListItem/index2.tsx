import type { IPostItem } from 'src/types/blog';
import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { maxLine, varAlpha } from 'src/theme/styles';
import { AvatarShape } from 'src/assets/illustrations';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { WishList } from 'src/app/wewish/types/WishList';

// ----------------------------------------------------------------------

type PostItemProps = CardProps & {
    wishList: WishList;
};

export function PostItem({ wishList, sx, ...other }: PostItemProps) {
    const linkTo = `/wewish/wish-list/${wishList.id}`;

    return (
        <Card sx={sx} {...other}>
            <Box sx={{ position: 'relative' }}>
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

                <Image alt={wishList.name} src={"https://api-prod-minimal-v700.pages.dev/assets/images/cover/cover-5.webp"} ratio="4/3" />
            </Box>

            <CardContent sx={{ pt: 6 }}>
                <Typography variant="caption" component="div" sx={{ mb: 1, color: 'text.disabled' }}>
                    {fDate(wishList.created_at)}
                </Typography>

                <Link
                    component={RouterLink}
                    href={linkTo}
                    color="inherit"
                    variant="subtitle2"
                    sx={(theme) => ({
                        ...maxLine({ line: 2, persistent: theme.typography.subtitle2 }),
                    })}
                >
                    {wishList.name}
                </Link>

                <InfoBlock
                    totalViews={wishList.wishCount}
                    totalShares={wishList.wishCount}
                    totalComments={wishList.wishCount}
                />
            </CardContent>
        </Card>
    );
}

// ----------------------------------------------------------------------

type PostItemLatestProps = {
    post: IPostItem;
    index: number;
};

export function PostItemLatest({ post, index }: PostItemLatestProps) {
    const linkTo = paths.post.details(post.title);

    const postSmall = index === 1 || index === 2;

    return (
        <Card>
            <Avatar
                alt={post.author.name}
                src={post.author.avatarUrl}
                sx={{
                    top: 24,
                    left: 24,
                    zIndex: 9,
                    position: 'absolute',
                }}
            />

            <Image
                alt={post.title}
                src={post.coverUrl}
                ratio="4/3"
                sx={{ height: 360 }}
                slotProps={{
                    overlay: { bgcolor: (theme) => varAlpha(theme.vars.palette.grey['900Channel'], 0.64) },
                }}
            />

            <CardContent
                sx={{
                    width: 1,
                    zIndex: 9,
                    bottom: 0,
                    position: 'absolute',
                    color: 'common.white',
                }}
            >
                <Typography variant="caption" component="div" sx={{ mb: 1, opacity: 0.64 }}>
                    {fDate(post.createdAt)}
                </Typography>

                <Link
                    component={RouterLink}
                    href={linkTo}
                    color="inherit"
                    variant={postSmall ? 'subtitle2' : 'h5'}
                    sx={(theme) => ({
                        ...maxLine({
                            line: 2,
                            persistent: postSmall ? theme.typography.subtitle2 : theme.typography.h5,
                        }),
                    })}
                >
                    {post.title}
                </Link>

                <InfoBlock
                    totalViews={post.totalViews}
                    totalShares={post.totalShares}
                    totalComments={post.totalComments}
                    sx={{ opacity: 0.64, color: 'common.white' }}
                />
            </CardContent>
        </Card>
    );
}

// ----------------------------------------------------------------------

type InfoBlockProps = BoxProps & Pick<IPostItem, 'totalViews' | 'totalShares' | 'totalComments'>;

export function InfoBlock({
    sx,
    totalComments,
    totalViews,
    totalShares,
    ...other
}: InfoBlockProps) {
    return (
        <Box
            gap={1.5}
            display="flex"
            justifyContent="flex-end"
            sx={{
                mt: 3,
                typography: 'caption',
                color: 'text.disabled',
                ...sx,
            }}
            {...other}
        >
            <Box gap={0.5} display="flex" alignItems="center">
                <Iconify width={16} icon="eva:message-circle-fill" />
                {fShortenNumber(totalComments)}
            </Box>

            <Box gap={0.5} display="flex" alignItems="center">
                <Iconify width={16} icon="solar:eye-bold" />
                {fShortenNumber(totalViews)}
            </Box>

            <Box gap={0.5} display="flex" alignItems="center">
                <Iconify width={16} icon="solar:share-bold" />
                {fShortenNumber(totalShares)}
            </Box>
        </Box>
    );
}
