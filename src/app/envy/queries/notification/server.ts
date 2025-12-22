import { createSupabase } from "src/lib/supabase-server";
import { generateNotificationQueries } from "./generate";

export const getServerNotificationQueries = async () => {
    const supabase = await createSupabase();
    return generateNotificationQueries(supabase);
}
