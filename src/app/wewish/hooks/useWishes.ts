import { useQuery } from "@tanstack/react-query";
import { supabase } from "src/lib/supabase-client";
import { useState } from "react";
import { Wish } from "../types/Wish";
import { useAuthContext } from "src/auth/hooks";

export const useWishes = ({ wishListId }: { wishListId?: number }): { wishes: Array<Wish>; isLoading: boolean; deleteWish: (wishId: number) => Promise<void>, isDeletingWish: number | null } => {

    const [isDeletingWish, setIsDeletingWish] = useState<number | null>(null);
    const { user } = useAuthContext();

    const { data: wishes, isLoading, refetch } = useQuery<Array<Wish>>({
        queryKey: ['wishes', wishListId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('wishes')
                .select('*')
                .eq(wishListId ? 'listId' : 'userId', wishListId || user?.id);

            if (error) throw error;
            return data;
        },
    });

    const deleteWish = async (wishId: number) => {
        setIsDeletingWish(wishId);
        const { error } = await supabase.from('wishes').delete().eq('id', wishId);
        setIsDeletingWish(null);
        refetch();
        if (error) throw error;
    };

    return { wishes: wishes || [], isLoading, deleteWish, isDeletingWish };
}