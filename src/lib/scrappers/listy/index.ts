import { Scrapper } from "../Scrapper.type";
import axios from "axios";
import { CONFIG } from "src/config-global";

export const listyScrapper: Scrapper = async (url) => {
    try {
        const { data, status } = await axios.get<{ title: string, amount: number, product_pictures: string[], pictures?: string[] }>(`https://www.listy.fr/scraper?url=${encodeURIComponent(url)}`, {
            headers: {
                "Cookie": `_listy_project_session=${CONFIG.listy.projectSession}`
            }
        });

        return {
            success: true, data: {
                title: data.title,
                price: data.amount,
                imageUrls: data.product_pictures || data.pictures
            }
        };

    } catch (error) {
        return { success: false, error: error.message };
    }
}