import { UpsertWish } from "src/app/envy/components/UpsertWish";

export default function AddWishPage({ params }: { params: { wishListId: number } }) {
    return <UpsertWish wishListId={params.wishListId} />;
}