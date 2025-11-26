import metascraper from 'metascraper';
import metascraperImage from 'metascraper-image';
import metascraperTitle from 'metascraper-title';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Initialize the scraper with the specific rules we need
const scraper = metascraper([
    metascraperImage(),
    metascraperTitle(),
]);

/**
 * Helper to find price in JSON-LD or Meta tags
 */
const extractPriceAndImages = ($: cheerio.CheerioAPI) => {
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

export const scrapAll = async (url: string): Promise<
    { success: false; errorCode: string; errorMessage: string } |
    { success: true; data: { title?: string; price?: number; imageUrls?: string[] } }> => {
    try {

        // 1. Fetch the HTML
        const { data: html } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
            },
            timeout: 10000
        });

        // 2. Load Cheerio for custom extraction
        const $ = cheerio.load(html);

        // 3. Run Standard Metascraper (Best for Title and Main Image)
        const metadata = await scraper({ html, url });

        // 4. Run Custom Logic (Best for Price and Gallery Images)
        const { price, extraImages } = extractPriceAndImages($);

        console.log(metadata, price, extraImages);


        // 6. Merge Image Sources (Deduplicate)
        const images = new Set<string>();
        if (metadata.image) images.add(metadata.image);
        extraImages.forEach(img => images.add(img));

        // 7. Return Data
        return {
            success: true,
            data: {
                title: metadata.title,
                price: price,
                imageUrls: Array.from(images)
            }
        };

    } catch (error: any) {
        console.error('Scraping Error:', error.message);

        return {
            success: false,
            errorCode: "unknown_error",
            errorMessage: "Failed to scrape the URL. The site might be blocking bots or the URL is invalid."
        };
    }
}