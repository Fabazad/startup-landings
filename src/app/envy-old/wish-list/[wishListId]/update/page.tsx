import { UpsertList } from "src/app/envy/components/UpsertList";
import { getServerWishListQuery } from "src/app/envy/queries/wishList/server";
import { View500 } from "src/sections/error";

export default async function UpdateListPage({ params }: { params: { wishListId: number } }) {
    const { wishListId } = params;

    const serverWishListQuery = await getServerWishListQuery();
    const res = await serverWishListQuery.getWishList(wishListId);

    if (!res.success) return <View500 />

    return <UpsertList wishList={res.wishList} />;
}