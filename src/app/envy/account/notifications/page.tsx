import { getAuthUser } from "src/auth/getAuthUser";
import { View403, View500 } from "src/sections/error";
import { getServerNotificationSettingsQueries } from "../../queries/notificationSettings/server";
import { NotificationsSettings } from "./NotificationsSettings";

export default async function Notifications() {
    const userRes = await getAuthUser();
    if (!userRes.success) return <View500 />

    const { user } = userRes;
    if (!user) return <View403 />

    const notificationSettingsQueries = await getServerNotificationSettingsQueries();
    const notificationSettingsRes = await notificationSettingsQueries.getNotificationSettings(user.id);
    if (!notificationSettingsRes.success) return <View500 />

    return <NotificationsSettings notificationSettings={notificationSettingsRes.notificationSettings} />;
}