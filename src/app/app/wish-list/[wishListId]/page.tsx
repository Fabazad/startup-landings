import { WishList } from "src/sections/wewish/WishList";

export default function WishListPage({ params }: { params: { wishListId: string } }) {
    const { wishListId } = params;
    return <WishList wishListId={wishListId} />;
}