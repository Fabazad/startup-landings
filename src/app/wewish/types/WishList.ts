import { z } from "zod";

export const wishListSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
});

export type WishList = z.infer<typeof wishListSchema>;