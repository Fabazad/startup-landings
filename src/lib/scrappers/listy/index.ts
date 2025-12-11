import { Scrapper } from "../Scrapper.type";
import axios from "axios";

export const listyScrapper: Scrapper = async (url) => {
    console.log("timestamp", Date.now())
    try {
        const { data } = await axios.get<{ title: string, amount: number, pictures: string[] }>(`https://cerebro.listy.fr/KU-BZq7eO?timestamp=${Date.now()}&url=${encodeURIComponent(url)}`);
        return {
            success: true, data: {
                title: data.title,
                price: data.amount,
                imageUrls: data.pictures
            }
        };

    } catch (error) {
        return { success: false, error: error.message };
    }
}