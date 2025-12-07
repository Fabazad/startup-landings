import { Box } from "@mui/material"
import { EmptyContent } from "src/components/empty-content";
import { Button } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { Wish } from "src/app/wewish/types/Wish";
import { WishItemSkeleton } from "./WishItemSkeleton";
import { WishItem } from "./WishItem";
import { AddWishItem } from "../WishGrid/AddWishItem";
import { paths } from "src/routes/paths";
import { User } from "src/app/wewish/types/User";
import { WishList as WishListType } from "src/app/wewish/types/WishList";


export const WishList = ({ wishes, isLoading, wishList, onFavoriteClick, onDelete, onUnbook, showList = false, user }: {
    wishes?: Array<Wish>,
    isLoading: boolean,
    wishList?: WishListType,
    onFavoriteClick: (wishId: number, isFavorite: boolean) => void,
    onDelete: (wishId: number) => void,
    onUnbook: (wishId: number) => void,
    showList?: boolean
    user?: User
}) => {

    const canAddWish = user && wishList && user.id === wishList.user.id;

    if (!isLoading && wishes?.length === 0) return (
        <EmptyContent title="Aucune envie" action={
            <Button href={wishList?.id ? paths.wewish.wishList.addWish(wishList?.id) : paths.wewish.wishList.create} variant="contained" sx={{ borderRadius: 999, px: 2, mt: 1 }} size="large" color="warning">
                <Iconify icon="material-symbols:add" sx={{ mr: 1 }} />
                {wishList ? "Ajouter une envie" : "Créer une liste"}
            </Button>
        }
        />
    )

    return (
        <Box sx={{ my: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {isLoading || wishes === undefined ? <WishItemSkeleton /> :
                (
                    <>
                        {canAddWish && <AddWishItem wishListId={wishList?.id} />}
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