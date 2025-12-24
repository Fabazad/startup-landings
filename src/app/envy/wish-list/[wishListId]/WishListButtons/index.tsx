'use client';

import { Box, Divider, Drawer, IconButton, List, Stack, Typography } from "@mui/material"
import { ArchiveWishListButton } from "src/app/envy/wish-list/[wishListId]/WishListButtons/ArchiveWishListButton"
import { DeleteWishListButton } from "src/app/envy/wish-list/[wishListId]/WishListButtons/DeleteWishListButton"
import { FollowWishListButton } from "src/app/envy/wish-list/[wishListId]/WishListButtons/FollowWishListButton"
import { UnarchiveWishListButton } from "src/app/envy/wish-list/[wishListId]/WishListButtons/UnarchiveWishListButton"
import { UnfollowWishListButton } from "src/app/envy/wish-list/[wishListId]/WishListButtons/UnfollowWishListButton"
import { User } from "src/app/envy/types/User"
import { WishList } from "src/app/envy/types/WishList"
import { Iconify } from "src/components/iconify"
import { UpdateWishListButton } from "./UpdateWishListButton"
import { useState } from "react"
import { ShareWishListButton } from "./ShareWishListButton";

export const WishListButtons = ({ wishList, user }: { wishList: WishList; user?: User }) => {

    const [open, setOpen] = useState(false);

    const isOwner = wishList.user.id === user?.id;
    const isFollowed = wishList.isFollowedByMe;

    const ButtonList = () => (
        <>
            {!wishList.archivedAt && (
                <ShareWishListButton wishListId={wishList.id} />
            )}

            {isOwner && !wishList.archivedAt && (
                <>
                    <UpdateWishListButton wishListId={wishList.id} />
                    <ArchiveWishListButton wishListId={wishList.id} />
                </>
            )}
            {user && !isOwner && !isFollowed && !wishList.archivedAt && (
                <FollowWishListButton wishListId={wishList.id} userId={user?.id} />
            )}
            {user && !isOwner && isFollowed && !wishList.archivedAt && (
                <UnfollowWishListButton wishListId={wishList.id} userId={user?.id} />
            )}
            {isOwner && !!wishList.archivedAt && (
                <UnarchiveWishListButton wishListId={wishList.id} />
            )}
            {isOwner && !!wishList.archivedAt && (
                <DeleteWishListButton wishListId={wishList.id} />
            )}
        </>
    )

    return (
        <>
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                flexWrap="wrap"
                useFlexGap
                flexDirection="column"
                sx={{ display: { xs: 'none', md: 'flex' } }}>
                <ButtonList />
            </Stack>
            <Box sx={{ display: { xs: 'inline-block', sm: 'none' } }}>
                <Box>
                    <IconButton
                        onClick={() => setOpen(true)}
                        sx={{ borderRadius: 9999, width: '100%', px: 2 }}
                        color="inherit"
                    >
                        <Iconify icon="solar:settings-bold-duotone" width={24} color="action.active" />
                    </IconButton>
                </Box>
                <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Iconify icon="solar:settings-bold-duotone" width={24} color="action.active" />
                            <Typography variant="h6">Paramètres de la liste</Typography>
                        </Stack>
                        <IconButton onClick={() => setOpen(false)}>
                            <Iconify icon="material-symbols:close-rounded" width={24} />
                        </IconButton>
                    </Box>
                    <Divider />
                    <List sx={{ p: 2 }}>
                        <ButtonList />
                    </List>
                </Drawer>
            </Box>
        </>
    )
}