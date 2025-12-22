"use client";
import { useState } from 'react';
import { NotificationSetting, NotificationType } from '../../types/NotificationSetting';
import { Switch, TableCell, TableRow } from '@mui/material';
import { getClientNotificationSettingsQueries } from '../../queries/notificationSettings/client';
import { toast } from 'sonner';

const notificationTypesLabel: Record<NotificationType, string> = {
    [NotificationType.LIST_ARCHIVED]: "Une liste que vous suivez a été archivée",
    [NotificationType.LIST_FOLLOWED]: "Une personne suit une de vos listes",
    [NotificationType.WISH_ADDED]: "Une personne a ajouté une envie à une liste que vous suivez",
    [NotificationType.WISH_BOOKED]: "Une personne a réservé une envie d'une de vos listes",
}

export const NotificationForm = ({ notificationSetting }: { notificationSetting: NotificationSetting }) => {
    const [email, setEmail] = useState(notificationSetting.email);
    const [inApp, setInApp] = useState(notificationSetting.inApp);
    const [push, setPush] = useState(notificationSetting.push);

    const clientNotificationSettingsQueries = getClientNotificationSettingsQueries();

    const onChange = async (name: "email" | "push" | "in_app", checked: boolean) => {
        if (name === "email") setEmail(checked);
        if (name === "in_app") setInApp(checked);
        if (name === "push") setPush(checked);

        const res = await clientNotificationSettingsQueries.update(
            notificationSetting.userId,
            notificationSetting.type,
            name === "email" ? checked : notificationSetting.email,
            name === "push" ? checked : notificationSetting.push,
            name === "in_app" ? checked : notificationSetting.inApp
        );
        if (!res.success) toast.error(res.error);
        else toast.success("Paramètres des notifications mis à jour");
    }

    return (

        <>
            <TableRow sx={{ '& td, & th': { border: 0 }, display: { xs: 'table-row', sm: 'none' } }} >
                <TableCell component="th" scope="row" colSpan={4} sx={{ pb: 0 }}>
                    {notificationTypesLabel[notificationSetting.type]}
                </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                <TableCell component="th" scope="row" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    {notificationTypesLabel[notificationSetting.type]}
                </TableCell>
                <TableCell align="center">
                    <Switch checked={email} onChange={(_, checked) => onChange("email", checked)} />
                </TableCell>
                <TableCell align="center">
                    <Switch checked={inApp} onChange={(_, checked) => onChange("in_app", checked)} />
                </TableCell>
                <TableCell align="center">
                    <Switch checked={push} onChange={(_, checked) => onChange("push", checked)} />
                </TableCell>

            </TableRow>
        </>

    )
}
