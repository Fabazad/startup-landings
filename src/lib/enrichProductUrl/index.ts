import { EnrichmentMethod } from "./type";
import { amazonEnrichment } from "./amazon";

const enrichmentMethods: Array<EnrichmentMethod> = [
    amazonEnrichment,
];

export const enrichProductUrl = (productUrl: string): string => {
    return enrichmentMethods.reverse().reduce<string>((currUrl, method) => {
        const enrichedUrl = method(currUrl);
        if (enrichedUrl !== undefined) return enrichedUrl;
        return currUrl;
    }, productUrl);
}