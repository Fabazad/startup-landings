"use client";

import { Container, Tabs, Tab, Typography } from "@mui/material";
import { Iconify } from "src/components/iconify";
import { useTabs } from 'src/hooks/use-tabs';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from "react";

const TABS = [
    { value: 'profile', label: 'Profil', icon: <Iconify icon="iconamoon:profile-circle-fill" width={24} /> },
    { value: 'password', label: 'Mot de passe', icon: <Iconify icon="iconamoon:lock-fill" width={24} /> },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const lastPathSegment = pathname.split('/').filter(Boolean).pop() || 'profile';
    const tabs = useTabs(lastPathSegment)

    useEffect(() => {
        const newLastPathSegment = pathname.split('/').filter(Boolean).pop() || 'profile';
        tabs.setValue(newLastPathSegment)
    }, [pathname])

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        router.push(`/wewish/account/${newValue}`)
        tabs.setValue(newValue)
    }

    return (
        <Container sx={{ py: 3 }}>
            <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>Compte</Typography>
            <Tabs value={tabs.value} onChange={handleTabChange} sx={{ mb: { xs: 3, md: 5 } }}>
                {TABS.map((tab) => (
                    <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
                ))}
            </Tabs>
            {children}
        </Container>
    );
}