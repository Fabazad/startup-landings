import { useQuery } from "@tanstack/react-query";
import { supabase } from "src/lib/supabase-client";
import { WishList } from "../types/WishList";

export const useWishList = ({ wishListId }: { wishListId: string }): { wishList?: WishList; isLoading: boolean } => {
    const { data: wishList, isLoading } = useQuery<WishList>({
        queryKey: ['wish-list', wishListId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('wish-lists')
                .select('*, wishes(*)')
                .eq('id', wishListId)
                .single();

            if (error) throw error;
            return data;
        },
    });

    return { wishList, isLoading };
}