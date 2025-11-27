import { headers } from "next/headers";
import { detectLanguage } from "src/locales/server";
import { DEFAULT_PRODUCT_IDEA, RAW_PRODUCT_IDEAS } from "src/ProductIdeas";
import { ProductIdea, translateProductIdea } from "src/types/ProductIdea";

const getRawProductIdea = async () => {
    // get url subdomain from url on server
    const headersList = await headers();
    const url = headersList.get('x-forwarded-host') || headersList.get('host') || '';
    const subdomain = url.split('.')[0];

    const productIdea = Object.values(RAW_PRODUCT_IDEAS).find(
        (productIdea) => productIdea.id === subdomain
    );
    if (productIdea) return productIdea;
    return DEFAULT_PRODUCT_IDEA;
};

export const getProductIdea = async (): Promise<ProductIdea> => {
    const [lang, rawProductIdea] = await Promise.all([detectLanguage(), getRawProductIdea()]);
    const productIdea = translateProductIdea(rawProductIdea, lang)
    return productIdea
}