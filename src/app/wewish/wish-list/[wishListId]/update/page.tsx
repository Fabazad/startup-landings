import { UpsertList } from "src/app/wewish/components/UpsertList";
import { getWishListQuery } from "src/app/wewish/queries/wishList";
import { View500 } from "src/sections/error";

export default async function UpdateListPage({ params }: { params: { wishListId: number } }) {
    const { wishListId } = params;

    const res = await getWishListQuery(wishListId);

    if (!res.success) return <View500 />

    return <UpsertList wishList={res.wishList} />;
}