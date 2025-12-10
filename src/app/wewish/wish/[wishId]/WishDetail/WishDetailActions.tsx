"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Stack, Chip, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Iconify } from "src/components/iconify";
import { useAuthContext } from "src/auth/hooks/use-auth-context";
import { Wish } from "../../../types/Wish";
import { deleteWishQuery, setIsFavoriteQuery, unbookWishQuery, bookWishQuery } from "../../../queries/wish";
import { toast } from "sonner";
import { paths } from "src/routes/paths";

export default function WishDetailActions({ wish }: { wish: Wish }) {
    const { user } = useAuthContext();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const isOwner = user?.id === wish.userId;
    const isBookedBy = wish.bookedByName || wish.bookedByUser?.display_name || null;
    const isBookedByAuthUser = !!(user && wish.bookedByUser?.id === user.id);

    const handleDelete = async () => {
        if (!confirm("Voulez-vous vraiment supprimer cette envie ?")) return;
        setIsLoading(true);
        const res = await deleteWishQuery(wish.id.toString());
        setIsLoading(false);
        if (res.success) {
            toast.success("Envie supprimée");
            router.push("/wewish/wish-list");
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

    const handleUnbook = async () => {
        if (!confirm("Voulez-vous vraiment annuler la réservation ?")) return;
        setIsLoading(true);
        const res = await unbookWishQuery(wish.id);
        setIsLoading(false);
        if (res.success) {
            toast.success("Réservation annulée");
            router.refresh();
        } else {
            toast.error("Erreur lors de l'annulation");
        }
    }

    if (isOwner) {
        return (
            <Stack direction="column" spacing={2} sx={{ py: 3 }}>
                <Button
                    fullWidth
                    size="large"
                    variant={wish.isFavorite ? "outlined" : "contained"}
                    color="primary"
                    startIcon={<Iconify icon={wish.isFavorite ? "solar:heart-outline" : "solar:heart-bold"} />}
                    onClick={handleToggleFavorite}
                    sx={{ borderRadius: 9999, py: 1.5 }}
                >
                    {wish.isFavorite ? "Retirer des coups de cœur" : "Mettre en coup de cœur"}
                </Button>

                <Button
                    href={paths.wewish.wish.update(wish.id)}
                    fullWidth
                    size="large"
                    variant="outlined"
                    startIcon={<Iconify icon="lucide:edit" />}
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
            </Stack>
        );
    }

    // Visitor View
    return (
        <Stack spacing={2} sx={{ pt: 3 }}>
            {isBookedBy && !isBookedByAuthUser && (
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                    Cette envie a déjà été réservée par {isBookedBy}.
                </Alert>
            )}

            <Stack direction="column" spacing={2}>
                {isBookedByAuthUser && (
                    <LoadingButton
                        fullWidth
                        size="large"
                        variant="contained"
                        color="warning"
                        startIcon={<Iconify icon="solar:gift-bold" />}
                        onClick={handleUnbook}
                        loading={isLoading}
                        sx={{
                            borderRadius: 9999,
                            py: 1.5,
                            boxShadow: 2,
                        }}
                    >
                        Annuler ma réservation
                    </LoadingButton>
                )}
                {!isBookedByAuthUser && !isBookedBy && (
                    <Link href={paths.wewish.wish.book(wish.id)} passHref style={{ flex: 1 }}>
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            startIcon={<Iconify icon="solar:gift-bold" />}
                            sx={{
                                borderRadius: 9999,
                                py: 1.5,
                                boxShadow: 2,
                            }}
                        >
                            Réserver cette envie
                        </Button>

                    </Link>
                )}

                {!isBookedBy && wish.productUrl && (
                    <Button
                        fullWidth
                        size="large"
                        variant="outlined"
                        target="_blank"
                        href={wish.productUrl}
                        startIcon={<Iconify icon="solar:external-link-bold" />}
                        sx={{ borderRadius: 9999, py: 1.5 }}
                    >
                        Voir le produit
                    </Button>
                )}
            </Stack>
        </Stack >
    );
}
