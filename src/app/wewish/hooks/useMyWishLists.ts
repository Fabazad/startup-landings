import { useQuery } from '@tanstack/react-query';
import { supabase } from 'src/lib/supabase-client';
import { useAuthContext } from 'src/auth/hooks';
import { getArchivedWishListsQuery, getUnarchivedWishListsQuery } from '../queries/wishList';
import { WishList } from '../types/WishList';

// ----------------------------------------------------------------------

export function useMyWishLists({ archived }: { archived: boolean }): { wishLists: WishList[]; isLoading: boolean; deleteOne: (id: string) => Promise<void> } {
    const { authenticated, user } = useAuthContext();

    const { data: wishLists, isLoading, refetch } = useQuery({
        queryKey: ['wish-lists', user?.id, archived],
        queryFn: async () => {
            if (!user?.id) throw new Error('User not authenticated');

            if (archived) {
                const res = await getArchivedWishListsQuery(user.id);
                if (!res.success) throw new Error(res.errorCode);
                return res.wishLists;
            } else {
                const res = await getUnarchivedWishListsQuery(user.id);
                if (!res.success) throw new Error(res.errorCode);
                return res.wishLists;
            }
        },
        enabled: authenticated, // Only run query if user is authenticated
    });

    const deleteOne = async (id: string) => {
        const { error } = await supabase.from('wish-lists').delete().eq('id', id);
        if (error) throw error;
        refetch();
    };

    return { wishLists: wishLists || [], isLoading, deleteOne };
}
