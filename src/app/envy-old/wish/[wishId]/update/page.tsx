import { UpsertWish } from "src/app/envy-old/components/UpsertWish";
import { getServerWishQueries } from "src/app/envy-old/queries/wish/server";
import { NotFoundView, View500 } from "src/sections/error";

export default async function UpdateWishPage({ params }: { params: { wishId: number } }) {
    const { getWishQuery } = await getServerWishQueries()
    const result = await getWishQuery(params.wishId);

    if (!result.success) return <View500 />;

    if (!result.wish) return <NotFoundView />;

    return <UpsertWish wish={result.wish} wishList={result.wish.list} />;
}