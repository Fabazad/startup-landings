import { NotificationType } from "./NotificationSetting";
import { z } from "zod";

export const baseNotificationSchema = z.object({
    id: z.number(),
    createdAt: z.date(),
    userId: z.string(),
});
export type BaseNotification = z.infer<typeof baseNotificationSchema>;

export const listFollowNotificationSchema = baseNotificationSchema.extend({
    seen: z.boolean(),
    type: z.enum([NotificationType.LIST_FOLLOWED]),
    data: z.object({
        listId: z.number(),
        userId: z.string(),
    })
});
export type ListFollowNotification = z.infer<typeof listFollowNotificationSchema>;

export const wishBookedNotificationSchema = baseNotificationSchema.extend({
    seen: z.boolean(),
    type: z.enum([NotificationType.WISH_BOOKED]),
    data: z.object({
        wishId: z.number(),
    })
});
export type WishBookedNotification = z.infer<typeof wishBookedNotificationSchema>;


export const wishAddedNotificationSchema = baseNotificationSchema.extend({
    seen: z.boolean(),
    type: z.enum([NotificationType.WISH_ADDED]),
    data: z.object({
        wishId: z.number(),
    })
});
export type WishAddedNotification = z.infer<typeof wishAddedNotificationSchema>;

export const listArchivedNotificationSchema = baseNotificationSchema.extend({
    seen: z.boolean(),
    type: z.enum([NotificationType.LIST_ARCHIVED]),
    data: z.object({
        listId: z.number(),
    })
});
export type ListArchivedNotification = z.infer<typeof listArchivedNotificationSchema>;

export const notificationSchema = z.union([
    listFollowNotificationSchema,
    wishBookedNotificationSchema,
    wishAddedNotificationSchema,
    listArchivedNotificationSchema,
]);
export type Notification = z.infer<typeof notificationSchema>;


export const notificationDataSchema = z.union([
    listFollowNotificationSchema.omit({ id: true, createdAt: true, seen: true, userId: true }),
    wishBookedNotificationSchema.omit({ id: true, createdAt: true, seen: true, userId: true }),
    wishAddedNotificationSchema.omit({ id: true, createdAt: true, seen: true, userId: true }),
    listArchivedNotificationSchema.omit({ id: true, createdAt: true, seen: true, userId: true }),
]);
export type NotificationData = z.infer<typeof notificationDataSchema>;
