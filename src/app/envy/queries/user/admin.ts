import { supabaseAdmin } from "src/lib/supabase-admin";

export const getUserEmailQueryAdmin = async (userId: string): Promise<{ success: true, email: string } | { success: false, error: string }> => {
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (error) return { success: false, error: error.message };
    if (!data.user.email) return { success: false, error: 'User has no email' };

    return { success: true, email: data.user.email };
}

export const getUserName = async (userId: string): Promise<{ success: true, name: string } | { success: false, error: string }> => {
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId); // TODO - use profiles table
    if (!data.user) return { success: false, error: 'User not found' };
    if (error) return { success: false, error: error.message };
    return { success: true, name: data.user.user_metadata.display_name };
}