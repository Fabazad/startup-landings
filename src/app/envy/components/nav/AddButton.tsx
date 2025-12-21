"use client";

import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useAddModal } from 'src/app/envy/components/AddModal/provider';
import { varHover } from 'src/components/animate';
import { m } from 'framer-motion';


export const AddButton = () => {
    const { setIsOpen } = useAddModal();

    return (
        <Stack direction="column" alignItems="center"   >
            <Tooltip title="Ajouter" placement="bottom"
                slotProps={{ tooltip: { sx: { fontSize: '1rem', padding: '8px 16px' } } }} arrow>
                <IconButton
                    component={m.button}
                    whileTap="tap"
                    whileHover="hover"
                    variants={varHover(1.05)}
                    onClick={() => setIsOpen(true)}
                    sx={{ pb: { xs: 0, sm: 1 } }}
                >
                    <Iconify icon="solar:add-circle-bold-duotone" width={24} />
                </IconButton>
            </Tooltip>

            <Typography variant="subtitle2" sx={{ display: { xs: 'flex', sm: 'none' } }}>Ajouter</Typography>
        </Stack>
    );
}

