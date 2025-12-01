import { Box, Skeleton } from "@mui/material";

export const WishListItemSkeleton = ({ amount = 4 }: { amount?: number }) => {
    return [...Array(amount)].map((_, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 2 }}>
            <Skeleton variant="rectangular" width={100} height={75} sx={{ borderRadius: 2, minWidth: 100 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', gap: 1, width: "100%" }}>
                <Skeleton variant="rectangular" width="100%" height={16} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" width="50px" height={16} sx={{ borderRadius: 2 }} />
            </Box>
        </Box>
    ));
}