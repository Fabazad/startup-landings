'use client';

import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import { m } from 'framer-motion';
import { varHover } from 'src/components/animate';

export const MyListsButton = () => {
    return (
        <Stack direction="column" alignItems="center">
            <Tooltip title="Mes listes" placement="bottom"
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
            <Typography variant="subtitle2" sx={{ display: { xs: 'flex', sm: 'none' } }}>
                Mes listes
            </Typography>
        </Stack>
    );
}
