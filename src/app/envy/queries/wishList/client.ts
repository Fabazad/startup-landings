import { supabase } from "src/lib/supabase-client"
import { generateWishListQuery } from "./generateWishListQuery"

export const getClientWishListQuery = () => {
    return generateWishListQuery(supabase)
}