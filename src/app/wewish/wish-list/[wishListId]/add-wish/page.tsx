import { AddWish } from "./AddWish";

export default function AddWishPage({ params }: { params: { wishListId: string } }) {
    return <AddWish wishListId={params.wishListId} />;
}