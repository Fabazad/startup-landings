import { CONFIG } from "src/config-global";
import { z } from "zod";

export const defaultWishImageUrl = `${CONFIG.assetsDir}/assets/images/mock/wish.svg`;

export const wishSchema = z.object({
    id: z.number(),
    productUrl: z.string().optional(),
    name: z.string(),
    description: z.string().optional(),
    price: z.number().optional(),
    isFavorite: z.boolean(),
    isSecondHand: z.boolean(),
    acceptEquivalent: z.boolean(),
    bookedByUser: z.object({ id: z.string(), display_name: z.string() }).optional(),
    bookedByName: z.string().nullish(),
    userId: z.string(),
    list: z.object({ id: z.number(), name: z.string() }),
    imageUrl: z.string().optional(),
    imageUrls: z.array(z.string()).optional(),
});

export type Wish = z.infer<typeof wishSchema>;
