"use client";

import { Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useAddModal } from 'src/app/envy/components/AddModal/provider';
import { varHover } from 'src/components/animate';
import { m } from 'framer-motion';


export const AddButton = () => {
    const { setIsOpen } = useAddModal();
    const text = "Ajouter";

    return (
        <>
            <Stack sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Tooltip title={text} placement="bottom"
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
            </Stack>
            <Button
                sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', alignItems: 'center' }}
                onClick={() => setIsOpen(true)}
            >
                <Iconify color="action.active" icon="solar:add-circle-bold-duotone" width={24} />
                <Typography variant="subtitle2">{text}</Typography>
            </Button>
        </>

    );
}

