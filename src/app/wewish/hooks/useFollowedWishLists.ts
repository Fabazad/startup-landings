import { useQuery } from '@tanstack/react-query';
import { supabase } from 'src/lib/supabase-client';
import { WishList } from '../types/WishList';
import { getClientWishListQuery } from '../queries/wishList/client';

// ----------------------------------------------------------------------

export const useFollowedWishLists = (userId?: string): { wishLists: WishList[]; isLoading: boolean; deleteOne: (id: string) => Promise<void> } => {
    const clientWishListQuery = getClientWishListQuery();

    const { data: wishLists, isLoading, refetch } = useQuery({
        queryKey: ['followed-wish-lists', userId],
        queryFn: async () => {
            if (!userId) return [];
            const res = await clientWishListQuery.getFollowedWishLists(userId);
            if (!res.success) throw new Error(res.errorCode);
            return res.wishLists;
        },
    });

    const deleteOne = async (id: string) => {
        const { error } = await supabase.from('wish-lists').delete().eq('id', id);
        if (error) throw error;
        refetch();
    };

    return { wishLists: wishLists || [], isLoading, deleteOne };
}
