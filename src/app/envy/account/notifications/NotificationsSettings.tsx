import { Card, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { NotificationSetting } from "../../types/NotificationSetting";
import { NotificationForm } from "./NotificationForm";

export const NotificationsSettings = ({ notificationSettings }: { notificationSettings: Array<NotificationSetting> }) => {

    return (
        <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
                <Typography variant="h6">Paramètres des Notifications</Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Notification</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">App</TableCell>
                                <TableCell align="center">Push</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notificationSettings.map((setting) => (
                                <NotificationForm key={setting.id} notificationSetting={setting} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Card>
    )
}