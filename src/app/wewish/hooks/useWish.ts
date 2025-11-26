import { useQuery } from "@tanstack/react-query";
import { supabase } from "src/lib/supabase-client";
import { Wish } from "../types/Wish";

export const useWish = ({ wishId }: { wishId: string }): { wish?: Wish; isLoading: boolean } => {
    const { data: wish, isLoading } = useQuery<Wish>({
        queryKey: ['wish', wishId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('wishes')
                .select('*')
                .eq('id', wishId)
                .single();

            if (error) throw error;
            return data;
        },
    });

    return { wish, isLoading };
}