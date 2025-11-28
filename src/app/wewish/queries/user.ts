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