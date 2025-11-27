import { supabase } from "src/lib/supabase-client";
import { WishList } from "../types/WishList";

export const getWishListQuery = async (wishListId: number): Promise<{ success: true, wishList?: WishList } | { success: false, errorCode: "unknown" }> => {
    const { data, error } = await supabase
        .from('wish-lists')
        .select('*')
        .eq('id', wishListId)
        .maybeSingle();

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true, wishList: data };
}

export const archiveWishListQuery = async (wishListId: number): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
    const { error } = await supabase
        .from('wish-lists')
        .update({ archivedAt: new Date() })
        .eq('id', wishListId);

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true };
}

export const unarchiveWishListQuery = async (wishListId: number): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
    const { error } = await supabase
        .from('wish-lists')
        .update({ archivedAt: null })
        .eq('id', wishListId);

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true };
}

export const deleteWishListQuery = async (wishListId: number): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
    const { error } = await supabase
        .from('wish-lists')
        .delete()
        .eq('id', wishListId);

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true };
}

export const getUserWishLists = async (userId: string): Promise<{ success: true, wishLists: WishList[] } | { success: false, errorCode: "unknown" }> => {
    const { data, error } = await supabase
        .from('wish-lists')
        .select('*')
        .eq('user_id', userId);

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true, wishLists: data };
}

export const getArchivedWishListsQuery = async (userId: string): Promise<{ success: true, wishLists: WishList[] } | { success: false, errorCode: "unknown" }> => {
    const { data, error } = await supabase
        .from('wish-lists')
        .select('*')
        .eq('user_id', userId)
        .not('archivedAt', 'is', null);

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true, wishLists: data };
}

export const getUnarchivedWishListsQuery = async (userId: string): Promise<{ success: true, wishLists: WishList[] } | { success: false, errorCode: "unknown" }> => {
    const { data, error } = await supabase
        .from('wish-lists')
        .select('*')
        .eq('user_id', userId)
        .is('archivedAt', 'null');

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true, wishLists: data };
}