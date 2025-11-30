import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";
import { WishList } from "src/app/wewish/types/WishList";
import { Image } from 'src/components/image';
import { AvatarShape } from 'src/assets/illustrations';

export const WishListItem = ({ wishList }: { wishList: WishList }) => {
    return (
        <Link key={wishList.id} href={`/wewish/wish-list/${wishList.id}/add-wish`} style={{ textDecoration: "none" }}>
            <Box sx={{ position: 'relative', display: 'flex', gap: 2, "&:hover": { opacity: 0.7 } }}>
                <Box sx={{ width: 100, minWidth: 100 }}>
                    <Image alt={wishList.name} src={"https://api-prod-minimal-v700.pages.dev/assets/images/cover/cover-5.webp"} ratio="4/3" sx={{ borderRadius: 2 }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" fontWeight={800} color="text.primary">
                        {wishList.name}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }} color="text.secondary">
                        {wishList.wishCount} envies
                    </Typography>
                </Box>
            </Box>
        </Link >
    );
}