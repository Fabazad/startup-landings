import { NotificationType } from "./NotificationSetting";

type BaseNotification = {
    id: number;
    createdAt: Date;
}

export type ListFollowNotification = BaseNotification & {
    seen: boolean;
    type: NotificationType.LIST_FOLLOWED;
    data: {
        listId: number;
        listName: string;
        userId: string;
        userName: string;
    }
}

export type WishBookedNotification = BaseNotification & {
    seen: boolean;
    type: NotificationType.WISH_BOOKED;
    data: {
        listId: number;
        listName: string;
    }
}

export type WishAddedNotification = BaseNotification & {
    seen: boolean;
    type: NotificationType.WISH_ADDED;
    data: {
        wishId: number;
        wishName: string;
        listId: number;
        listName: string;
        userId: string;
        userName: string;
    }
}

export type ListArchivedNotification = BaseNotification & {
    seen: boolean;
    type: NotificationType.LIST_ARCHIVED;
    data: {
        listId: number;
        listName: string;
        userId: string;
        userName: string;
    }
}

export type Notification =
    ListFollowNotification |
    WishBookedNotification |
    WishAddedNotification |
    ListArchivedNotification;