import { createSupabase } from "src/lib/supabase-server"
import { generateWishListQuery } from "./generateWishListQuery"
import { createNotifications } from "src/app/api/notification/createNotification/createNotifications";
import { NotificationType } from "../../types/NotificationSetting";

export const getServerWishListQuery = async () => {
    const supabase = await createSupabase();
    const generated = generateWishListQuery(supabase);
    return {
        ...generated,
        followList: async (wishListId: number, userId: string): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
            const res = await generated.followList(wishListId, userId)

            if (!res.success) return { success: false, errorCode: "unknown" }

            await createNotifications({
                notificationData: {
                    type: NotificationType.LIST_FOLLOWED,
                    followedListId: wishListId,
                    followerId: userId
                }
            })

            return { success: true };
        },
    }
}
