"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();

    useEffect(() => {
        const item = localStorage?.getItem('sb-snompcrhhpnorquapudz-auth-token');

        if (item) router.replace('/envy');
    }, [router, localStorage]);
    
    return <>{children}</>;
};