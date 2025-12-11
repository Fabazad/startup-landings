import * as cheerio from 'cheerio';

/**
 * Helper to find price in JSON-LD or Meta tags
 */
export const extractPriceAndImages = ($: cheerio.CheerioAPI) => {
    let price: number | undefined;
    let extraImages: string[] = [];

    // 1. Try to find price in JSON-LD (Schema.org) - The most reliable method
    $('script[type="application/ld+json"]').each((_, element) => {
        try {
            const html = $(element).html();
            if (!html) return;

            const data = JSON.parse(html);
            const graph = Array.isArray(data) ? data : (data['@graph'] || [data]);

            const product = graph.find((item: any) =>
                item['@type'] === 'Product' || item['@type'] === 'http://schema.org/Product'
            );

            if (product && product.offers) {
                const offer = Array.isArray(product.offers) ? product.offers[0] : product.offers;
                if (offer && offer.price) {
                    price = parseFloat(offer.price);
                }
            }
            // Attempt to find extra images in schema
            if (product && product.image) {
                if (Array.isArray(product.image)) extraImages.push(...product.image);
                else if (typeof product.image === 'string') extraImages.push(product.image);
            }
        } catch (e) {
            // Ignore parse errors
        }
    });

    // 2. Fallback: Meta tags (OpenGraph)
    if (!price) {
        const metaPrice = $('meta[property="product:price:amount"]').attr('content') ||
            $('meta[property="og:price:amount"]').attr('content');
        if (metaPrice) price = parseFloat(metaPrice);
    }

    // 3. Extract all OG images for a better gallery
    $('meta[property="og:image"]').each((_, el) => {
        const img = $(el).attr('content');
        if (img) extraImages.push(img);
    });

    return { price, extraImages };
};