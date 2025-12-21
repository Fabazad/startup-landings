import { Stack, Typography } from "@mui/material";
import { Notification } from "src/app/envy/types/Notification";

export const NotificationItem = ({ notification }: { notification: Notification }) => {
    return (
        <Stack>
            {notification.type === 'list_follow' && (
                <Stack>
                    <Typography>Followed your list</Typography>
                </Stack>
            )}

        </Stack>
    );
}