"use client";

import { Button, Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useAddModal } from 'src/app/envy/components/AddModal/provider';


export const AddButton = () => {
    const { setIsOpen } = useAddModal();

    return (
        <Button sx={{ display: 'flex', flexDirection: "column" }} onClick={() => setIsOpen(true)} >
            <Iconify icon="line-md:plus-circle" width={24} />
            <span>Ajouter</span>
        </Button>
    );
}