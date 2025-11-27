import { GetItemsRequest, Host, PartnerType, Region } from "paapi5-typescript-sdk";
import { CONFIG } from 'src/config-global';

export const amazonRequest = async ({ asin }: { asin: string }) => {
    try {
        const request = new GetItemsRequest(
            {
                ItemIdType: "ASIN",
                ItemIds: [asin],
                Resources: [
                    "Images.Primary.Large",
                    "ItemInfo.Title",
                    "ItemInfo.Features",
                    "ItemInfo.Classifications",
                    "Offers.Listings.MerchantInfo",
                    "Offers.Listings.ProgramEligibility.IsPrimeExclusive",
                    "Offers.Listings.Price",
                    // @ts-ignore
                    "Images.Variants.Large",
                ],
            },
            CONFIG.amazon.affiliateTag,
            PartnerType.ASSOCIATES,
            CONFIG.amazon.accessKey,
            CONFIG.amazon.secretKey,
            Host.FRANCE,
            Region.FRANCE
        );

        const data = await request.send();

        return data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}