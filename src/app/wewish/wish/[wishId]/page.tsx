import { NotFoundView, View500 } from "src/sections/error";
import { getWishQuery } from "../../queries/wish";
import { WishDetail } from "./WishDetail";

export default async function WishPage({ params }: { params: { wishId: number } }) {

    const wishResult = await getWishQuery(params.wishId);

    if (!wishResult.success) return <View500 />;
    const wish = wishResult.wish;
    if (!wish) return <NotFoundView />;

    return <WishDetail wish={wish} />;
}