import { Resend } from "resend";
import { getServerNotificationQueries } from "src/app/envy/queries/notification/server";
import { getServerNotificationSettingsQueries } from "src/app/envy/queries/notificationSettings/server";
import { getUserEmailQueryAdmin, getUserName } from "src/app/envy/queries/user/admin";
import { getServerWishListQuery } from "src/app/envy/queries/wishList/server";
import { NotificationData } from "src/app/envy/types/Notification";
import { NotificationSetting, NotificationType } from "src/app/envy/types/NotificationSetting";
import { CONFIG } from "src/config-global";
import { ListFollowedNotification } from "src/emails/ListFollowedNotification";
import { paths } from "src/routes/paths";

const resend = new Resend(CONFIG.resend.apiKey);

export const createListFollowedNotification = async (
    notificationData: NotificationData,
): Promise<void> => {
    if (notificationData.type !== NotificationType.LIST_FOLLOWED) throw new Error('Invalid notification type');
    const wisListQueries = await getServerWishListQuery();
    const listRes = await wisListQueries.getWishList(notificationData.followedListId);
    if (!listRes.success) throw listRes.error;
    if (!listRes.wishList) throw new Error('List not found');

    const list = listRes.wishList;
    const targetUserId = list.user.id;

    const notificationSettingsQueries = await getServerNotificationSettingsQueries();
    const userNotificationSetting = await notificationSettingsQueries.getNotificationSetting(targetUserId, notificationData.type);
    if (!userNotificationSetting.success) throw new Error(userNotificationSetting.error);
    const { notificationSetting } = userNotificationSetting;

    if (notificationSetting.inApp) {
        const notificationQueries = await getServerNotificationQueries();
        const res = await notificationQueries.createNotification(notificationData, targetUserId);
        if (!res.success) throw new Error(res.error);
    }
    if (notificationSetting.email) {
        const targetUserRes = await getUserEmailQueryAdmin(targetUserId);
        if (!targetUserRes.success) throw targetUserRes.error;
        if (!targetUserRes.email) throw new Error('User not found');
        const targetEmail = targetUserRes.email;

        const followerRes = await getUserName(notificationData.followerId);
        if (!followerRes.success) throw new Error(followerRes.error);
        const followerName = followerRes.name;

        const { error } = await resend.emails.send({
            from: `Envy <no-reply@onama.io>`,
            to: targetEmail,
            subject: "Quelqu'un suit votre liste sur Envy",
            html: ListFollowedNotification({
                followerName,
                listName: list.name,
                listUrl: `https://envy.onama.io${paths.envy.wishList.detail(list.id)}`,
            }),
        });
        if (error) throw new Error(error.message);
    }
}
