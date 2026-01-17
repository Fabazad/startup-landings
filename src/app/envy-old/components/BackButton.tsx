"use client";

import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { SxProps, Theme } from "@mui/material/styles";

interface BackButtonProps {
    fallbackPath?: string;
    sx?: SxProps<Theme>;
    path?: string;
}

export const BackButton = ({ fallbackPath = '/envy', sx, path }: BackButtonProps) => {
    const router = useRouter();

    const handleBack = () => {
        if (path) {
            router.push(path);
        } else if (window.history.length > 1) {
            router.back();
        } else {
            router.push(fallbackPath);
        }
    };

    return (
        <Button
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            sx={{ color: 'text.secondary', ...sx }}
            onClick={!path ? handleBack : undefined}
            href={path}
        >
            Retour
        </Button>
    );
};
