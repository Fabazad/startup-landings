import { LoadingButton } from "@mui/lab"
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Iconify } from "src/components/iconify"
import { paths } from "src/routes/paths";

export const ShareWishListButton = ({ wishListId }: { wishListId: number }) => {
    const text = "Partager";
    const icon = "lucide:share-2";
    return (
        <>
            <LoadingButton
                href={paths.wewish.wishList.share(wishListId)}
                variant="contained"
                sx={{ borderRadius: 9999, width: '100%', px: 5, display: { xs: 'none', sm: 'flex' } }}
                startIcon={<Iconify icon={icon} />}
            >
                {text}
            </LoadingButton>
            <ListItemButton href={paths.wewish.wishList.share(wishListId)} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <ListItemIcon>
                    <Iconify icon={icon} width={24} />
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </>
    )
}