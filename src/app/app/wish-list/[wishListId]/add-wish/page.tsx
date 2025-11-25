import { AddWish } from "src/sections/wewish/AddWish";

export default function AddWishPage({ params }: { params: { wishListId: string } }) {
    return <AddWish wishListId={params.wishListId} />;
}