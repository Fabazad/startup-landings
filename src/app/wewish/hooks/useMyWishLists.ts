import { useQuery } from '@tanstack/react-query';
import { supabase } from 'src/lib/supabase-client';
import { WishList } from '../types/WishList';
import { getClientWishListQuery } from '../queries/wishList/client';

// ----------------------------------------------------------------------

export function useMyWishLists({ archived, userId }: { archived: boolean, userId?: string }): { wishLists?: WishList[]; isLoading: boolean; deleteOne: (id: string) => Promise<void> } {

    const clientWishListQuery = getClientWishListQuery();

    const { data: wishLists, isLoading, refetch } = useQuery({
        queryKey: ['my-wish-lists', userId, archived],
        queryFn: async () => {
            if (!userId) return [];

            if (archived) {
                const res = await clientWishListQuery.getArchivedWishLists(userId);
                if (!res.success) throw new Error(res.errorCode);
                return res.wishLists;
            } else {
                const res = await clientWishListQuery.getUnarchivedWishLists(userId);
                if (!res.success) throw new Error(res.errorCode);
                return res.wishLists;
            }
        },
        enabled: !!userId,
    });

    const deleteOne = async (id: string) => {
        const { error } = await supabase.from('wish-lists').delete().eq('id', id);
        if (error) throw error;
        refetch();
    };

    return { wishLists: wishLists, isLoading, deleteOne };
}
