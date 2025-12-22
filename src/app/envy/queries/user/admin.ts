import { supabaseAdmin } from "src/lib/supabase-admin";

export const getUserEmailQueryAdmin = async (userId: string): Promise<{ success: true, email: string } | { success: false, error: string }> => {
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (error) return { success: false, error: error.message };
    if (!data.user.email) return { success: false, error: 'User has no email' };

    return { success: true, email: data.user.email };
}
