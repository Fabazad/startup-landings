import { SupabaseClient } from "@supabase/supabase-js";
import { NotificationSetting, NotificationType } from "../../types/NotificationSetting";

const formatData = (data: {
    id: number,
    user_id: string,
    type: NotificationType,
    email: boolean,
    push: boolean,
    in_app: boolean
}) =>
({
    ...data,
    type: data.type,
    userId: data.user_id,
    inApp: data.in_app,
})

export const generateNotificationSettingsQueries = (supabase: SupabaseClient) => ({
    getNotificationSettings: async (userId: string): Promise<
        { success: true, notificationSettings: Array<NotificationSetting> } |
        { success: false, error: string }> => {
        const { data, error } = await supabase
            .from('user_notification_settings')
            .select('*')
            .eq('user_id', userId);

        if (error) return { success: false, error: error.message };

        return { success: true, notificationSettings: data.map(formatData) };
    },
    addIfMissing: async (userId: string): Promise<
        { success: true } |
        { success: false, error: string }
    > => {

        const { data, error: getError } = await supabase
            .from('user_notification_settings')
            .select('*')
            .eq('user_id', userId);

        if (getError) return { success: false, error: getError.message };

        const notificationTypeValues = Object.values(NotificationType);

        if (data.length === notificationTypeValues.length) return { success: true };

        const missingNotificationTypes = notificationTypeValues.filter(type => !data.some(setting => setting.type === type));

        const { error } = await supabase
            .from('user_notification_settings')
            .insert(
                missingNotificationTypes.map(type => ({
                    user_id: userId,
                    type,
                    email: true,
                    push: true,
                    in_app: true
                })),
            );

        if (error) return { success: false, error: error.message };

        return { success: true };
    },
    update: async (userId: string, notificationType: NotificationType, email: boolean, push: boolean, inApp: boolean): Promise<
        { success: true } |
        { success: false, error: string }
    > => {
        const { error } = await supabase
            .from('user_notification_settings')
            .update({ email, push, in_app: inApp })
            .eq('user_id', userId)
            .eq('type', notificationType);

        if (error) return { success: false, error: error.message };

        return { success: true };
    },
})