import { createSupabase } from "src/lib/supabase-server";
import { generateWishQueries } from "./generate";

export const getServerWishQueries = async () => {
    const supabase = await createSupabase();
    return generateWishQueries(supabase);
}
