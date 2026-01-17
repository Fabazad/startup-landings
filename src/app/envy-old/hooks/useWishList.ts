import { useQuery } from "@tanstack/react-query";
import { supabase } from "src/lib/supabase-client";
import { WishList } from "../types/WishList";
import { useState } from "react";
import { useAuthContext } from "src/auth/hooks";
import { getClientWishListQuery } from "../queries/wishList/client";

export const useWishList = ({ wishListId }: { wishListId?: number }): { wishList?: WishList; isLoading: boolean; deleteList: () => Promise<void>, isDeleting: boolean } => {
    if (!wishListId) return { wishList: undefined, isLoading: false, deleteList: () => Promise.resolve(), isDeleting: false };

    const clientWishListQuery = getClientWishListQuery();
    const { user } = useAuthContext();
    const [isDeleting, setIsDeleting] = useState(false);

    const { data: wishList, isLoading } = useQuery<WishList | undefined>({
        queryKey: ['wish-list', wishListId, user],
        queryFn: async () => {
            const result = await clientWishListQuery.getWishList(wishListId, user?.id);

            if (!result.success) throw result.error;
            return result.wishList;
        },
    });


    const deleteList = async () => {
        setIsDeleting(true);
        const { error } = await supabase.from('wish-lists').delete().eq('id', wishListId);
        setIsDeleting(false);
        if (error) throw error;
    };

    return { wishList, isLoading, deleteList, isDeleting };
}