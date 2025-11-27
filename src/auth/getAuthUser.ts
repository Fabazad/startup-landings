import { User } from "@supabase/supabase-js";
import { createSupabase } from "src/lib/supabase-server";

export const getAuthUser = async (): Promise<{ success: true, user: User | null } | { success: false, errorCode: "unknown" }> => {
    const supabase = await createSupabase()
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        if (error.name === "AuthSessionMissingError") return { success: true, user: null };
        return { success: false, errorCode: "unknown" };
    }
    return { success: true, user: data.user };
}