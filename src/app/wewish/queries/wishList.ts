import { supabase } from "src/lib/supabase-client";
import { WishList } from "../types/WishList";

export const getWishListQuery = async (wishListId: number, userId?: string): Promise<{ success: true, wishList?: WishList } | { success: false, errorCode: "unknown" }> => {
    const { data, error } = await supabase
        .from('wish-lists')
        .select('*, wishes(count)')
        .eq('id', wishListId)
        .maybeSingle<Omit<WishList, 'isFollowedByMe' | 'wishCount'> & { wishes: [{ count: number }] } | undefined>();

    if (error) return { success: false, errorCode: "unknown" };
    if (!data) return { success: true, wishList: undefined };

    const wishCount = data.wishes?.[0]?.count ?? 0;

    if (!userId) return { success: true, wishList: { ...data, isFollowedByMe: false, wishCount } };

    const { data: listFollows, error: errorListFollows } = await supabase
        .from('list_follows')
        .select('*')
        .eq('listId', wishListId)
        .eq('userId', userId)
        .maybeSingle();

    if (errorListFollows) return { success: false, errorCode: "unknown" };

    if (!listFollows) return { success: true, wishList: { ...data, isFollowedByMe: false, wishCount } };

    return { success: true, wishList: { ...data, isFollowedByMe: true, wishCount } };
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
        .select('*, wishes(count)')
        .eq('user_id', userId);

    if (error) return { success: false, errorCode: "unknown" };
    const wishLists = data.map((list: any) => ({
        ...list,
        wishCount: list.wishes?.[0]?.count ?? 0,
        isFollowedByMe: false
    }));
    return { success: true, wishLists };
}

export const getArchivedWishListsQuery = async (userId: string): Promise<{ success: true, wishLists: WishList[] } | { success: false, errorCode: "unknown" }> => {
    const { data, error } = await supabase
        .from('wish-lists')
        .select('*, wishes(count)')
        .eq('user_id', userId)
        .not('archivedAt', 'is', null)
        .order('archivedAt', { ascending: false });

    if (error) return { success: false, errorCode: "unknown" };
    const wishLists = data.map((list: any) => ({
        ...list,
        wishCount: list.wishes?.[0]?.count ?? 0,
        isFollowedByMe: false
    }));
    return { success: true, wishLists };
}

export const getUnarchivedWishListsQuery = async (userId: string): Promise<{ success: true, wishLists: WishList[] } | { success: false, errorCode: "unknown" }> => {
    const { data, error } = await supabase
        .from('wish-lists')
        .select('*, wishes(count)')
        .eq('user_id', userId)
        .is('archivedAt', 'null')
        .order('created_at', { ascending: false });

    if (error) return { success: false, errorCode: "unknown" };
    const wishLists = data.map((list: any) => ({
        ...list,
        wishCount: list.wishes?.[0]?.count ?? 0,
        isFollowedByMe: false
    }));
    return { success: true, wishLists };
}

export const followListQuery = async (wishListId: number, userId: string): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {

    const { error } = await supabase
        .from('list_follows')
        .insert({ listId: wishListId, userId })
        .order('created_at', { ascending: false });

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true };
}

export const unfollowListQuery = async (wishListId: number, userId: string): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {

    const { error } = await supabase
        .from('list_follows')
        .delete()
        .eq('listId', wishListId)
        .eq('userId', userId)

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true };
}

export const getFollowedWishListsQuery = async (userId: string): Promise<{ success: true, wishLists: WishList[] } | { success: false, errorCode: "unknown" }> => {
    const { data, error } = await supabase
        .from('wish-lists')
        .select('*, wishes(count), list_follows!inner(userId)')
        .eq('list_follows.userId', userId)
        .is('archivedAt', 'null')
        .order('created_at', { ascending: false });

    if (error) return { success: false, errorCode: "unknown" };
    const wishLists = data.map((list: any) => ({
        ...list,
        wishCount: list.wishes?.[0]?.count ?? 0,
        isFollowedByMe: true
    }));
    return { success: true, wishLists };
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
