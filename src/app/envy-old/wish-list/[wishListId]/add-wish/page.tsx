import { UpsertWish } from "src/app/envy-old/components/UpsertWish";
import { getServerWishListQuery } from "src/app/envy-old/queries/wishList/server";
import { NotFoundView, View500 } from "src/sections/error";

export default async function AddWishPage({ params }: { params: { wishListId: number } }) {
    const { getWishList } = await getServerWishListQuery();
    const wishListRes = await getWishList(params.wishListId);
    if (!wishListRes.success) return <View500 />;
    if (!wishListRes.wishList) return <NotFoundView />;

    return <UpsertWish wishList={wishListRes.wishList} />;
}

