import { UpsertWish } from "src/app/wewish/components/UpsertWish";
import { getWishQuery } from "src/app/wewish/queries/wish";
import { NotFoundView, View500 } from "src/sections/error";

export default async function UpdateWishPage({ params }: { params: { wishId: number } }) {
    const result = await getWishQuery(params.wishId);

    if (!result.success) return <View500 />;

    if (!result.wish) return <NotFoundView />;

    return <UpsertWish wish={result.wish} wishListId={result.wish.list.id} />;
}