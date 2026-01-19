"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter();

    useEffect(() => {
        const item = localStorage?.getItem('sb-snompcrhhpnorquapudz-auth-token');

        if (item) router.replace('/envy');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);
    
    return <>{children}</>;
};