import { supabase } from "src/lib/supabase-client"
import { generateNotificationSettingsQueries } from "./generate"

export const getClientNotificationSettingsQueries = () => {
    return generateNotificationSettingsQueries(supabase)
}