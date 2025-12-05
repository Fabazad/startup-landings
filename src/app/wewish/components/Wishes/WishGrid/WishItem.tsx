import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { fCurrency } from 'src/utils/format-number';
import { Image } from 'src/components/image';
import { Wish } from '../../../types/Wish';
import { Typography } from '@mui/material';
import { FavoriteButton } from './FavoriteButton';
import { useAuthContext } from 'src/auth/hooks/use-auth-context';
import { BookButton } from './BookButton';
import { UpdateButton } from './UpdateButton';
import { DeleteButton } from './DeleteButton';
import { formatUrl } from 'src/utils/format-url';

// ----------------------------------------------------------------------


export function WishItem({ wish, onFavoriteClick, onDelete }: { wish: Wish; onFavoriteClick: () => void; onDelete: () => void }) {

    const { user } = useAuthContext();
    const linkTo = `/wewish/wish/${wish.id}`;

    const isUserOwner = user?.id === wish.userId;

    return (
        <Card sx={{ '&:hover .hided-button': { opacity: 1 }, "&:hover": { boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" } }}>
            <Box sx={{ position: 'relative', p: 1 }}>
                {!isUserOwner && <BookButton wishId={wish.id} />}

                <FavoriteButton isFavorite={wish.isFavorite} onClick={onFavoriteClick} isUserOwner={isUserOwner} />

                {isUserOwner && (<>
                    <UpdateButton wishId={wish.id} />
                    <DeleteButton onDelete={onDelete} />
                </>)
                }

                <Image
                    alt={wish.name}
                    src="https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-17.webp"
                    ratio="1/1"
                    sx={{ borderRadius: 1.5 }}
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
    );
}
