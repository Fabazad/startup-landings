import { Resend } from "resend";
import { getServerNotificationSettingsQueries } from "src/app/envy/queries/notificationSettings/server";
import { getServerWishListQuery } from "src/app/envy/queries/wishList/server";
import { NotificationData } from "src/app/envy/types/Notification";
import { NotificationType } from "src/app/envy/types/NotificationSetting";
import { CONFIG } from "src/config-global";
import { ListArchivedNotification } from "src/emails/ListArchivedNotification";
import { paths } from "src/routes/paths";
import { getUserEmailQueryAdmin } from "src/app/envy/queries/user/admin";
import { getServerNotificationQueries } from "src/app/envy/queries/notification/server";

const resend = new Resend(CONFIG.resend.apiKey);

export const createListArchivedNotification = async (
    notificationData: NotificationData,
): Promise<void> => {
    if (notificationData.type !== NotificationType.LIST_ARCHIVED) throw new Error('Invalid notification type');
    const wishListQueries = await getServerWishListQuery();

    const wishListRes = await wishListQueries.getWishList(notificationData.archivedListId);
    if (!wishListRes.success) throw new Error(wishListRes.error);
    if (!wishListRes.wishList) throw new Error('Wish list not found');

    const listOwnerName = wishListRes.wishList.user.display_name;

    const { wishList: archivedWishList } = wishListRes;

    const followersRes = await wishListQueries.getFollowersIds(archivedWishList.id);
    if (!followersRes.success) throw new Error(followersRes.error);
    const followersIds = followersRes.followersIds;

    if (!followersIds.length) return;
    const { getNotificationSetting } = await getServerNotificationSettingsQueries();

    // TO IMPROVE - batch of promise all
    await Promise.all(followersIds.map(async (followerId) => {
        const notificationSettingsRes = await getNotificationSetting(followerId, NotificationType.LIST_ARCHIVED);
        if (!notificationSettingsRes.success) throw new Error(notificationSettingsRes.error);
        const { notificationSetting } = notificationSettingsRes;

        if (notificationSetting.inApp) {
            const { createNotification } = await getServerNotificationQueries();
            await createNotification(notificationData, followerId);
        }

        if (notificationSetting.email) {
            const userRes = await getUserEmailQueryAdmin(followerId);
            if (!userRes.success) throw new Error(userRes.error);
            const { email } = userRes;
            await resend.emails.send({
                from: 'Envy <envy@resend.dev>',
                to: email,
                subject: 'Une liste que vous suivez a été archivée',
                html: ListArchivedNotification({
                    listName: archivedWishList.name,
                    listOwnerName,
                    followedListUrl: `${CONFIG.serverUrl}${paths.envy.root}?tab=followed-lists`
                }),
            })
        }
    }))
}

