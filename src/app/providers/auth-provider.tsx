"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    useEffect(() => {
        const item = localStorage?.getItem('sb-snompcrhhpnorquapudz-auth-token');

        const router = useRouter()

        if (item) router.replace('/envy');
    }, [localStorage])
    
    return <>{children}</>;
};