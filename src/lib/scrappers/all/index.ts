import { amazonScrapper } from "../amazon";
import { cheerioScrapper } from "../cheerio";
import { listyScrapper } from "../listy";
import { openaiScrapper } from "../openai";
import { hasAllData, Scrapper, ScrapperReturnType } from "../Scrapper.type";

const cascadeScrappers = async (url: string, scrappers: Array<Scrapper>) => {
    let res: ScrapperReturnType = { success: false, error: "no scrapers provided" }
    for (const scrapper of scrappers) {
        const result = await scrapper(url);
        if (result.success) {
            if (hasAllData(result.data)) {
                res = result;
                break;
            } else if (!res.success) {
                res = result;
            } else {
                res.data = { ...res.data, ...result.data };
                if (hasAllData(res.data)) break;
            }
        } else if (!res.success) {
            res = result;
        }
    }
    return res;
}

export const scrapAll: Scrapper = async (url) => {
    return cascadeScrappers(url, [listyScrapper, amazonScrapper, openaiScrapper, cheerioScrapper])
}


