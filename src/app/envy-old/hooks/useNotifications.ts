import { Notification } from "src/app/envy/types/Notification";
import { useQuery } from "@tanstack/react-query";
import { getClientNotificationQueries } from "../queries/notification/client";
import { useAuthContext } from "src/auth/hooks";
import { toast } from "sonner";

export const useNotifications = (): { notifications?: Notification[], isLoading: boolean, seeAllNotifications: () => void } => {
    const { getNotifications, seeAllNotifications } = getClientNotificationQueries();
    const { user } = useAuthContext()

    const { data: notifications, isLoading, refetch } = useQuery({
        queryKey: ['notifications', user?.id],
        queryFn: async () => {
            if (!user?.id) return [];

            return getNotifications(user.id);
        },
        enabled: !!user,
    });

    const handleSeeAllNotifications = async () => {
        if (!user?.id) return;
        const res = await seeAllNotifications(user.id);
        if (!res.success) toast.error("Erreur lors de la lecture des notifications");
        refetch();
    }

    return {
        notifications,
        isLoading,
        seeAllNotifications: handleSeeAllNotifications
    }
}