export enum NotificationType {
    LIST_FOLLOWED = 'list_follow',
    WISH_BOOKED = 'wish_booking',
    WISH_ADDED = 'wish_added',
    LIST_ARCHIVED = 'list_archived'
}

export type NotificationSetting = {
    id: number;
    userId: string;
    type: NotificationType;
    email: boolean;
    push: boolean;
    inApp: boolean;
}
