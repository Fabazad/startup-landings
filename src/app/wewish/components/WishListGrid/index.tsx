import { Grid } from "@mui/material";
import { WishList } from "../../types/WishList";
import { PostItem } from "./WishListItem/index2";

export const WishListGrid = ({ wishLists }: { wishLists: WishList[] }) => {
    return (
        <Grid container spacing={3}>
            {wishLists.map((wishList) => (
                <Grid key={wishList.id} xs={12} sm={6} md={4} lg={3}>
                    <PostItem wishList={wishList} />
                </Grid>
            ))}
        </Grid>
    );
}