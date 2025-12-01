import Link from "next/link";
import { Box, Card, Typography } from "@mui/material";
import { Image } from 'src/components/image';
import { Wish } from "src/app/wewish/types/Wish";

export const WishItem = ({ wish }: { wish: Wish }) => {
    return (
        <Link key={wish.id} href={`/wewish/wish/${wish.id}`} style={{ textDecoration: "none" }}>
            <Card sx={{ position: 'relative', display: 'flex', gap: 2, height: 100, alignItems: 'center', p: 2 }}>
                <Box sx={{ width: 60, minWidth: 60 }}>
                    <Image alt={wish.name} src={"https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-17.webp"} ratio="1/1" sx={{ borderRadius: 2 }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" fontWeight={800} color="text.primary">
                        {wish.name}
                    </Typography>
                </Box>
            </Card>
        </Link >
    );
}