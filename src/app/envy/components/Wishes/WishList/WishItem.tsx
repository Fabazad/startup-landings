import Link from "next/link";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { Image } from 'src/components/image';
import { defaultWishImageUrl, Wish } from "src/app/envy/types/Wish";
import { SettingsButton } from "./SettingsButton";
import { Iconify } from "src/components/iconify";
import { fCurrency } from "src/utils/format-number";
import { formatUrl } from "src/utils/format-url";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { WishListLabel } from "../../WishListLabel";
import { VoteButton } from "./VoteButton";

export const WishItem = ({ wish, onFavoriteClick, onDelete, onUnbook, showList = false, canBook, voteWish, removeVoteWish }: {
    wish: Wish;
    onFavoriteClick: () => void;
    onDelete: () => void;
    onUnbook: () => void
    showList?: boolean
    canBook: boolean
    voteWish: () => void
    removeVoteWish: () => void
}) => {

    const { user } = useAuthContext();
    const isBookedBy = wish.bookedByName || wish.bookedByUser?.display_name || null;
    const isVotedByUser = wish.votes?.includes(user?.id || "") || false;
    const voteCount = wish.votes?.length || 0;

    return (
        <Box sx={{ position: 'relative' }}>
            <Link key={wish.id} href={`/envy/wish/${wish.id}`} style={{ textDecoration: "none" }}>
                <Card sx={{ position: 'relative', display: 'flex', gap: 2, height: 100, alignItems: 'center', p: 2, pr: 8 }}>
                    <Box sx={{ width: 60, minWidth: 60 }}>
                        {wish.isFavorite && <Iconify icon="solar:heart-bold" width={24} color="error.main" sx={{ position: 'absolute', top: 10, left: 10, zIndex: 9 }} />}
                        {isBookedBy && <Iconify icon="solar:lock-keyhole-minimalistic-bold" width={24} color="secondary.main" sx={{ position: 'absolute', top: 38, left: 35, zIndex: 9 }} />}
                        <Image alt={wish.name} src={wish.imageUrl || defaultWishImageUrl} ratio="1/1" sx={{ borderRadius: 2, opacity: isBookedBy ? 0.4 : 1 }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', gap: 1, flex: 1, minWidth: 0 }}>
                        <Typography
                            variant="subtitle1"
                            fontWeight={800}
                            color="text.primary"
                            sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {wish.name}
                        </Typography>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="body2" color="text.secondary">
                                {wish.price && fCurrency(wish.price)}
                            </Typography>
                            {wish.productUrl && !showList && (
                                <Typography variant="body2" color="text.secondary">
                                    {formatUrl(wish.productUrl)}
                                </Typography>
                            )}
                            {showList && (
                                <Stack sx={{ flex: 1, alignItems: "end", minWidth: 0, overflow: 'hidden' }}>
                                    <WishListLabel name={wish.list.name} />
                                </Stack>
                            )}
                        </Stack>
                    </Box>

                </Card>
            </Link >
            {wish.list.isCollaborative && (
                <Box sx={{ position: 'absolute', bottom: -12, right: 6, zIndex: 1 }}>
                    <VoteButton
                        isVotedByUser={isVotedByUser}
                        voteCount={voteCount}
                        onVote={voteWish}
                        onRemoveVote={removeVoteWish}
                    />
                </Box>
            )}
            <Box sx={{ flexShrink: 0, position: 'absolute', top: 0, right: 16, height: "100%", display: 'flex', alignItems: 'center' }}>
                <SettingsButton
                    wish={wish}
                    onFavoriteClick={onFavoriteClick}
                    onDelete={onDelete}
                    onUnbook={onUnbook}
                    canBook={canBook}
                    voteWish={voteWish}
                    removeVoteWish={removeVoteWish}
                />
            </Box>
        </Box>
    );
}