import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import { fToNow } from 'src/utils/format-time';
import { CONFIG } from 'src/config-global';
import { Notification } from 'src/app/envy/types/Notification';

// ----------------------------------------------------------------------

export const NotificationItem = ({ notification }: { notification: Notification }) => {
    const renderAvatar = (
        <ListItemAvatar>
            <Stack
                alignItems="center"
                justifyContent="center"
                sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'background.neutral' }}
            >
                <Box
                    component="img"
                    src={`${CONFIG.assetsDir}/assets/icons/notification/ic-delivery.svg`}
                    sx={{ width: 24, height: 24 }}
                />
            </Stack>
        </ListItemAvatar>
    );

    const renderText = (
        <ListItemText
            disableTypography
            primary={reader(notification.type)}
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
                    {fToNow(notification.createdAt)}
                    {"notification.category"}
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
            sx={{
                p: 2.5,
                alignItems: 'flex-start',
                borderBottom: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
            }}
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
