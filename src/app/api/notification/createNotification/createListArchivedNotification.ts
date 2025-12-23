import { Resend } from "resend";
import { getServerNotificationSettingsQueries } from "src/app/envy/queries/notificationSettings/server";
import { getServerWishListQuery } from "src/app/envy/queries/wishList/server";
import { NotificationData } from "src/app/envy/types/Notification";
import { NotificationType } from "src/app/envy/types/NotificationSetting";
import { CONFIG } from "src/config-global";

const resend = new Resend(CONFIG.resend.apiKey);

export const createListArchivedNotification = async (
    notificationData: NotificationData,
): Promise<void> => {
    if (notificationData.type !== NotificationType.LIST_ARCHIVED) throw new Error('Invalid notification type');
    const wishListQueries = await getServerWishListQuery();

    const wishListRes = await wishListQueries.getWishList(notificationData.data.listId);
    if (!wishListRes.success) throw new Error(wishListRes.error);
    if (!wishListRes.wishList) throw new Error('Wish list not found');

    const listOwnerName = wishListRes.wishList.user.display_name;

    const { wishList: archivedWishList } = wishListRes;

    const followersRes = await wishListQueries.getFollowers(archivedWishList.id);
    if (!followersRes.success) throw new Error(followersRes.error);
    const followers = followersRes.followers;

    if (!followers.length) return;
    const { getNotificationSetting } = await getServerNotificationSettingsQueries();
    // TO IMPROVE - batch of promise all
    await Promise.all(followers.map(async (follower) => {
        const notificationSettingsRes = await getNotificationSetting(follower, NotificationType.LIST_ARCHIVED);
        if (!notificationSettingsRes.success) throw new Error(notificationSettingsRes.error);
        if (!notificationSettingsRes.notificationSetting) throw new Error('Notification setting not found');
        const { notificationSetting } = notificationSettingsRes;

    }))
}
