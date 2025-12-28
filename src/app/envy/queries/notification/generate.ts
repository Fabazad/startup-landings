import { SupabaseClient } from "@supabase/supabase-js";
import { NotificationData } from "../../types/Notification";
import { Notification } from "../../types/Notification";


export const generateNotificationQueries = (supabase: SupabaseClient) => ({
    createNotification: async (notificationData: NotificationData, userId: string): Promise<
        { success: true } |
        { success: false, error: string }> => {

        try {
            const { data, error } = await supabase.from('notifications').insert({ ...notificationData, seen: false, user_id: userId });
            if (error) {
                return { success: false, error: error.message };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    },
    getNotifications: async (userId: string): Promise<Notification[]> => {
        const followerJoin = 'follower:profiles!notifications_followerId_fkey(id,displayName:display_name,avatarUrl:avatar_url)';
        const followedListJoin = 'followedList:"wish-lists"!notifications_followedListId_fkey(id,name)';
        const bookedWishJoin = 'bookedWish:"wishes"(id,name,wishList:"wish-lists"(id,name))';
        const bookerJoin = 'booker:profiles!notifications_bookerId_fkey(id,displayName:display_name,avatarUrl:avatar_url)';
        const archivedListJoin = 'archivedList:"wish-lists"!notifications_archivedListId_fkey(id,name,user:"profiles"(id,displayName:display_name,avatarUrl:avatar_url))';

        const { data, error } = await supabase.from('notifications')
            .select(`*, ${followedListJoin}, ${followerJoin}, ${bookedWishJoin}, ${bookerJoin}, ${archivedListJoin}`)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error) return [];
        console.log(data)
        return data;
    },
    seeAllNotifications: async (userId: string): Promise<{ success: true } | { success: false, error: string }> => {
        try {
            const { data, error } = await supabase.from('notifications').update({ seen: true }).eq('user_id', userId).eq('seen', false);
            if (error) return { success: false, error: error.message };
        } catch (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    }
})