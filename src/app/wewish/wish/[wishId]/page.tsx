import { NotFoundView, View500 } from "src/sections/error";
import { getWishQuery } from "../../queries/wish";
import { WishDetail } from "./WishDetail";
import { getAuthUser } from "src/auth/getAuthUser";

export default async function WishPage({ params }: { params: { wishId: number } }) {

    const [wishResult, userResult] = await Promise.all([
        getWishQuery(params.wishId),
        getAuthUser()
    ]);

    if (!wishResult.success || !userResult.success) return <View500 />;
    const wish = wishResult.wish;
    const user = userResult.user;
    if (!wish) return <NotFoundView />;

    return <WishDetail wish={wish} user={user || undefined} />;
}