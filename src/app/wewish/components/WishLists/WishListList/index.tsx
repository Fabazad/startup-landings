import { Box } from "@mui/material"
import { EmptyContent } from "src/components/empty-content";
import { Button } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { WishList } from "../../../types/WishList";
import { WishListItem } from "./WishListItem";

export const WishListList = ({ wishLists, isLoading, emptyContent, href }: {
    wishLists: Array<WishList>,
    isLoading: boolean,
    href?: (listId: number) => string,
    emptyContent: { button?: { title: string; href: string; }; title: string; }
}) => {
    return (
        <Box>
            {wishLists.length === 0 && (
                <EmptyContent title={emptyContent.title} action={
                    <Button href={emptyContent.button?.href} variant="contained" sx={{ borderRadius: 999, px: 2, mt: 1 }} size="large">
                        <Iconify icon="material-symbols:add" sx={{ mr: 1 }} />
                        {emptyContent.button?.title}
                    </Button>
                }
                />
            )}
            {wishLists?.length !== 0 && (
                <>
                    <Box sx={{ mt: 2 }}>

                        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {wishLists?.map((list) => (
                                <WishListItem key={list.id} wishList={list} href={href ? href(list.id) : undefined} />
                            ))}
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    )
}