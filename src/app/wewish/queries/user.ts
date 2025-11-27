import { User } from "@supabase/supabase-js";
import { createSupabase } from "src/lib/supabase-server";

export const getAuthUser = async (): Promise<{ success: true, user: User } | { success: false, errorCode: "unknown" }> => {
    const supabase = await createSupabase()
    const { data, error } = await supabase.auth.getUser();
    console.log(data, error?.message)
    if (error) return { success: false, errorCode: "unknown" };
    return { success: true, user: data.user };
}