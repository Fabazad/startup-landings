import { Box } from "@mui/material"
import { EmptyContent } from "src/components/empty-content";
import { Button } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { Wish } from "src/app/wewish/types/Wish";
import { WishItemSkeleton } from "./WishItemSkeleton";
import { WishItem } from "./WishItem";
import { AddWishItem } from "../WishGrid/AddWishItem";
import { paths } from "src/routes/paths";

export const WishList = ({ wishes, isLoading, wishListId, onFavoriteClick, onDelete, onUnbook, showList = false }: {
    wishes?: Array<Wish>,
    isLoading: boolean,
    wishListId?: number,
    onFavoriteClick: (wishId: number, isFavorite: boolean) => void,
    onDelete: (wishId: number) => void,
    onUnbook: (wishId: number) => void,
    showList?: boolean
}) => {
    if (!isLoading && wishes?.length === 0) return (
        <EmptyContent title="Aucune envie" action={
            <Button href={wishListId ? paths.wewish.wishList.addWish(wishListId) : paths.wewish.wishList.create} variant="contained" sx={{ borderRadius: 999, px: 2, mt: 1 }} size="large" color="warning">
                <Iconify icon="material-symbols:add" sx={{ mr: 1 }} />
                {wishListId ? "Ajouter une envie" : "Créer une liste"}
            </Button>
        }
        />
    )

    return (
        <Box sx={{ my: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {isLoading || wishes === undefined ? <WishItemSkeleton /> :
                (
                    <>
                        {wishListId && <AddWishItem wishListId={wishListId} />}
                        {wishes.map((wish) => (
                            <WishItem key={wish.id} wish={wish}
                                onFavoriteClick={() => onFavoriteClick(wish.id, !wish.isFavorite)}
                                onDelete={() => onDelete(wish.id)}
                                onUnbook={() => onUnbook(wish.id)}
                                showList={showList}
                            />
                        ))}
                    </>
                )}
        </Box>
    )
}