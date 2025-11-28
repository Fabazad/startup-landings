import { Dialog, DialogContent, DialogTitle, Button, Box, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { useMyWishLists } from "../../hooks/useMyWishLists";
import { Iconify } from "src/components/iconify";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { WishListItem } from "./WishListItem";
import { EmptyContent } from "src/components/empty-content";

export const AddModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {

    const { user } = useAuthContext();
    const { wishLists } = useMyWishLists({ archived: false, userId: user?.id })

    return (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} >
            <Button onClick={onClose} sx={{ position: 'absolute', right: 16, top: 16 }}><Iconify icon="eva:close-fill" /></Button>

            <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>{wishLists?.length ? "Ajouter une envie" : "Vous n'avez pas de liste d'envie"}</DialogTitle>

            <DialogContent sx={{ py: 5 }}>
                {wishLists.length === 0 && <EmptyContent title="Vous n'avez pas de liste d'envie" action={
                    <Link href={"/wewish/wish-list"} style={{ marginTop: "1rem" }}>
                        <Button variant="contained" sx={{ borderRadius: 999, px: 2 }} size="large">
                            <Iconify icon="material-symbols:add" sx={{ mr: 1 }} />
                            Créer votre première liste d'envie
                        </Button>
                    </Link>
                } />}
                {wishLists?.length !== 0 && (
                    <>
                        <Box sx={{ mt: 2 }}>

                            <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {wishLists?.map((list) => (
                                    <WishListItem key={list.id} wishList={list} />
                                ))}
                            </Box>
                        </Box>

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