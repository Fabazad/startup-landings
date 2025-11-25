import { WishList } from "src/app/wewish/wish-list/[wishListId]/WishList";

export default function WishListPage({ params }: { params: { wishListId: string } }) {
    const { wishListId } = params;
    return <WishList wishListId={wishListId} />;
}