import { Resend } from "resend";
import { getServerNotificationQueries } from "src/app/envy/queries/notification/server";
import { getUserEmailQueryAdmin } from "src/app/envy/queries/user/admin";
import { getServerWishListQuery } from "src/app/envy/queries/wishList/server";
import { NotificationData } from "src/app/envy/types/Notification";
import { NotificationSetting, NotificationType } from "src/app/envy/types/NotificationSetting";
import { CONFIG } from "src/config-global";

const resend = new Resend(CONFIG.resend.apiKey);

export const createListFollowedNotification = async (
    notificationData: NotificationData,
    userNotificationSetting: NotificationSetting
): Promise<void> => {
    if (notificationData.type !== NotificationType.LIST_FOLLOWED) throw new Error('Invalid notification type');
    const wisListQueries = await getServerWishListQuery();
    const listRes = await wisListQueries.getWishList(notificationData.data.listId);
    if (!listRes.success) throw listRes.error;
    if (!listRes.wishList) throw new Error('List not found');

    const list = listRes.wishList;
    const targetUrseId = list.user.id;

    const userRes = await getUserEmailQueryAdmin(targetUrseId);
    if (!userRes.success) throw userRes.error;
    if (!userRes.email) throw new Error('User not found');

    const targetEmail = userRes.email;

    if (userNotificationSetting.inApp) {
        const notificationQueries = await getServerNotificationQueries();
        const res = await notificationQueries.createNotification({
            type: NotificationType.LIST_FOLLOWED,
            data: notificationData.data
        }, targetUrseId);
        if (!res.success) throw new Error(res.error);
    }
    if (userNotificationSetting.email) {
        const { error } = await resend.emails.send({
            from: `Envy <no-reply@onama.io>`,
            to: targetEmail,
            subject: "Quelqu'un a suivi votre liste sur Envy",
            html: `Quelqu'un a suivi votre liste ${list.name} sur Envy`,
        });
        if (error) throw new Error(error.message);
    }
}
