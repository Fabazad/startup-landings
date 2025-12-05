import { UpsertWish } from "src/app/wewish/components/UpsertWish";

export default function AddWishPage({ params }: { params: { wishListId: number } }) {
    return <UpsertWish wishListId={params.wishListId} />;
}