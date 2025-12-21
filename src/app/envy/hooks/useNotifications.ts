import { Notification } from "src/app/envy/types/Notification";
import { NotificationType } from "../types/NotificationSetting";

export const useNotifications = (): { notifications: Notification[], isLoading: boolean } => {
    return {
        notifications: [{
            id: 1,
            createdAt: new Date(),
            seen: false,
            type: NotificationType.LIST_FOLLOWED,
            data: {
                listId: 1,
                listName: "List 1",
                userId: "1",
                userName: "User 1",
            }
        }], isLoading: false
    }
}