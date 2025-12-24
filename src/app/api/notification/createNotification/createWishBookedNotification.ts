import { Resend } from "resend";
import { getServerNotificationQueries } from "src/app/envy/queries/notification/server";
import { getServerNotificationSettingsQueries } from "src/app/envy/queries/notificationSettings/server";
import { getUserEmailQueryAdmin } from "src/app/envy/queries/user/admin";
import { getServerWishQueries } from "src/app/envy/queries/wish/server";
import { getServerWishListQuery } from "src/app/envy/queries/wishList/server";
import { NotificationData } from "src/app/envy/types/Notification";
import { NotificationType } from "src/app/envy/types/NotificationSetting";
import { CONFIG } from "src/config-global";
import { WishBookedNotification } from "src/emails/WishBookedNotification";
import { paths } from "src/routes/paths";

const resend = new Resend(CONFIG.resend.apiKey);

export const createWishBookedNotification = async (
    notificationData: NotificationData,
): Promise<void> => {
    if (notificationData.type !== NotificationType.WISH_BOOKED) throw new Error('Invalid notification type');
    const wishQueries = await getServerWishQueries();

    const wishRes = await wishQueries.getWishQuery(notificationData.bookedWishId);
    if (!wishRes.success) throw new Error(wishRes.errorCode);
    if (!wishRes.wish) throw new Error('Wish not found');

    const { wish } = wishRes;
    const targetUserId = wish.userId;

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

        const wishListQuery = await getServerWishListQuery();
        const wishListRes = await wishListQuery.getWishList(wish.list.id);
        if (!wishListRes.success) throw new Error(wishListRes.error);
        if (!wishListRes.wishList) throw new Error('Wish list not found');

        const listName = wishListRes.wishList.name;
        const listUrl = `https://envy.onama.io${paths.envy.wishList.detail(wishListRes.wishList.id)}`;

        const { error } = await resend.emails.send({
            from: `Envy <no-reply@onama.io>`,
            to: targetEmail,
            subject: "Quelqu'un a réserver une de vos envies sur Envy",
            html: WishBookedNotification({ listName, listUrl })
        });
        if (error) throw new Error(error.message);
    }
}
