import { EnrichmentMethod } from "./type";
import { CONFIG } from "src/config-global";


export const amazonEnrichment: EnrichmentMethod = (url) => {
    try {
        const urlObj = new URL(url);

        // Check if it's an Amazon France URL
        if (!urlObj.hostname.includes('amazon.fr')) {
            return undefined;
        }

        // Extract ASIN from the URL using regex
        // Amazon ASINs are 10 characters alphanumeric codes
        // Common URL patterns:
        // - /dp/ASIN
        // - /gp/product/ASIN
        // - /product/ASIN
        const asinMatch = url.match(/\/(?:dp|gp\/product|product)\/([A-Z0-9]{10})/i);

        if (!asinMatch || !asinMatch[1]) {
            return undefined;
        }

        const asin = asinMatch[1];

        // Create clean affiliation link
        return `https://www.amazon.fr/dp/${asin}?tag=${CONFIG.amazon.affiliateTag}`;
    } catch (error) {
        // Invalid URL
        return undefined;
    }
}