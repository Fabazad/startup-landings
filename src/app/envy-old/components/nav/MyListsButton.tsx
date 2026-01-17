'use client';

import { Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import { m } from 'framer-motion';
import { varHover } from 'src/components/animate';

export const MyListsButton = () => {
    const text = "Mes listes";

    return (
        <>
            <Stack sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Tooltip title={text} placement="bottom"
                    slotProps={{ tooltip: { sx: { fontSize: '1rem', padding: '8px 16px' } } }} arrow>
                    <IconButton
                        component={m.a}
                        whileTap="tap"
                        whileHover="hover"
                        variants={varHover(1.05)}
                        href={paths.envy.root}
                        sx={{ pb: { xs: 0, sm: 1 } }}
                    >
                        <Iconify icon="solar:clipboard-list-bold-duotone" width={24} />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Button
                sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', alignItems: 'center' }}
                href={paths.envy.root}
            >
                <Iconify color="action.active" icon="solar:clipboard-list-bold-duotone" width={24} />
                <Typography variant="subtitle2">{text}</Typography>
            </Button>
        </>
    );
}
