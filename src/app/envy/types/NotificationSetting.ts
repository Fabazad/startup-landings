export enum NotificationType {
    LIST_FOLLOWED = 'list_followed',
    WISH_BOOKED = 'wish_booked',
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
