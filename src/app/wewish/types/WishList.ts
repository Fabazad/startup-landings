import { z } from "zod";
import { wishSchema } from "./Wish";

export const wishListSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    wishes: z.array(wishSchema),
});

export type WishList = z.infer<typeof wishListSchema>;