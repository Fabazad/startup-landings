import { Box } from "@mui/material"
import { EmptyContent } from "src/components/empty-content";
import { Button } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { WishList } from "../../../types/WishList";
import { WishListItem } from "./WishListItem";
import { WishListItemSkeleton } from "./WishListItemSkeleton";

export const WishListList = ({ wishLists, isLoading, emptyContent, href }: {
    wishLists?: Array<WishList>,
    isLoading: boolean,
    href?: (listId: number) => string,
    emptyContent: { button?: { title: string; href: string; }; title: string; }
}) => {
    if (!isLoading && wishLists?.length === 0) return (
        <EmptyContent title={emptyContent.title} action={emptyContent.button && (
            <Button href={emptyContent.button?.href} variant="contained" sx={{ borderRadius: 999, px: 2, mt: 1 }} size="large">
                <Iconify icon="material-symbols:add" sx={{ mr: 1 }} />
                {emptyContent.button?.title}
            </Button>
        )}
        />
    )

    return (
        <Box sx={{ my: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {isLoading || wishLists === undefined ?
                <WishListItemSkeleton /> :
                wishLists.map((list) => (
                    <WishListItem key={list.id} wishList={list} href={href ? href(list.id) : undefined} />
                ))
            }
        </Box>
    )
}