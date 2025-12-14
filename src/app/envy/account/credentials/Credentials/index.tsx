"use client";

import { SplashScreen } from "src/components/loading-screen";
import { CreatePassword } from "./CreatePassword";
import { UpdatePassword } from "./UpdatePassword";
import { useAuthContext } from "src/auth/hooks";


// ----------------------------------------------------------------------

export const Credentials = () => {
    const { user, loading } = useAuthContext();

    if (loading) return <SplashScreen />

    return user?.hasPassword ? <UpdatePassword user={user} /> : <CreatePassword />
}
