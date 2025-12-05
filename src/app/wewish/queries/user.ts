import { supabase } from "src/lib/supabase-client";

export const getUserStatsQuery = async (userId: string): Promise<{ success: true, stats: { wishListCount: number, wishCount: number, followingCount: number } } | { success: false, errorCode: "unknown" }> => {
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

export const updateUserProfileQuery = async (data: { fullName?: string, avatar?: string, about?: string, birthday?: string }): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
    const { error } = await supabase.auth.updateUser({
        data: {
            full_name: data.fullName,
            avatar: data.avatar,
            about: data.about,
            birthday: data.birthday
        }
    })
    if (error) return { success: false, errorCode: "unknown" };
    return { success: true };
}