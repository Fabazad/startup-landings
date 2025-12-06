import { Button, Grid, Link } from "@mui/material";
import { WishList } from "../../../types/WishList";
import { WishListItem } from "./WishListItem";
import { WishListItemSkeleton } from "./WishListItem/WishListItemSkeleton";
import { EmptyContent } from "src/components/empty-content";
import { Iconify } from "src/components/iconify";

export const WishListGrid = ({ wishLists, isLoading, emptyContent }: {
    wishLists: WishList[];
    isLoading: boolean;
    emptyContent: { button?: { title: string; href: string; }; title: string; }
}) => {

    if (!isLoading && wishLists?.length === 0) return <EmptyContent
        title={emptyContent.title}
        action={
            emptyContent.button && (
                <Link href={emptyContent.button.href} style={{ marginTop: "1rem" }}>
                    <Button variant="contained" sx={{ borderRadius: 999, px: 2 }} size="large">
                        <Iconify icon="material-symbols:add" sx={{ mr: 1 }} />
                        {emptyContent.button.title}
                    </Button>
                </Link>
            )
        } filled sx={{ py: 10 }} />

    return (
        <Grid container spacing={3} sx={{ py: 3, ml: 0, width: "100%" }}>
            {isLoading && [...Array(4)].map((_, index) => (
                <Grid key={index} xs={12} sm={6} md={4} lg={3} sx={{ p: 1 }}>
                    <WishListItemSkeleton />
                </Grid>
            ))}
            {wishLists.map((wishList) => (
                <Grid key={wishList.id} xs={12} sm={6} md={4} lg={3} sx={{ p: 1 }}>
                    <WishListItem wishList={wishList} />
                </Grid>
            ))}
        </Grid>
    );
}