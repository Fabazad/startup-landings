import { scrapAll } from "./all";

export const scrapUrl = async (url: string): Promise<{ title?: string; price?: number; imageUrls?: string[] } | null> => {
    const res = await scrapAll(url);

    if (!res.success) return null;

    return res.data;

}