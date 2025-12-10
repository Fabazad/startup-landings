'use client';

import { Box, Button, Divider, Drawer, IconButton, List, Stack, Typography } from "@mui/material"
import { ArchiveWishListButton } from "src/app/wewish/wish-list/[wishListId]/WishListButtons/ArchiveWishListButton"
import { DeleteWishListButton } from "src/app/wewish/wish-list/[wishListId]/WishListButtons/DeleteWishListButton"
import { FollowWishListButton } from "src/app/wewish/wish-list/[wishListId]/WishListButtons/FollowWishListButton"
import { UnarchiveWishListButton } from "src/app/wewish/wish-list/[wishListId]/WishListButtons/UnarchiveWishListButton"
import { UnfollowWishListButton } from "src/app/wewish/wish-list/[wishListId]/WishListButtons/UnfollowWishListButton"
import { User } from "src/app/wewish/types/User"
import { WishList } from "src/app/wewish/types/WishList"
import { Iconify } from "src/components/iconify"
import { UpdateWishListButton } from "./UpdateWishListButton"
import { useState } from "react"
import { ShareWishListButton } from "./ShareWishListButton";

export const WishListButtons = ({ wishList, user }: { wishList: WishList; user?: User }) => {

    const [open, setOpen] = useState(false);

    const isOwner = wishList.user.id === user?.id;
    const isFollowed = wishList.isFollowedByMe;

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
                {isOwner && !wishList.archivedAt && (
                    <>
                        <ShareWishListButton wishListId={wishList.id} />
                        <UpdateWishListButton wishListId={wishList.id} />
                        <ArchiveWishListButton wishListId={wishList.id} />
                    </>
                )}
                {isOwner && wishList.archivedAt && (
                    <>
                        <UnarchiveWishListButton wishListId={wishList.id} />
                        <DeleteWishListButton wishListId={wishList.id} />
                    </>
                )}
                {!isOwner && !isFollowed && user && (
                    <FollowWishListButton wishListId={wishList.id} userId={user.id} />
                )}
                {!isOwner && isFollowed && user && (
                    <UnfollowWishListButton wishListId={wishList.id} userId={user.id} />
                )}
            </Stack>
            <Box sx={{ display: { xs: 'inline-block', sm: 'none' } }}>
                <Box>
                    <Button
                        onClick={() => setOpen(true)}
                        sx={{ borderRadius: 9999, width: '100%', px: 2 }}
                        variant="outlined"
                        color="inherit"
                    >
                        Paramètres
                    </Button>
                </Box>
                <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                        <Typography variant="h6">Paramètres</Typography>
                        <IconButton onClick={() => setOpen(false)}>
                            <Iconify icon="material-symbols:close-rounded" width={24} />
                        </IconButton>
                    </Box>
                    <Divider />
                    <List sx={{ p: 2 }}>

                        {isOwner && !wishList.archivedAt && (
                            <>
                                <ShareWishListButton wishListId={wishList.id} />
                                <UpdateWishListButton wishListId={wishList.id} />
                                <ArchiveWishListButton wishListId={wishList.id} />
                            </>
                        )}
                        {user && !isOwner && !isFollowed && (
                            <FollowWishListButton wishListId={wishList.id} userId={user?.id} />
                        )}
                        {user && !isOwner && isFollowed && (
                            <UnfollowWishListButton wishListId={wishList.id} userId={user?.id} />
                        )}
                        {isOwner && !!wishList.archivedAt && (
                            <UnarchiveWishListButton wishListId={wishList.id} />
                        )}
                        {isOwner && !!wishList.archivedAt && (
                            <DeleteWishListButton wishListId={wishList.id} />
                        )}
                    </List>
                </Drawer>
            </Box>
        </>
    )
}