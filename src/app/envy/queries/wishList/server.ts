import { createSupabase } from "src/lib/supabase-server"
import { generateWishListQuery } from "./generateWishListQuery"

export const getServerWishListQuery = async () => {
    const supabase = await createSupabase();
    return generateWishListQuery(supabase);
}
