import { useQuery } from '@tanstack/react-query';
import { supabase } from 'src/lib/supabase-client';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export type WishList = {
    id: string;
    name: string;
    description?: string;
    user_id: string;
    created_at: string;
    updated_at: string;
};

// ----------------------------------------------------------------------

export function useMyWishLists(): { wishLists: WishList[]; isLoading: boolean; deleteOne: (id: string) => Promise<void> } {
    const { authenticated, user } = useAuthContext();

    const { data: wishLists, isLoading, refetch } = useQuery({
        queryKey: ['wish-lists', user?.id],
        queryFn: async () => {
            if (!user?.id) {
                throw new Error('User not authenticated');
            }

            const { data, error } = await supabase
                .from('wish-lists')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }

            return data as WishList[];
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
