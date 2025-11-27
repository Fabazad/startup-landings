import { useQuery } from '@tanstack/react-query';
import { supabase } from 'src/lib/supabase-client';
import { useAuthContext } from 'src/auth/hooks';
import { getArchivedWishListsQuery, getUnarchivedWishListsQuery } from '../queries/wishList';
import { WishList } from '../types/WishList';

// ----------------------------------------------------------------------

export function useMyWishLists({ archived, userId }: { archived: boolean, userId?: string }): { wishLists: WishList[]; isLoading: boolean; deleteOne: (id: string) => Promise<void> } {

    const { data: wishLists, isLoading, refetch } = useQuery({
        queryKey: ['my-wish-lists', userId, archived],
        queryFn: async () => {
            if (!userId) return [];

            if (archived) {
                const res = await getArchivedWishListsQuery(userId);
                if (!res.success) throw new Error(res.errorCode);
                return res.wishLists;
            } else {
                const res = await getUnarchivedWishListsQuery(userId);
                if (!res.success) throw new Error(res.errorCode);
                return res.wishLists;
            }
        },
    });

    const deleteOne = async (id: string) => {
        const { error } = await supabase.from('wish-lists').delete().eq('id', id);
        if (error) throw error;
        refetch();
    };

    return { wishLists: wishLists || [], isLoading, deleteOne };
}
