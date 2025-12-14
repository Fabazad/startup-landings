import { View403 } from "src/sections/error";
import { Wishes } from "../../Wishes";
import { useAuthContext } from "src/auth/hooks";

export const MyBookedWishes = () => {
    const { user } = useAuthContext();

    if (!user) return <View403 />

    return (
        <Wishes isBookedByUser={user?.id} />
    );
}