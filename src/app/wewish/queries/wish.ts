import { supabase } from "src/lib/supabase-client";
import { Wish } from "../types/Wish";

export const getWishQuery = async (wishId: string): Promise<{ success: true, wish?: Wish } | { success: false, errorCode: "unknown" }> => {
    const { data, error } = await supabase
        .from('wishes')
        .select('*, bookedByUser:profiles (full_name,avatar_url), list:wish-lists!inner (id, user_id)')
        .eq('id', wishId)
        .maybeSingle<any>();

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true, wish: { ...data, listId: data.list.id, userId: data.list.user_id } };
}

export const deleteWishQuery = async (wishId: string): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
    const { error } = await supabase
        .from('wishes')
        .delete()
        .eq('id', wishId);

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true };
}

export const setIsFavoriteQuery = async (wishId: number, isFavorite: boolean): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
    const { error } = await supabase
        .from('wishes')
        .update({ isFavorite })
        .eq('id', wishId);

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true };
}

export const getWishesQuery = async (params: { wishListId: number } | { userId: number }): Promise<{ success: true, wishes: Wish[] } | { success: false, errorCode: "unknown" }> => {
    const query = supabase
        .from('wishes')
        .select('*, bookedByUser:profiles (full_name,avatar_url), list:wish-lists!inner (id, user_id)')
        .order('created_at', { ascending: false });

    if ('wishListId' in params) {
        query.eq('listId', params.wishListId);
    } else {
        query.eq('wish-lists.user_id', params.userId);
    }

    const { data, error } = await query;

    if (error) return { success: false, errorCode: "unknown" };
    console.log({ data });

    const wishes = data.map((wish: any) => ({ ...wish, listId: wish.list.id, userId: wish.list.user_id }));
    console.log({ wishes });

    return { success: true, wishes };
}