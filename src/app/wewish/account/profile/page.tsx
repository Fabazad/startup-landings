import { getAuthUser } from "src/auth/getAuthUser"
import { View403, View500 } from "src/sections/error";
import { Profile } from "./Profile";

export default async function ProfilePage() {
    const userRes = await getAuthUser();

    if (!userRes.success) return <View500 />
    const user = userRes.user;
    if (!user) return <View403 />

    return <Profile user={user} />
}