import { NotificationType } from "./NotificationSetting";
import { z } from "zod";

export const baseNotificationSchema = z.object({
    id: z.number(),
    createdAt: z.date(),
    userId: z.string(),
});
export type BaseNotification = z.infer<typeof baseNotificationSchema>;


// List Followed

export const listFollowNotificationDataSchema = z.object({
    type: z.enum([NotificationType.LIST_FOLLOWED]),
    followedListId: z.number(),
    followerId: z.string(),
});
export type ListFollowNotificationData = z.infer<typeof listFollowNotificationDataSchema>;

export const listFollowNotificationSchema = baseNotificationSchema.extend({
    seen: z.boolean(),
    type: z.enum([NotificationType.LIST_FOLLOWED]),
    followedList: z.object({
        id: z.number(),
        name: z.string(),
    }),
    follower: z.object({
        id: z.string(),
        displayName: z.string(),
        avatarUrl: z.string().optional(),
    }),
});
export type ListFollowNotification = z.infer<typeof listFollowNotificationSchema>;

// Wish Booked

export const wishBookedNotificationDataSchema = z.object({
    type: z.enum([NotificationType.WISH_BOOKED]),
    bookedWishId: z.number(),
    bookerId: z.string().optional(),
});
export type WishBookedNotificationData = z.infer<typeof wishBookedNotificationDataSchema>;

export const wishBookedNotificationSchema = baseNotificationSchema.extend({
    seen: z.boolean(),
    type: z.enum([NotificationType.WISH_BOOKED]),
    bookedWishId: z.number(),
    bookedWish: z.object({
        id: z.number(),
        name: z.string(),
        wishList: z.object({
            id: z.number(),
            name: z.string(),
        }),
    }),
    booker: z.object({
        id: z.string(),
        displayName: z.string(),
        avatarUrl: z.string().optional(),
    }).optional()
});
export type WishBookedNotification = z.infer<typeof wishBookedNotificationSchema>;

// List Archived

export const listArchivedNotificationDataSchema = z.object({
    type: z.enum([NotificationType.LIST_ARCHIVED]),
    archivedListId: z.number(),
});
export type ListArchivedNotificationData = z.infer<typeof listArchivedNotificationDataSchema>;

export const listArchivedNotificationSchema = baseNotificationSchema.extend({
    seen: z.boolean(),
    type: z.enum([NotificationType.LIST_ARCHIVED]),
    archivedList: z.object({
        id: z.number(),
        name: z.string(),
        user: z.object({
            id: z.string(),
            displayName: z.string(),
            avatarUrl: z.string().optional(),
        }),
    }),
});
export type ListArchivedNotification = z.infer<typeof listArchivedNotificationSchema>;

// Notification Union

export const notificationSchema = z.union([
    listFollowNotificationSchema,
    wishBookedNotificationSchema,
    listArchivedNotificationSchema,
]);
export type Notification = z.infer<typeof notificationSchema>;

export const notificationDataSchema = z.union([
    listFollowNotificationDataSchema,
    wishBookedNotificationDataSchema,
    listArchivedNotificationDataSchema,
]);
export type NotificationData = z.infer<typeof notificationDataSchema>;
