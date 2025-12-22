import { SupabaseClient } from "@supabase/supabase-js";
import { WishList } from "../../types/WishList";
import { getClientNotificationQueries } from "../notification/client";
import { NotificationType } from "../../types/NotificationSetting";

export const generateWishListQuery = (supabase: SupabaseClient) => ({
    getWishList: async (wishListId: number, userId?: string): Promise<{ success: true, wishList?: WishList } | { success: false, errorCode: "unknown" }> => {
        const { data, error } = await supabase
            .from('wish-lists')
            .select('*, wishes(count), user_id:profiles(id,display_name,avatar_url)')
            .eq('id', wishListId)
            .maybeSingle<Omit<WishList, 'isFollowedByMe' | 'wishCount'> & { wishes: [{ count: number }] } & { user_id: { id: string, display_name: string, avatar_url: string } } | undefined>();

        if (error) return { success: false, errorCode: "unknown" };
        if (!data) return { success: true, wishList: undefined };

        const wishCount = data.wishes?.[0]?.count ?? 0;
        const user = data.user_id;

        if (!userId) return { success: true, wishList: { ...data, isFollowedByMe: false, wishCount, user } };

        const { data: listFollows, error: errorListFollows } = await supabase
            .from('list_follows')
            .select('*')
            .eq('listId', wishListId)
            .eq('userId', userId)
            .maybeSingle();

        if (errorListFollows) return { success: false, errorCode: "unknown" };

        if (!listFollows) return { success: true, wishList: { ...data, isFollowedByMe: false, wishCount, user } };

        return { success: true, wishList: { ...data, isFollowedByMe: true, wishCount, user } };
    },
    archiveWishList: async (wishListId: number): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
        const { error } = await supabase
            .from('wish-lists')
            .update({ archivedAt: new Date() })
            .eq('id', wishListId);

        if (error) return { success: false, errorCode: "unknown" };

        const notificationQueries = getClientNotificationQueries();
        await notificationQueries.createNotification({
            type: NotificationType.LIST_ARCHIVED,
            data: { listId: wishListId }
        });
        return { success: true };
    },
    unarchiveWishList: async (wishListId: number): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
        const { error } = await supabase
            .from('wish-lists')
            .update({ archivedAt: null })
            .eq('id', wishListId);

        if (error) return { success: false, errorCode: "unknown" };
        return { success: true };
    },
    deleteWishList: async (wishListId: number): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
        const { error } = await supabase
            .from('wish-lists')
            .delete()
            .eq('id', wishListId);

        if (error) return { success: false, errorCode: "unknown" };
        return { success: true };
    },
    getUserWishLists: async (userId: string): Promise<{ success: true, wishLists: WishList[] } | { success: false, errorCode: "unknown" }> => {
        const { data, error } = await supabase
            .from('wish-lists')
            .select('*, wishes(count), user_id:profiles(id,display_name,avatar_url)')
            .eq('user_id', userId);

        if (error) return { success: false, errorCode: "unknown" };
        const wishLists = data.map((list: any) => ({
            ...list,
            wishCount: list.wishes?.[0]?.count ?? 0,
            isFollowedByMe: false,
            user: list.user_id
        }));
        return { success: true, wishLists };
    },
    getArchivedWishLists: async (userId: string): Promise<{ success: true, wishLists: WishList[] } | { success: false, errorCode: "unknown" }> => {
        const { data, error } = await supabase
            .from('wish-lists')
            .select('*, wishes(count), user_id:profiles(id,display_name,avatar_url)')
            .eq('user_id', userId)
            .not('archivedAt', 'is', null)
            .order('archivedAt', { ascending: false });

        if (error) return { success: false, errorCode: "unknown" };
        const wishLists = data.map((list: any) => ({
            ...list,
            wishCount: list.wishes?.[0]?.count ?? 0,
            isFollowedByMe: false,
            user: list.user_id
        }));
        return { success: true, wishLists };
    },
    getUnarchivedWishLists: async (userId: string): Promise<{ success: true, wishLists: WishList[] } | { success: false, errorCode: "unknown" }> => {
        const { data, error } = await supabase
            .from('wish-lists')
            .select('*, wishes(count), user_id:profiles(id,display_name,avatar_url)')
            .eq('user_id', userId)
            .is('archivedAt', 'null')
            .order('created_at', { ascending: false });

        if (error) return { success: false, errorCode: "unknown" };
        const wishLists = data.map((list: any) => ({
            ...list,
            wishCount: list.wishes?.[0]?.count ?? 0,
            isFollowedByMe: false,
            user: list.user_id
        }));
        return { success: true, wishLists };
    },
    followList: async (wishListId: number, userId: string): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
        const { error } = await supabase
            .from('list_follows')
            .insert({ listId: wishListId, userId })
            .order('created_at', { ascending: false });

        if (error) return { success: false, errorCode: "unknown" };

        const notificationQueries = getClientNotificationQueries();
        await notificationQueries.createNotification({
            type: NotificationType.LIST_FOLLOWED,
            data: {
                listId: wishListId,
                userId
            }
        });

        return { success: true };
    },
    unfollowList: async (wishListId: number, userId: string): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {

        const { error } = await supabase
            .from('list_follows')
            .delete()
            .eq('listId', wishListId)
            .eq('userId', userId)

        if (error) return { success: false, errorCode: "unknown" };
        return { success: true };
    },
    getFollowedWishLists: async (userId: string): Promise<{ success: true, wishLists: WishList[] } | { success: false, errorCode: "unknown" }> => {
        const { data, error } = await supabase
            .from('wish-lists')
            .select('*, wishes(count), list_follows!inner(userId), user_id:profiles(id,display_name,avatar_url)')
            .eq('list_follows.userId', userId)
            .is('archivedAt', 'null')
            .order('created_at', { ascending: false });

        if (error) return { success: false, errorCode: "unknown" };
        const wishLists = data.map((list: any) => ({
            ...list,
            wishCount: list.wishes?.[0]?.count ?? 0,
            isFollowedByMe: true,
            user: list.user_id
        }));
        return { success: true, wishLists };
    },
    hasWishList: async (userId: string): Promise<{ success: true, hasWishList: boolean } | { success: false, errorCode: "unknown" }> => {
        const { data, error } = await supabase
            .from('wish-lists')
            .select('*')
            .eq('user_id', userId)
            .maybeSingle();

        if (error) return { success: false, errorCode: "unknown" };
        return { success: true, hasWishList: !!data };
    }
})