import { supabase } from "src/lib/supabase-client"
import { generateWishQueries } from "./generate"


export const getClientWishQueries = () => {
    return generateWishQueries(supabase)
}