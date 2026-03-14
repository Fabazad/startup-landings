import { amazonScrapper } from '../amazon';
import { cheerioScrapper } from '../cheerio';
import { listyScrapper } from '../listy';
import { openaiScrapper } from '../openai';
import { hasAllData, Scrapper, ScrapperReturnType } from '../Scrapper.type';

const cascadeScrappers = async (
  url: string,
  scrappers: Array<Scrapper>,
  index = 0,
  res: ScrapperReturnType = { success: false, error: 'no scrapers provided' }
): Promise<ScrapperReturnType> => {
  if (index >= scrappers.length) return res;

  const result = await scrappers[index](url);

  let nextRes = res;

  if (result.success) {
    if (hasAllData(result.data)) {
      return result;
    }

    if (!res.success) {
      nextRes = result;
    } else {
      nextRes = {
        ...res,
        data: { ...res.data, ...result.data },
      };
      if (hasAllData(nextRes.data)) return nextRes;
    }
  } else if (!res.success) {
    nextRes = result;
  }

  return cascadeScrappers(url, scrappers, index + 1, nextRes);
};

export const scrapAll: Scrapper = async (url) =>
  cascadeScrappers(url, [listyScrapper, amazonScrapper, openaiScrapper, cheerioScrapper]);
