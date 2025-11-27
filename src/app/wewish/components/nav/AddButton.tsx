"use client";

import { Button } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useAddModal } from 'src/app/wewish/components/AddModal/provider';


export const AddButton = () => {
    const { setIsOpen } = useAddModal();

    return (
        <Button sx={{ display: 'flex', flexDirection: "column" }} onClick={() => setIsOpen(true)}>
            <Iconify icon="mdi:add-circle-outline" width={24} />
            Add
        </Button>
    );
}