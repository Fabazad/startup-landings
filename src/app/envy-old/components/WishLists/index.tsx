import { Box } from "@mui/material"
import { WishListGrid } from "./WishListGrid"
import { WishList } from "../../types/WishList"
import { WishListList } from "./WishListList";

export const WishLists = ({ wishLists, isLoading, emptyContent }: {
    wishLists?: Array<WishList>,
    isLoading: boolean;
    emptyContent: { title: string, button?: { title: string, href: string } }
}) => {
    return (
        <Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <WishListGrid wishLists={wishLists} isLoading={isLoading} emptyContent={emptyContent} />
            </Box>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
                <WishListList wishLists={wishLists} isLoading={isLoading} emptyContent={emptyContent} />
            </Box>
        </Box>
    )
}