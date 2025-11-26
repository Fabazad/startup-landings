import { z } from "zod";

export const wishSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    price: z.number().optional(),
    isFavorite: z.boolean(),
    isSecondHand: z.boolean(),
    acceptEquivalent: z.boolean(),
    bookedByUser: z.number().nullish(),
    bookedByName: z.string().nullish(),
});

export type Wish = z.infer<typeof wishSchema>;
