import { NotificationData } from "src/app/envy/types/Notification";
import { NotificationType } from "src/app/envy/types/NotificationSetting";
import { createListArchivedNotification } from "./createListArchivedNotification";
import { createListFollowedNotification } from "./createListFollowedNotification";
import { createWishBookedNotification } from "./createWishBookedNotification";
import { createWishAddedNotification } from "./createWishAddedNotification";

export const createNotifications = async ({ notificationData }: { notificationData: NotificationData }) => {
    const notificationRecord: Record<
        NotificationType,
        ((notificationData: NotificationData) => Promise<void>)
    > = {
        [NotificationType.LIST_ARCHIVED]: createListArchivedNotification,
        [NotificationType.LIST_FOLLOWED]: createListFollowedNotification,
        [NotificationType.WISH_BOOKED]: createWishBookedNotification,
        [NotificationType.WISH_ADDED]: createWishAddedNotification,
    }

    await notificationRecord[notificationData.type](notificationData);
}