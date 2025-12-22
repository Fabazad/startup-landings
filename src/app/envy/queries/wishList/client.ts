import { supabase } from "src/lib/supabase-client"
import { generateWishListQuery } from "./generateWishListQuery"
import axios from "axios"
import { getClientNotificationQueries } from "../notification/client"
import { NotificationType } from "../../types/NotificationSetting"

export const getClientWishListQuery = () => {
    const generated = generateWishListQuery(supabase)
    return {
        ...generated,
        followList: async (wishListId: number, userId: string): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
            const res = await generated.followList(wishListId, userId)

            if (!res.success) return { success: false, errorCode: "unknown" }

            const notificationQueries = getClientNotificationQueries();
            await notificationQueries.sendNotification({
                type: NotificationType.LIST_FOLLOWED,
                data: { listId: wishListId, userId }
            });

            return { success: true };
        },
    }
}