import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslate } from "src/locales";
import { useMyWishLists } from "../../hooks/useMyWishLists";
import { Iconify } from "src/components/iconify";

export const AddModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {

    const { t } = useTranslate();

    const { data: wishLists } = useMyWishLists();

    return (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} >
            <Button onClick={onClose} sx={{ position: 'absolute', right: 16, top: 16 }}><Iconify icon="eva:close-fill" /></Button>

            <DialogTitle>{wishLists?.length ? t('wewish.addWish') : t('wewish.noLists')}</DialogTitle>

            <DialogContent>
                {wishLists?.length && (
                    <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {wishLists?.map((list) => (
                            <Link key={list.id} href={`/wewish/wish-list/${list.id}/add-wish`}>
                                <Button variant="contained" sx={{ width: '100%', borderRadius: '99999px' }}>
                                    {list.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>)}

                <Divider sx={{ typography: 'body2' }}>
                    <Typography variant="body2" sx={{ textTransform: 'uppercase' }}>{t('or')}</Typography>
                </Divider>
            </DialogContent>
            <DialogActions>
                <Link href={"/wewish/wish-list"} style={{ width: '100%' }}>
                    <Button variant="contained" sx={{ width: '100%', borderRadius: '99999px' }}>
                        {wishLists?.length ? t('wewish.addList') : t('wewish.addFirstList')}
                    </Button>
                </Link>
            </DialogActions>
        </Dialog>
    );
}