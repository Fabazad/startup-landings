import { Scrapper } from "../Scrapper.type";
import metascraper from 'metascraper';
import metascraperImage from 'metascraper-image';
import metascraperTitle from 'metascraper-title';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { extractPriceAndImages } from "./extractPriceAndImages";

// Initialize the scraper with the specific rules we need
const scraper = metascraper([
    metascraperImage(),
    metascraperTitle(),
]);


export const cheerioScrapper: Scrapper = async (url) => {
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


        // 6. Merge Image Sources (Deduplicate)
        const imagesSet = new Set<string>();
        if (metadata.image) imagesSet.add(metadata.image);
        extraImages.forEach(img => imagesSet.add(img));
        const images = Array.from(imagesSet);


        if (!metadata.title && !price && images.length === 0) {
            return {
                success: false,
                error: 'No data found'
            };
        }

        // 7. Return Data
        return {
            success: true,
            data: {
                title: metadata.title,
                price: price,
                imageUrls: images.length > 0 ? images : undefined
            }
        };

    } catch (error: any) {
        console.error('Scraping Error:', error.message);

        return {
            success: false,
            error: error.message
        };
    }
}

