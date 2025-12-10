import { Button, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Iconify } from "src/components/iconify"
import { paths } from "src/routes/paths"

export const UpdateWishListButton = ({ wishListId }: { wishListId: number }) => {
    const icon = "lucide:edit";
    const text = "Modifier";

    return (
        <>
            <Button
                href={paths.wewish.wishList.update(wishListId)}
                variant="outlined"
                startIcon={<Iconify icon={icon} />}
                sx={{ borderRadius: 9999, width: '100%', px: 5, display: { xs: 'none', sm: 'flex' } }}
            >
                {text}
            </Button>
            <ListItemButton href={paths.wewish.wishList.update(wishListId)} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <ListItemIcon>
                    <Iconify icon={icon} width={24} />
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </>
    )
}