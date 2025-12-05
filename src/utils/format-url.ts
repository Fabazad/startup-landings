export function formatUrl(url: string) {
    try {
        const urlObj = new URL(url);
        let hostname = urlObj.hostname;
        if (hostname.startsWith('www.')) {
            hostname = hostname.substring(4);
        }
        return hostname;
    } catch (error) {
        return '';
    }
}