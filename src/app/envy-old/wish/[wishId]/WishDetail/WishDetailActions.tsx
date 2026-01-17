"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Iconify } from "src/components/iconify";
import { Wish } from "../../../types/Wish";
import { toast } from "sonner";
import { paths } from "src/routes/paths";
import { BookingCard } from "./BookingCard";
import { User } from "src/app/envy-old/types/User";
import { enrichProductUrl } from "src/lib/enrichProductUrl";
import { getClientWishQueries } from "src/app/envy-old/queries/wish/client";

const { deleteWishQuery, setIsFavoriteQuery } = getClientWishQueries();

export const WishDetailActions = ({ wish, user }: { wish: Wish; user?: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const isOwner = user?.id === wish.userId;
    const isBookedBy = wish.bookedByName || wish.bookedByUser?.display_name || null;


    const handleDelete = async () => {
        if (!confirm("Voulez-vous vraiment supprimer cette envie ?")) return;
        setIsLoading(true);
        const res = await deleteWishQuery(wish.id.toString());
        setIsLoading(false);
        if (res.success) {
            toast.success("Envie supprimée");
            router.push("/envy/wish-list");
        } else {
            toast.error("Erreur lors de la suppression");
        }
    };

    const handleToggleFavorite = async () => {
        const res = await setIsFavoriteQuery(wish.id, !wish.isFavorite);
        if (res.success) {
            toast.success("Favori mis à jour");
            router.refresh();
        } else {
            toast.error("Erreur lors de la mise à jour");
        }
    };

    const updateButtons = (
        <>
            <Button
                fullWidth
                size="large"
                variant={wish.isFavorite ? "contained" : "contained"}
                color="primary"
                startIcon={<Iconify icon={wish.isFavorite ? "solar:heart-outline" : "solar:heart-bold"} />}
                onClick={handleToggleFavorite}
                sx={{ borderRadius: 9999, py: 1.5 }}
            >
                {wish.isFavorite ? "Retirer des coups de cœur" : "Mettre en coup de cœur"}
            </Button>

            <Button
                href={paths.envy.wish.update(wish.id)}
                fullWidth
                size="large"
                variant="contained"
                startIcon={<Iconify icon="solar:pen-2-bold-duotone" />}
                sx={{ borderRadius: 9999, py: 1.5 }}
            >
                Modifier
            </Button>

            <LoadingButton
                fullWidth
                size="large"
                variant="outlined"
                color="error"
                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                onClick={handleDelete}
                loading={isLoading}
                sx={{ borderRadius: 9999, py: 1.5 }}
            >
                Supprimer
            </LoadingButton>
        </>
    )

    const bookButtons = (
        <>
            <Stack direction="row" spacing={3} justifyContent="space-between">
                {wish.price && (
                    <Stack direction="column" alignItems="flex-start">
                        <Typography variant="h4" color="secondary.main" fontWeight="bold">
                            {wish.price} €
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Prix à titre indicatif
                        </Typography>
                    </Stack>

                )}
                {!isBookedBy && wish.productUrl && (
                    <Button
                        size="large"
                        variant="outlined"
                        target="_blank"
                        href={enrichProductUrl(wish.productUrl)}
                        startIcon={<Iconify icon="fa7-solid:external-link" />}
                        sx={{ borderRadius: 9999, py: 2, px: { md: 3, xs: 2 } }}
                    >
                        Voir sur le site marchand
                    </Button>
                )}
            </Stack>

            <BookingCard user={user} wish={wish} />
        </>
    )

    return (
        <Stack direction="column" spacing={2}>
            {(isOwner || wish.list.isCollaborative) && updateButtons}
            {(!isOwner || wish.list.isCollaborative) && bookButtons}
        </Stack>
    )
}
