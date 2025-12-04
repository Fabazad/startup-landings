import Link from "next/link";
import { Box, Card, Typography } from "@mui/material";
import { Image } from 'src/components/image';
import { Wish } from "src/app/wewish/types/Wish";
import { SettingsButton } from "./SettingsButton";
import { Iconify } from "src/components/iconify";

export const WishItem = ({ wish, onFavoriteClick }: { wish: Wish; onFavoriteClick: () => void }) => {
    return (
        <Link key={wish.id} href={`/wewish/wish/${wish.id}`} style={{ textDecoration: "none" }}>
            <Card sx={{ position: 'relative', display: 'flex', gap: 2, height: 100, alignItems: 'center', p: 2 }}>
                <Box sx={{ width: 60, minWidth: 60 }}>
                    {wish.isFavorite && <Iconify icon="solar:heart-bold" width={24} color="primary.main" sx={{ position: 'absolute', top: 10, left: 10, zIndex: 9 }} />}
                    <Image alt={wish.name} src={"https://api-prod-minimal-v700.pages.dev/assets/images/m-product/product-17.webp"} ratio="1/1" sx={{ borderRadius: 2 }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', gap: 1, flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={800} color="text.primary">
                        {wish.name}
                    </Typography>
                </Box>
                <Box sx={{ flexShrink: 0 }}>
                    <SettingsButton wish={wish} onFavoriteClick={onFavoriteClick} />
                </Box>
            </Card>
        </Link >
    );
}