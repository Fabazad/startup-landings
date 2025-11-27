import { User } from "@supabase/supabase-js";
import { createSupabase } from "src/lib/supabase-server";

export const getAuthUser = async (): Promise<{ success: true, user: User } | { success: false, errorCode: "unknown" | "unauthorized" }> => {
    const supabase = await createSupabase()
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        if (error.name === "AuthSessionMissingError") return { success: false, errorCode: "unauthorized" };
        return { success: false, errorCode: "unknown" };
    }
    return { success: true, user: data.user };
}