import { supabase } from "src/lib/supabase-client";
import { UserStats } from "../types/User";

export const getUserStatsQuery = async (userId: string): Promise<{ success: true, stats: UserStats } | { success: false, errorCode: "unknown" }> => {
    const { data, error } = await supabase.rpc('get_user_stats', { p_user_id: userId });
    if (error) return { success: false, errorCode: "unknown" };

    const { wish_list_count, wish_count, following_count } = data[0];

    return {
        success: true,
        stats: {
            wishListCount: wish_list_count ?? 0,
            wishCount: wish_count ?? 0,
            followingCount: following_count ?? 0
        }
    };
}

export const updateUserProfileQuery = async (data: { displayName?: string, avatar?: string, about?: string, birthday?: string }): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
    const { error } = await supabase.auth.updateUser({
        data: {
            displayName: data.displayName,
            avatarUrl: data.avatar,
            about: data.about,
            birthday: data.birthday
        }
    })
    if (error) return { success: false, errorCode: "unknown" };
    return { success: true };
}

export const addPasswordQuery = async (password: string): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
    const { error } = await supabase.auth.updateUser({
        password,
        data: { has_password: true }
    });

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true };
}

export const updatePasswordQuery = async (newPassword: string): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
    const { error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) return { success: false, errorCode: "unknown" };
    return { success: true };
}

export const getUserEmailQuery = async (userId: string): Promise<{ success: true, email: string } | { success: false, error: string }> => {
    const { data, error } = await supabase.from('users').select('email').eq('id', userId).single();
    if (error) return { success: false, error: error.message };
    return { success: true, email: data.email };
}
