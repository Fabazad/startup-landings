import { User } from "src/app/wewish/types/User";
import { createSupabase } from "src/lib/supabase-server";

export const getAuthUser = async (): Promise<{ success: true, user: User | null } | { success: false, errorCode: "unknown" }> => {
    const supabase = await createSupabase()
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        if (error.name === "AuthSessionMissingError") return { success: true, user: null };
        return { success: false, errorCode: "unknown" };
    }

    console.log(data)

    return {
        success: true, user: {
            id: data.user.id,
            displayName: data.user.user_metadata?.displayName || data.user.user_metadata?.display_name || data.user.user_metadata?.full_name,
            avatarUrl: data.user.user_metadata?.avatarUrl || data.user.user_metadata?.avatar_url,
            about: data.user.user_metadata?.about,
            birthday: data.user.user_metadata?.birthday,
            email: data.user.email!
        }
    };
}