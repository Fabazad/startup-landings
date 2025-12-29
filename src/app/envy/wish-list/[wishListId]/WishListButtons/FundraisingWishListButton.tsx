"use client";

import { ListItemButton, ListItemIcon, ListItemText, Button } from "@mui/material"
import { Iconify } from "src/components/iconify"

export const FundraisingWishListButton = ({ fundraisingUrl }: { fundraisingUrl: string }) => {
    const text = "Cagnotte en ligne";
    const icon = "solar:wallet-money-bold-duotone";

    return (
        <>
            <Button
                variant="contained"
                sx={{ borderRadius: 9999, width: '100%', px: 5, display: { xs: 'none', sm: 'flex' } }}
                startIcon={<Iconify icon={icon} />}
                href={fundraisingUrl}
                target="_blank"
            >
                {text}
            </Button>
            <ListItemButton href={fundraisingUrl} target="_blank" sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <ListItemIcon>
                    <Iconify icon={icon} width={24} />
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </>
    )
}