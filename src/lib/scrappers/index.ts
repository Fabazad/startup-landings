import { scrapAll } from "./all";

export const scrapUrl = async (url: string): Promise<{ title?: string; price?: number; imageUrls?: string[] } | null> => {
    const data = await scrapAll(url);

    if (!data.success) return null;

    return data.data || null;

}