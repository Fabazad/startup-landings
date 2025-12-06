import { getAuthUser } from "src/auth/getAuthUser";
import { Credentials } from "./Credentials";
import { View403, View500 } from "src/sections/error";

export default async function PasswordPage({
    searchParams,
}: {
    searchParams: { code?: string };
}) {
    const userRes = await getAuthUser();
    if (!userRes.success) return <View500 />
    const user = userRes.user;
    if (!user) return <View403 />

    return <Credentials user={user} updatePasswordCode={searchParams.code} />;
}