'use client';

import { UpsertList } from "src/app/wewish/components/UpsertList";
import { useWishList } from "src/app/wewish/hooks/useWishList";
import { SplashScreen } from "src/components/loading-screen";
import { useRouter } from "next/navigation";

export default function UpdateListPage({ params }: { params: { wishListId: number } }) {
    const { wishListId } = params;

    const { wishList, isLoading } = useWishList({ wishListId });

    const router = useRouter();

    if (isLoading) return <SplashScreen />;
    if (!wishList) return router.push('/wewish/wish-lists');

    return <UpsertList wishList={wishList} />;
}