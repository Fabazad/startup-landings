import { Box } from "@mui/material"
import { EmptyContent } from "src/components/empty-content";
import { Button } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { Wish } from "src/app/wewish/types/Wish";
import { WishItemSkeleton } from "./WishItemSkeleton";
import { WishItem } from "./WishItem";
import { AddWishItem } from "../WishGrid/AddWishItem";

export const WishList = ({ wishes, isLoading, wishListId, onFavoriteClick, onDelete }: {
    wishes: Array<Wish>,
    isLoading: boolean,
    wishListId?: number,
    onFavoriteClick: (wishId: number, isFavorite: boolean) => void,
    onDelete: (wishId: number) => void,
}) => {
    if (!isLoading && wishes.length === 0) return (
        <EmptyContent title="Aucune envie" action={
            <Button href={`/wewish/wish-list/${wishListId}/add-wish`} variant="contained" sx={{ borderRadius: 999, px: 2, mt: 1 }} size="large" color="warning">
                <Iconify icon="material-symbols:add" sx={{ mr: 1 }} />
                Ajouter une envie
            </Button>
        }
        />
    )

    return (
        <Box sx={{ my: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {isLoading && <WishItemSkeleton />}
            {!isLoading && wishes.length > 0 && (
                <>
                    {wishListId && <AddWishItem wishListId={wishListId} />}
                    {wishes.map((wish) => (
                        <WishItem key={wish.id} wish={wish}
                            onFavoriteClick={() => onFavoriteClick(wish.id, !wish.isFavorite)}
                            onDelete={() => onDelete(wish.id)}
                        />
                    ))}
                </>
            )}
        </Box>
    )
}