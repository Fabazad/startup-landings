import { Dialog, DialogContent, DialogTitle, Button, Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";
import { useMyWishLists } from "../../hooks/useMyWishLists";
import { Iconify } from "src/components/iconify";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { WishListList } from "../WishLists/WishListList";

export const AddModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { user } = useAuthContext();
    const { wishLists, isLoading } = useMyWishLists({ archived: false, userId: user?.id })

    return (
        <Dialog fullWidth maxWidth="xs" fullScreen={isMobile} open={open} onClose={onClose} >
            <Button onClick={onClose} sx={{ position: 'absolute', right: 16, top: 16 }}><Iconify icon="eva:close-fill" /></Button>

            <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>{wishLists?.length ? "Ajouter une envie" : "Vous n'avez pas de liste d'envie"}</DialogTitle>

            <DialogContent sx={{ py: 5 }}>
                <WishListList wishLists={wishLists} isLoading={isLoading} emptyContent={{
                    title: "Vous n'avez pas de liste d'envie",
                    button: { title: "Créer votre première liste d'envie", href: "/wewish/wish-list" }
                }} href={(listId) => `/wewish/wish-list/${listId}/add-wish`} />
                {!isLoading && wishLists.length > 0 && (<>
                    <Divider sx={{ typography: 'body2', my: 2 }}>
                        <Typography variant="body2" sx={{ textTransform: 'uppercase' }}>OU</Typography>
                    </Divider>

                    <Link href={"/wewish/wish-list"} style={{ width: '100%' }}>
                        <Button variant="contained" sx={{ width: '100%', borderRadius: '99999px' }} size="large">
                            {wishLists?.length ? "Créer une nouvelle liste" : "Créer votre première liste d'envie"}
                        </Button>
                    </Link>
                </>
                )}

            </DialogContent>
        </Dialog>
    );
}