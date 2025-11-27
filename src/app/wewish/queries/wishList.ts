import { supabase } from "src/lib/supabase-client";
import { WishList } from "../types/WishList";

export const getWishListQuery = async (wishListId: number, userId?: string): Promise<{ success: true, wishList?: WishList } | { success: false, errorCode: "unknown" }> => {
    const { data, error } = await supabase
        .from('wish-lists')
        .select('*')
        .eq('id', wishListId)
        .maybeSingle<Omit<WishList, 'isFollowedByMe'> | undefined>();

    if (error) return { success: false, errorCode: "unknown" };
    if (!data) return { success: true, wishList: undefined };

    if (!userId) return { success: true, wishList: { ...data, isFollowedByMe: false } };

    const { data: listFollows, error: errorListFollows } = await supabase
        .from('list_follows')
        .select('*')
        .eq('listId', wishListId)
        .eq('userId', userId)
        .maybeSingle();

    if (errorListFollows) return { success: false, errorCode: "unknown" };

    if (!listFollows) return { success: true, wishList: { ...data, isFollowedByMe: false } };

    return { success: true, wishList: { ...data, isFollowedByMe: true } };
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

export const followListQuery = async (wishListId: number, userId: string): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {

    const { error } = await supabase
        .from('list_follows')
        .insert({ listId: wishListId, userId });

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true };
}

export const unfollowListQuery = async (wishListId: number, userId: string): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {

    const { error } = await supabase
        .from('list_follows')
        .delete()
        .eq('listId', wishListId)
        .eq('userId', userId);

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true };
}

export const getFollowedWishListsQuery = async (userId: string): Promise<{ success: true, wishLists: WishList[] } | { success: false, errorCode: "unknown" }> => {
    const { data, error } = await supabase
        .from('wish-lists')
        .select('*, list_follows!inner(userId)')
        .eq('list_follows.userId', userId)
        .is('archivedAt', 'null');

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true, wishLists: data };
}

export const hasWishListQuery = async (userId: string): Promise<{ success: true, hasWishList: boolean } | { success: false, errorCode: "unknown" }> => {
    const { data, error } = await supabase
        .from('wish-lists')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true, hasWishList: !!data };
}
