import { GetItemsRequest, Host, PartnerType, Region } from "paapi5-typescript-sdk";
import { getImages } from "./getImages";
import { getPrice } from "./getPrice";
import { getTitle } from "./getTitle";
import { CONFIG } from 'src/config-global';
import { amazonRequest } from "./amazonRequest";


export const getAmazonProductDetails = async ({
  asin,
}: { asin: string }) => {

  const data = await amazonRequest({ asin })

  if (!data) return { success: false, errorCode: "unknown_error", errorMessage: "Unknown error" };


  if (data.Errors?.length || 0 > 0) {
    return {
      success: false,
      errorCode: "unknown_error",
      errorMessage: data.Errors.map((e) => e.Message).join(", "),
    };
  }

  if (data.ItemsResult.Items.length === 0)
    return { success: false, errorCode: "product_not_found" };

  const item = data.ItemsResult.Items[0];

  const priceResult = await getPrice(item);
  if (priceResult === null) {
    return { success: false, errorCode: "missing_data" };
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
