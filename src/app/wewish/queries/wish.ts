import { supabase } from "src/lib/supabase-client";
import { Wish } from "../types/Wish";

export const getWishQuery = async (wishId: string): Promise<{ success: true, wish?: Wish } | { success: false, errorCode: "unknown" }> => {
    const { data, error } = await supabase
        .from('wishes')
        .select('*, bookedByUser:profiles (full_name,avatar_url)')
        .eq('id', wishId)
        .maybeSingle();

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true, wish: data };
}

export const deleteWishQuery = async (wishId: string): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
    const { error } = await supabase
        .from('wishes')
        .delete()
        .eq('id', wishId);

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true };
}