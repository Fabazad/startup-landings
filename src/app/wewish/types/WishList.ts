import { z } from "zod";

export const wishListSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    archivedAt: z.date().nullable(),
    user: z.object({
        id: z.string(),
        display_name: z.string(),
        avatar_url: z.string(),
    }),
    isFollowedByMe: z.boolean(),
    wishCount: z.number(),
    imageUrl: z.string().optional(),
    created_at: z.date(),
});

export type WishList = z.infer<typeof wishListSchema>;