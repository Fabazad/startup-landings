"use client";

import { useRouter } from "next/navigation";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const item = localStorage.getItem('sb-snompcrhhpnorquapudz-auth-token');

    const router = useRouter()

    if (item) router.replace('/envy');
    
    return <>{children}</>;
};