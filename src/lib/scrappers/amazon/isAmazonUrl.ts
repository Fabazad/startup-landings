export const isAmazonUrl = (url: string): string | null => {
    const asin = url.match(/dp\/([A-Z0-9]{10})/);
    return asin ? asin[1] : null;
}