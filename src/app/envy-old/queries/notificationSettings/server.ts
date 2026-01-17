import { createSupabase } from "src/lib/supabase-server";
import { generateNotificationSettingsQueries } from "./generate";

export const getServerNotificationSettingsQueries = async () => {
    const supabase = await createSupabase();
    return generateNotificationSettingsQueries(supabase);
}
