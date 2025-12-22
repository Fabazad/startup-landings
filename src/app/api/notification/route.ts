import { NextResponse } from 'next/server';
import { getServerNotificationSettingsQueries } from 'src/app/envy/queries/notificationSettings/server';
import { notificationDataSchema } from 'src/app/envy/types/Notification';
import { getAuthUser } from 'src/auth/getAuthUser';
import { z } from 'zod';

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

    const userNotificationSettings = await notificationSettingsQueries.getNotificationSettings(userRes.user.id);

    if (!userNotificationSettings.success) {
        return NextResponse.json({ error: userNotificationSettings }, { status: 500 });
    }

    const notificationSettings = userNotificationSettings.notificationSettings.find(setting => setting.type === notificationData.type);
    if (!notificationSettings) {
        return NextResponse.json({ error: 'Notification settings not found' }, { status: 500 });
    }

    if (notificationSettings.email) {
        console.log("Send email")
    }

    if (notificationSettings.push) {
        console.log("Send push ?")
    }

    if (notificationSettings.inApp) {
        console.log("Create Notification")
    }

    return NextResponse.json({ data: notificationData }, { status: 200 });
};