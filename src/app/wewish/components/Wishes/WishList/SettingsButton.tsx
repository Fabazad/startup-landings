import { Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { useState } from "react";
import { Wish } from "src/app/wewish/types/Wish";

export const SettingsButton = ({ wish, onFavoriteClick }: { wish: Wish; onFavoriteClick: () => void }) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Box onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}>
                <IconButton onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen(true);
                }}>
                    <Iconify icon="solar:menu-dots-bold" width={24} />
                </IconButton>
            </Box>
            <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)} onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                    <Typography variant="h6">Paramètres</Typography>
                    <IconButton onClick={() => setOpen(false)}>
                        <Iconify icon="material-symbols:close-rounded" width={24} />
                    </IconButton>
                </Box>
                <Divider />
                <List sx={{ p: 2 }}>
                    <ListItemButton onClick={onFavoriteClick}
                    >
                        <ListItemIcon>
                            <Iconify icon={wish.isFavorite ? "solar:heart-bold" : "solar:heart-outline"} width={24} color="primary.main" />
                        </ListItemIcon>
                        <ListItemText primary={wish.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"} />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <Iconify icon="lucide:edit" width={24} />
                        </ListItemIcon>
                        <ListItemText primary="Modifier" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <Iconify icon="material-symbols:delete-rounded" width={24} />
                        </ListItemIcon>
                        <ListItemText primary="Supprimer" />
                    </ListItemButton>
                </List>
            </Drawer>
        </>
    )
}