import { NodeHtmlMarkdown } from 'node-html-markdown';
import OpenAI from 'openai';
import { CONFIG } from 'src/config-global';
import { Scrapper } from '../Scrapper.type';
import axios from 'axios';

const openai = new OpenAI({ apiKey: CONFIG.openai.apiKey });

export const openaiScrapper: Scrapper = async (url: string) => {
    let htmlContent: string;

    // 1. Récupération du HTML via une requête HTTP légère (Axios)
    try {
        const { data } = await axios.get(url, {
            // Ajouter un User-Agent pour se faire passer pour un navigateur standard
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
            },
            timeout: 15000 // 15 secondes max
        });
        htmlContent = data
    } catch (e: any) {
        // Cette méthode n'est pas adaptée aux sites qui chargent le contenu en JS.
        return { success: false, error: `Erreur HTTP (site dynamique ?): ${e.message}` };
    }
    // 2. Convertir en Markdown pour "nettoyer" le bruit HTML
    // Cela transforme <div><h1>Titre</h1></div> en # Titre


    // 3. Envoyer à OpenAI avec un "System Prompt" strict
    try {
        const markdown = NodeHtmlMarkdown.translate(htmlContent, {
            ignore: ['script', 'style', 'header', 'nav', 'footer', 'form']
        });
        if (markdown === "") return { success: false, error: "No data found" };
        const response = await openai.chat.completions.create({
            model: "gpt-4.1-nano",
            messages: [
                {
                    role: "system",
                    content: "Tu es un extracteur de données e-commerce. Analyse le contenu Markdown et retourne uniquement un objet JSON contenant: title (string), price (number), imageUrls (array of strings)."
                },
                {
                    role: "user",
                    content: `Extrait les infos de ce produit :\n\n${markdown}`
                }
            ],
            response_format: { type: "json_object" } // Force la sortie en JSON
        });

        const result = JSON.parse(response.choices[0].message.content || '{}');

        if (result.title === "" && result.price === 0 && result.imageUrls.length === 0) return { success: false, error: "No data found" };

        return { success: true, data: result };

    } catch (e: any) {
        return { success: false, error: `Erreur OpenAI: ${e.message}` };
    }

};