import { z } from "zod";

export const wishSchema = z.object({
    id: z.number(),
    productUrl: z.string().optional(),
    name: z.string(),
    description: z.string().optional(),
    price: z.number().optional(),
    isFavorite: z.boolean(),
    isSecondHand: z.boolean(),
    acceptEquivalent: z.boolean(),
    bookedByUser: z.object({ id: z.number(), full_name: z.string() }).optional(),
    bookedByName: z.string().nullish(),
});

export type Wish = z.infer<typeof wishSchema>;
