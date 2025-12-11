export type ScrapResult = {
    title?: string;
    price?: number;
    imageUrls?: string[];
}

export type ScrapperReturnType = { success: true; data: ScrapResult } | { success: false; error: string }

export type Scrapper = (url: string) => Promise<ScrapperReturnType>

export const hasAllData = (data: ScrapResult): boolean => {
    return !!(data.title && data.price && data.imageUrls);
}