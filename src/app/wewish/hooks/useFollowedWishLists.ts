import { useQuery } from '@tanstack/react-query';
import { supabase } from 'src/lib/supabase-client';
import { getFollowedWishListsQuery } from '../queries/wishList';
import { WishList } from '../types/WishList';

// ----------------------------------------------------------------------

export const useFollowedWishLists = (userId?: string): { wishLists: WishList[]; isLoading: boolean; deleteOne: (id: string) => Promise<void> } => {

    const { data: wishLists, isLoading, refetch } = useQuery({
        queryKey: ['followed-wish-lists', userId],
        queryFn: async () => {
            if (!userId) return [];
            const res = await getFollowedWishListsQuery(userId);
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
