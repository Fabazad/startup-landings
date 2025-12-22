import { NextResponse } from 'next/server';
import { getServerNotificationSettingsQueries } from 'src/app/envy/queries/notificationSettings/server';
import { notificationDataSchema } from 'src/app/envy/types/Notification';
import { getAuthUser } from 'src/auth/getAuthUser';
import { createNotifications } from './createNotification/createNotifications';

const createNotificationSchema = notificationDataSchema;

// POST /api/notification
export const POST = async (request: Request) => {
    const body = await request.json();

    const validatedBody = createNotificationSchema.safeParse(body);

    if (!validatedBody.success) {
        return NextResponse.json({ error: validatedBody.error.errors[0].message }, { status: 400 });
    }

    const { data: notificationData } = validatedBody;

    const [notificationSettingsQueries, userRes] = await Promise.all([
        getServerNotificationSettingsQueries(),
        getAuthUser()
    ]);

    if (!userRes.success) {
        return NextResponse.json({ error: userRes }, { status: 500 });
    }
    if (!userRes.user) {
        return NextResponse.json({ error: 'User not found' }, { status: 403 });
    }

    const userNotificationSettings = await notificationSettingsQueries.getNotificationSetting(userRes.user.id, notificationData.type);

    if (!userNotificationSettings.success) {
        return NextResponse.json({ error: userNotificationSettings }, { status: 500 });
    }
    const { notificationSetting } = userNotificationSettings;

    try {
        await createNotifications({ notificationData, userNotificationSetting: notificationSetting });
    } catch (error) {
        return NextResponse.json({ error: `Failed to create notification : ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({}, { status: 200 });
};