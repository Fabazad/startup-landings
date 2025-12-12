import { amazonScrapper } from "../amazon";
import { cheerioScrapper } from "../cheerio";
import { listyScrapper } from "../listy";
import { openaiScrapper } from "../openai";
import { ScrapperReturnType } from "../Scrapper.type";

export const benchmarkScrapper = async (url: string): Promise<Array<{ scrapper: string, result: ScrapperReturnType }>> => {
    const res = await Promise.all([
        { scrapper: "amazon", result: await amazonScrapper(url) },
        { scrapper: "cheerio", result: await cheerioScrapper(url) },
        { scrapper: "openai", result: await openaiScrapper(url) },
        { scrapper: "listy", result: await listyScrapper(url) }
    ])

    return res;
}

