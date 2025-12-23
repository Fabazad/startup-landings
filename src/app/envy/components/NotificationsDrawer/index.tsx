'use client';

import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomTabs } from 'src/components/custom-tabs';
import { useNotifications } from '../../hooks/useNotifications';
import { NotificationItem } from './NotficationItem';
import { NotificationsButton } from './NotificationsButton';
import { paths } from 'src/routes/paths';


export const NotificationsDrawer = () => {
    const drawer = useBoolean();

    const { notifications, isLoading, seeAllNotifications } = useNotifications();

    const totalUnRead = notifications?.filter((item) => item.seen === false).length || 0;

    const handleCloseNotifications = async () => {
        seeAllNotifications();
        drawer.onFalse();
    };

    const renderHead = (
        <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Notifications
            </Typography>

            <IconButton onClick={handleCloseNotifications}>
                <Iconify icon="mingcute:close-line" />
            </IconButton>

            <IconButton href={paths.envy.account.notifications}>
                <Iconify icon="mdi:bell-settings" />
            </IconButton>
        </Stack>
    );

    const renderList = (
        <Scrollbar>
            <Box component="ul">
                {notifications?.map((notification) => (
                    <Box component="li" key={notification.id} sx={{ display: 'flex' }}>
                        <NotificationItem notification={notification} />
                    </Box>
                ))}
            </Box>
        </Scrollbar>
    );

    return (
        <>
            <NotificationsButton totalUnRead={totalUnRead} onClick={drawer.onTrue} />

            <Drawer
                open={drawer.value}
                onClose={handleCloseNotifications}
                anchor="right"
                slotProps={{ backdrop: { invisible: true } }}
                PaperProps={{ sx: { width: 1, maxWidth: 420 } }}
            >
                {renderHead}

                {renderList}
            </Drawer>
        </>
    );
}
