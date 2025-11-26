import { useQuery } from "@tanstack/react-query";
import { supabase } from "src/lib/supabase-client";
import { Wish } from "../types/Wish";
import { useState } from "react";

export const useWish = ({ wishId }: { wishId: string }): { wish?: Wish; isLoading: boolean, bookWishByUser: (userId: string) => Promise<void>; bookWishByName: (name: string) => Promise<void>; isBooking: boolean } => {

    const [isBooking, setIsBooking] = useState(false);

    const { data: wish, isLoading, refetch } = useQuery<Wish>({
        queryKey: ['wish', wishId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('wishes')
                .select('*, bookedByUser:profiles (full_name,avatar_url)')
                .eq('id', wishId)
                .single();

            if (error) throw error;
            return data;
        },
    });

    const bookWishByUser = async (userId: string) => {
        setIsBooking(true);
        const { error } = await supabase.from('wishes').update({ bookedByUser: userId }).eq('id', wishId);
        setIsBooking(false);
        if (error) throw error;
        refetch();
    }

    const bookWishByName = async (name: string) => {
        setIsBooking(true);
        const { error } = await supabase.from('wishes').update({ bookedByName: name }).eq('id', wishId);
        setIsBooking(false);
        if (error) throw error;
        refetch();
    }

    return { wish, isLoading, bookWishByUser, bookWishByName, isBooking };
}