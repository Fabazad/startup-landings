import { SupabaseClient } from "@supabase/supabase-js";
import { NotificationData } from "../../types/Notification";
import axios from "axios";


export const generateNotificationQueries = (supabase: SupabaseClient) => ({
    createNotification: async (notificationData: NotificationData): Promise<
        { success: true } |
        { success: false, error: string }> => {

        const res = await axios.post('/api/notification', notificationData);

        if (res.status !== 200) {
            return { success: false, error: res.data.error };
        }

        return { success: true };

    },
})