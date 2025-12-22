import { supabase } from "src/lib/supabase-client"
import { generateNotificationQueries } from "./generate"
import axios from "axios"
import { NotificationData } from "../../types/Notification"


export const getClientNotificationQueries = () => {
    return {
        ...generateNotificationQueries(supabase), createNotification: async (notificationData: NotificationData) => {
            const res = await axios.post('/api/notification', notificationData);

            if (res.status !== 200) {
                return { success: false, error: res.data.error };
            }

            return { success: true };
        }
    }
}