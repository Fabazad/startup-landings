import { Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { useState } from "react";
import { Wish } from "src/app/envy/types/Wish";
import { useAuthContext } from "src/auth/hooks/use-auth-context";

export const SettingsButton = ({ wish, onFavoriteClick, onDelete, onUnbook }: {
    wish: Wish;
    onFavoriteClick: () => void;
    onDelete: () => void;
    onUnbook: () => void
}) => {

    const { user } = useAuthContext();
    const [open, setOpen] = useState(false);

    const isUserOwner = user?.id === wish.userId;
    const isBookedBy = wish.bookedByName || wish.bookedByUser?.display_name || null;
    const isBookedByAuthUser = !!(user && wish.bookedByUser?.id === user.id);

    const handleDelete = () => {
        confirm("Voulez-vous vraiment supprimer cette envie ?") && onDelete();
    };

    const handleBook = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isBookedBy && isBookedByAuthUser) {
            e.preventDefault();
            confirm("Voulez-vous vraiment annuler la réservation ?") && onUnbook();
            setOpen(false);
        }
    }

    return (
        <>
            <Box>
                <IconButton onClick={() => setOpen(true)}>
                    <Iconify icon="iconamoon:menu-kebab-vertical-bold" width={24} color="text.secondary" />
                </IconButton>
            </Box>
            <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                    <Typography variant="h6">Paramètres</Typography>
                    <IconButton onClick={() => setOpen(false)}>
                        <Iconify icon="material-symbols:close-rounded" width={24} />
                    </IconButton>
                </Box>
                <Divider />
                <List sx={{ p: 2 }}>
                    {!isUserOwner && (
                        <ListItemButton href={`/envy/wish/${wish.id}/book`} onClick={handleBook} disabled={!!isBookedBy && !isBookedByAuthUser}>
                            <ListItemIcon>
                                <Iconify icon="solar:lock-keyhole-minimalistic-bold-duotone" width={24} color="secondary.main" />
                            </ListItemIcon>
                            <ListItemText primary={isBookedBy ?
                                (isBookedByAuthUser ? "Annuler la réservation" : `Déjà réservée par ${isBookedBy}`)
                                : "Réserver l'envie"}
                            />
                        </ListItemButton>
                    )}
                    {isUserOwner && (
                        <>
                            <ListItemButton onClick={onFavoriteClick}
                            >
                                <ListItemIcon>
                                    <Iconify icon={wish.isFavorite ? "solar:heart-outline" : "solar:heart-bold"} width={24} color="error.main" />
                                </ListItemIcon>
                                <ListItemText primary={wish.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"} />
                            </ListItemButton>
                            <ListItemButton href={`/envy/wish/${wish.id}/update`}>
                                <ListItemIcon>
                                    <Iconify icon="solar:pen-2-bold-duotone" width={24} />
                                </ListItemIcon>
                                <ListItemText primary="Modifier" />
                            </ListItemButton>
                            <ListItemButton onClick={handleDelete}>
                                <ListItemIcon>
                                    <Iconify icon="solar:trash-bin-trash-bold-duotone" width={24} />
                                </ListItemIcon>
                                <ListItemText primary="Supprimer" />
                            </ListItemButton>
                        </>
                    )}
                </List>
            </Drawer>
        </>
    )
}