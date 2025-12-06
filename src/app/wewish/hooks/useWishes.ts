import { useQuery } from "@tanstack/react-query";
import { supabase } from "src/lib/supabase-client";
import { Wish } from "../types/Wish";
import { useAuthContext } from "src/auth/hooks";
import { getWishesQuery, setIsFavoriteQuery, unbookWishQuery } from "../queries/wish";
import { toast } from "sonner";

export const useWishes = ({ wishListId, isBookedByUser }: { wishListId?: number, isBookedByUser?: string }): {
    wishes?: Array<Wish>;
    isLoading: boolean;
    deleteWish: (wishId: number) => Promise<void>,
    setIsFavorite: (wishId: number, isFavorite: boolean) => void,
    unbookWish: (wishId: number) => Promise<void>
} => {

    const { user } = useAuthContext();

    const { data: wishes, isLoading, refetch } = useQuery<Array<Wish>>({
        queryKey: ['wishes', wishListId, isBookedByUser],
        queryFn: async () => {
            if (!user) return [];

            const result = await getWishesQuery(
                wishListId ?
                    { wishListId } :
                    isBookedByUser ? { isBookedByUser } : { userId: user.id }
            );

            if (!result.success) throw result.errorCode;
            return result.wishes;
        },
        enabled: !!user,

    });

    const deleteWish = async (wishId: number) => {
        const { error } = await supabase.from('wishes').delete().eq('id', wishId);
        if (error) toast.error("Une erreur est survenue");
        refetch();
    };

    const setIsFavorite = async (wishId: number, isFavorite: boolean) => {
        const result = await setIsFavoriteQuery(wishId, isFavorite);
        if (result.success) refetch();
        if (!result.success) toast.error("Une erreur est survenue");
    };

    const unbookWish = async (wishId: number) => {
        const result = await unbookWishQuery(wishId);
        if (result.success) refetch();
        if (!result.success) toast.error("Une erreur est survenue");
    };

    return { wishes: wishes, isLoading, deleteWish, setIsFavorite, unbookWish };
}