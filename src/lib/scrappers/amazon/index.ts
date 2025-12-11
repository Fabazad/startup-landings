import { getImages } from "./getImages";
import { getPrice } from "./getPrice";
import { getTitle } from "./getTitle";
import { amazonRequest } from "./amazonRequest";
import { Scrapper, ScrapperReturnType } from "../Scrapper.type";


export const getAmazonProductDetails = async ({
  asin,
}: { asin: string }): Promise<ScrapperReturnType> => {

  const data = await amazonRequest({ asin })

  if (!data) return { success: false, error: "Unknown error" };


  if (data.Errors?.length || 0 > 0) {
    return {
      success: false,
      error: data.Errors.map((e) => e.Message).join(", "),
    };
  }

  if (data.ItemsResult.Items.length === 0)
    return { success: false, error: "product_not_found" };

  const item = data.ItemsResult.Items[0];

  const priceResult = await getPrice(item);
  if (priceResult === null) {
    return { success: false, error: "missing_data" };
  }

  return {
    success: true,
    data: {
      title: getTitle(item),
      price: priceResult.amount,
      imageUrls: getImages(item)
    },
  };
};


export const amazonScrapper: Scrapper = async (url) => {
  const regex = /(?:\/dp\/|\/gp\/product\/)([a-zA-Z0-9]{10})/;
  const match = url.match(regex);
  const asin = match ? match[1] : null;

  if (!asin) return { success: false, error: "no asin found" };

  return getAmazonProductDetails({ asin });
}