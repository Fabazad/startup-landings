import { useQuery } from "@tanstack/react-query";
import { supabase } from "src/lib/supabase-client";
import { useState } from "react";
import { Wish } from "../types/Wish";
import { useAuthContext } from "src/auth/hooks";
import { getWishesQuery, setIsFavoriteQuery } from "../queries/wish";
import { toast } from "sonner";

export const useWishes = ({ wishListId }: { wishListId?: number }): {
    wishes: Array<Wish>;
    isLoading: boolean;
    deleteWish: (wishId: number) => Promise<void>,
    isDeletingWish: number | null,
    setIsFavorite: (wishId: number, isFavorite: boolean) => void
} => {

    const [isDeletingWish, setIsDeletingWish] = useState<number | null>(null);
    const { user } = useAuthContext();

    const { data: wishes, isLoading, refetch } = useQuery<Array<Wish>>({
        queryKey: ['wishes', wishListId],
        queryFn: async () => {
            const result = await getWishesQuery(wishListId ? { wishListId } : { userId: user?.id });

            if (!result.success) throw result.errorCode;
            return result.wishes;
        },
    });

    const deleteWish = async (wishId: number) => {
        setIsDeletingWish(wishId);
        const { error } = await supabase.from('wishes').delete().eq('id', wishId);
        setIsDeletingWish(null);
        refetch();
        if (error) throw error;
    };

    const setIsFavorite = async (wishId: number, isFavorite: boolean) => {
        const result = await setIsFavoriteQuery(wishId, isFavorite);
        if (result.success) refetch();
        if (!result.success) toast.error("Une erreur est survenue");
    };

    return { wishes: wishes || [], isLoading, deleteWish, isDeletingWish, setIsFavorite };
}