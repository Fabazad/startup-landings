import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { fCurrency } from 'src/utils/format-number';
import { Image } from 'src/components/image';
import { defaultWishImageUrl, Wish } from '../../../types/Wish';
import { Typography } from '@mui/material';
import { FavoriteButton } from './FavoriteButton';
import { useAuthContext } from 'src/auth/hooks/use-auth-context';
import { BookButton } from './BookButton';
import { UpdateButton } from './UpdateButton';
import { DeleteButton } from './DeleteButton';
import { formatUrl } from 'src/utils/format-url';
import Link from '@mui/material/Link';
import { paths } from 'src/routes/paths';
import { WishListLabel } from '../../WishListLabel';

// ----------------------------------------------------------------------


export function WishItem({ wish, onFavoriteClick, onDelete, onUnbook, showList = false, canBook }: {
    wish: Wish;
    onFavoriteClick: () => void;
    onDelete: () => void;
    onUnbook: () => void;
    showList?: boolean
    canBook: boolean
}) {

    const { user } = useAuthContext();
    const linkTo = paths.envy.wish.detail(wish.id);

    const isUserOwner = user?.id === wish.userId;
    const isBookedBy = wish.bookedByName || wish.bookedByUser?.display_name || null;

    return (
        <Box sx={{ display: "grid", '&:hover .hided-button': { opacity: 1 }, position: "relative" }}>
            <Link href={linkTo} style={{ textDecoration: "none", display: "grid" }}>
                <Card sx={{ "&:hover": { boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" } }}>
                    <Box sx={{ position: 'relative', p: 1 }}>
                        {showList && (
                            <Box sx={{
                                width: "100%",
                                position: "absolute",
                                bottom: 16,
                                left: 16,
                                zIndex: 10,
                            }}>
                                <WishListLabel name={wish.list.name} />
                            </Box>
                        )}

                        <Image
                            alt={wish.name}
                            src={wish.imageUrl || defaultWishImageUrl}
                            ratio="1/1"
                            sx={{ borderRadius: 1.5, opacity: !isUserOwner && isBookedBy ? 0.4 : 1 }}
                        />
                    </Box >
                    <Stack spacing={2.5} sx={{ p: 3, pt: 2 }}>
                        <Typography variant="subtitle1" noWrap>{wish.name}</Typography>

                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            {wish.price && (
                                <Stack direction="row" spacing={0.5} sx={{ typography: 'body2', color: "text.secondary" }}>
                                    <Box component="span">{fCurrency(wish.price)}</Box>
                                </Stack>
                            )}
                            {wish.productUrl && (
                                <Stack direction="row" spacing={0.5} sx={{ typography: 'body2', color: "text.secondary" }}>
                                    <Box component="span">{formatUrl(wish.productUrl)}</Box>
                                </Stack>
                            )}
                        </Stack>


                    </Stack>
                </Card>
            </Link>
            <Box sx={{ position: "absolute", top: 0, right: 0, width: "100%" }}>
                {canBook && <BookButton isBookedBy={isBookedBy} />}

                <FavoriteButton isFavorite={wish.isFavorite} onClick={onFavoriteClick} isUserOwner={isUserOwner} />

                {isUserOwner && (
                    <>
                        <UpdateButton wishId={wish.id} />
                        <DeleteButton onDelete={onDelete} />
                    </>
                )}

            </Box>
        </Box>
    );
}
