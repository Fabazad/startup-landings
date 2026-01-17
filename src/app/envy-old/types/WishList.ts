import { z } from "zod";

export enum ListType {
    WISH_LIST = 'wish_list',
    CHRISTMAS = 'christmas',
    BIRTHDAY = 'birthday',
    BIRTH = 'birth',
    WEDDING = 'wedding',
    HOUSEWARMING = 'housewarming',
    BAPTISM = 'baptism',
}

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
    imageUrl: z.string(),
    created_at: z.date(),
    type: z.nativeEnum(ListType),
    isCollaborative: z.boolean(),
    fundraising: z.string().optional(),
});

export type WishList = z.infer<typeof wishListSchema>;