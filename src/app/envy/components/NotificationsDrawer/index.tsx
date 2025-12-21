'use client';

import { m } from 'framer-motion';
import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { varHover } from 'src/components/animate';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomTabs } from 'src/components/custom-tabs';
import { useNotifications } from '../../hooks/useNotifications';
import { NotificationItem } from './NotficationItem';


export const NotificationsDrawer = () => {
    const drawer = useBoolean();

    const TABS = [
        { value: 'all', label: 'All', count: 22 },
        { value: 'unread', label: 'Unread', count: 12 },
    ];

    const [currentTab, setCurrentTab] = useState('all');

    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    const { notifications, isLoading } = useNotifications();

    const totalUnRead = notifications.filter((item) => item.seen === false).length;

    const handleMarkAllAsRead = () => {
        console.log('Mark all as read');
    };

    const renderHead = (
        <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Notifications
            </Typography>

            {!!totalUnRead && (
                <Tooltip title="Mark all as read">
                    <IconButton color="primary" onClick={handleMarkAllAsRead}>
                        <Iconify icon="eva:done-all-fill" />
                    </IconButton>
                </Tooltip>
            )}

            <IconButton onClick={drawer.onFalse} sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
                <Iconify icon="mingcute:close-line" />
            </IconButton>

            <IconButton>
                <Iconify icon="solar:settings-bold-duotone" />
            </IconButton>
        </Stack>
    );

    const renderTabs = (
        <CustomTabs variant="fullWidth" value={currentTab} onChange={handleChangeTab}>
            {TABS.map((tab) => (
                <Tab
                    key={tab.value}
                    iconPosition="end"
                    value={tab.value}
                    label={tab.label}
                    icon={
                        <Label
                            variant={((tab.value === 'all' || tab.value === currentTab) && 'filled') || 'soft'}
                            color={
                                (tab.value === 'unread' && 'info') ||
                                (tab.value === 'archived' && 'success') ||
                                'default'
                            }
                        >
                            {tab.count}
                        </Label>
                    }
                />
            ))}
        </CustomTabs>
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

            <Stack direction="column" alignItems="center">
                <Tooltip title="Notifications" placement="bottom"
                    slotProps={{ tooltip: { sx: { fontSize: '1rem', padding: '8px 16px' } } }} arrow>
                    <IconButton
                        component={m.button}
                        whileTap="tap"
                        whileHover="hover"
                        variants={varHover(1.05)}
                        onClick={drawer.onTrue}
                        sx={{ pb: { xs: 0, sm: 1 } }}
                    >
                        <Badge badgeContent={totalUnRead} color="error">
                            <Iconify icon="solar:bell-bing-bold-duotone" width={24} />
                        </Badge>
                    </IconButton>
                </Tooltip >
                <Typography variant="subtitle2" sx={{ display: { xs: 'flex', sm: 'none' } }}>
                    Notifications
                </Typography>
            </Stack>

            <Drawer
                open={drawer.value}
                onClose={drawer.onFalse}
                anchor="right"
                slotProps={{ backdrop: { invisible: true } }}
                PaperProps={{ sx: { width: 1, maxWidth: 420 } }}
            >
                {renderHead}

                {renderTabs}

                {renderList}

                <Box sx={{ p: 1 }}>
                    <Button fullWidth size="large">
                        View all
                    </Button>
                </Box>
            </Drawer>
        </>
    );
}
