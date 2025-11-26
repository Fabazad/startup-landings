import { useQuery } from "@tanstack/react-query";
import { supabase } from "src/lib/supabase-client";
import { WishList } from "../types/WishList";
import { useState } from "react";

export const useWishList = ({ wishListId }: { wishListId?: string }): { wishList?: WishList; isLoading: boolean; deleteList: () => Promise<void>, isDeleting: boolean } => {
    if (!wishListId) return { wishList: undefined, isLoading: false, deleteList: () => Promise.resolve(), isDeleting: false };

    const [isDeleting, setIsDeleting] = useState(false);

    const { data: wishList, isLoading } = useQuery<WishList>({
        queryKey: ['wish-list', wishListId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('wish-lists')
                .select('*')
                .eq('id', wishListId)
                .single();

            if (error) throw error;
            return data;
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