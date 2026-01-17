import { NextResponse } from 'next/server';
import { notificationDataSchema } from 'src/app/envy-old/types/Notification';
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

    try {
        await createNotifications({ notificationData });
    } catch (error) {
        return NextResponse.json({ error: `Failed to create notification : ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({}, { status: 200 });
};