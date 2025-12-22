import { useQuery } from "@tanstack/react-query";
import { Wish } from "../types/Wish";
import { useState } from "react";
import { getClientWishQueries } from "../queries/wish/client";
import { toast } from "sonner";

const { getWishQuery, bookWishQuery } = getClientWishQueries();

export const useWish = ({ wishId }: { wishId: number }): {
    wish?: Wish;
    isLoading: boolean;
    bookWish: (params: { userId: string } | { userId?: string; name: string }) => Promise<void>;
    isBooking: boolean
} => {
    const [isBooking, setIsBooking] = useState(false);

    const { data: wish, isLoading, refetch } = useQuery<Wish | undefined>({
        queryKey: ['wish', wishId],
        queryFn: async () => {
            const res = await getWishQuery(wishId);
            if (!res.success) throw new Error(res.errorCode);
            return res.wish;
        }
    });

    const bookWish = async (params: { userId: string } | { userId?: string; name: string }) => {
        setIsBooking(true);
        const res = await bookWishQuery({ wishId, ...params });
        setIsBooking(false);
        if (!res.success) toast.error("Une erreur est survenue");
        refetch();
    }

    return { wish, isLoading, bookWish, isBooking };
}