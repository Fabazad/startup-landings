import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import { fToNow } from 'src/utils/format-time';
import { CONFIG } from 'src/config-global';
import { Notification } from 'src/app/envy/types/Notification';
import { NotificationType } from '../../types/NotificationSetting';
import { paths } from 'src/routes/paths';
import Image from 'next/image';

// ----------------------------------------------------------------------

const notificationDataRecord: Record<
    NotificationType,
    (notification: Notification) => { avatarUrl: string, title: string, text: React.ReactNode, url: string }
> = {
    [NotificationType.LIST_FOLLOWED]: (notification) => {
        if (notification.type !== NotificationType.LIST_FOLLOWED) throw new Error("Invalid notification type");
        return {
            avatarUrl: notification.follower.avatarUrl || `${CONFIG.assetsDir}/assets/icons/notification/ic-delivery.svg`,
            title: "Liste suivie",
            text: (
                <span>
                    <b>{notification.follower.displayName}</b> suit votre liste <b>{notification.followedList.name}</b>
                </span>
            ),
            url: paths.envy.wishList.detail(notification.followedList.id)
        }
    },
    [NotificationType.WISH_BOOKED]: (notification) => {
        if (notification.type !== NotificationType.WISH_BOOKED) throw new Error("Invalid notification type");
        return {
            avatarUrl: notification.booker?.avatarUrl || `${CONFIG.assetsDir}/assets/icons/notification/ic-delivery.svg`,
            title: "Envie réservée",
            text: (
                <span>
                    <b>{notification.booker?.displayName || 'Un utilisateur'}</b> a réservé une envie sur votre liste <b>{notification.bookedWish.wishList.name}</b>
                </span>
            ),
            url: paths.envy.wishList.detail(notification.bookedWish.wishList.id)
        }
    },
    [NotificationType.LIST_ARCHIVED]: (notification) => {
        if (notification.type !== NotificationType.LIST_ARCHIVED) throw new Error("Invalid notification type");
        return {
            avatarUrl: notification.archivedList.user.avatarUrl || `${CONFIG.assetsDir}/assets/icons/notification/ic-delivery.svg`,
            title: "Liste archivée",
            text: (
                <span>
                    <b>{notification.archivedList.user.displayName}</b> a archivé sa liste que vous suiviez : <b>{notification.archivedList.name}</b>
                </span>
            ),
            url: paths.envy.root + "?tab=followed-lists"
        }
    },
}
const getNotificationData: (notification: Notification) => { avatarUrl: string, title: string, text: React.ReactNode, url: string } = (notification) => {
    return notificationDataRecord[notification.type](notification);
}

export const NotificationItem = ({ notification, onClick }: { notification: Notification, onClick: () => void }) => {

    const notificationData = getNotificationData(notification);

    console.log(notificationData);

    const renderAvatar = (
        <ListItemAvatar>
            <Stack
                alignItems="center"
                justifyContent="center"
                sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'background.neutral' }}
            >
                <Image
                    src={notificationData.avatarUrl}
                    alt="avatar"
                    width={40}
                    height={40}
                    style={{ borderRadius: '50%' }}
                />
            </Stack>
        </ListItemAvatar>
    );

    const renderText = (
        <ListItemText
            disableTypography
            primary={reader(notificationData.title)}
            secondary={
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ typography: 'caption', color: 'text.disabled' }}
                    divider={
                        <Box
                            sx={{
                                width: 2,
                                height: 2,
                                bgcolor: 'currentColor',
                                mx: 0.5,
                                borderRadius: '50%',
                            }}
                        />
                    }
                >
                    {fToNow(notification.created_at)}
                    {notificationData.text}
                </Stack>
            }
        />
    );

    const renderUnReadBadge = notification.seen === false && (
        <Box
            sx={{
                top: 26,
                width: 8,
                height: 8,
                right: 20,
                borderRadius: '50%',
                bgcolor: 'info.main',
                position: 'absolute',
            }}
        />
    );


    return (
        <ListItemButton
            disableRipple
            href={notificationData.url}
            sx={{
                p: 2.5,
                alignItems: 'flex-start',
                borderBottom: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
            }}
            onClick={onClick}
        >
            {renderUnReadBadge}

            {renderAvatar}

            <Stack sx={{ flexGrow: 1 }}>
                {renderText}
            </Stack>
        </ListItemButton>
    );
}

// ----------------------------------------------------------------------

function reader(data: string) {
    return (
        <Box
            dangerouslySetInnerHTML={{ __html: data }}
            sx={{
                mb: 0.5,
                '& p': { typography: 'body2', m: 0 },
                '& a': { color: 'inherit', textDecoration: 'none' },
                '& strong': { typography: 'subtitle2' },
            }}
        />
    );
}
