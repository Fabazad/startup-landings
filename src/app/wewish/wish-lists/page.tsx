import { Container } from "@mui/material";
import { MyLists } from "./MyLists";
import { Profile } from "./profile"
import { getAuthUser } from "src/auth/getAuthUser";
import { View403, View500 } from "src/sections/error";
import { getUserStatsQuery } from "../queries/user";

export default async function ListsPage() {

    const userRes = await getAuthUser();
    if (!userRes.success) return <View500 />
    if (!userRes.user) return <View403 />

    const statsRes = await getUserStatsQuery(userRes.user.id);
    if (!statsRes.success) return <View500 />


    return (
        <Container>
            <Profile user={userRes.user} userStats={statsRes.stats} />
            <MyLists />
        </Container>
    );
}