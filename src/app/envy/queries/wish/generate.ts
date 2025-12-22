import { SupabaseClient } from "@supabase/supabase-js";
import { NotificationType } from "../../types/NotificationSetting";
import { Wish } from "../../types/Wish";
import { getClientNotificationQueries } from "../notification/client";

const notificationQueries = getClientNotificationQueries();

export const generateWishQueries = (supabase: SupabaseClient) => ({
    getWishQuery: async (wishId: number): Promise<{ success: true, wish?: Wish } | { success: false, errorCode: "unknown" }> => {
        const { data, error } = await supabase
            .from('wishes')
            .select('*, bookedByUser:profiles (display_name,avatar_url,id), list:wish-lists!inner (id, user_id), listId:wish-lists (id, name)')
            .eq('id', wishId)
            .maybeSingle<any>();

        if (error) return { success: false, errorCode: "unknown" };
        return {
            success: true, wish: {
                ...data,
                list: data.listId,
                userId: data.list.user_id,
                imageUrls: data.imageUrls?.split(',')
            }
        };
    },

    deleteWishQuery: async (wishId: string): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
        const { error } = await supabase
            .from('wishes')
            .delete()
            .eq('id', wishId);

        if (error) return { success: false, errorCode: "unknown" };
        return { success: true };
    },

    setIsFavoriteQuery: async (wishId: number, isFavorite: boolean): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
        const { error } = await supabase
            .from('wishes')
            .update({ isFavorite })
            .eq('id', wishId);

        if (error) return { success: false, errorCode: "unknown" };
        return { success: true };
    },

    getWishesQuery: async (params: { wishListId: number } | { userId: string } | { isBookedByUser: string }): Promise<{ success: true, wishes: Wish[] } | { success: false, errorCode: "unknown" }> => {
        const query = supabase
            .from('wishes')
            .select('*, bookedByUser:profiles (display_name,avatar_url,id), list:wish-lists!inner (id, user_id), listId:wish-lists (id, name)')
            .order('created_at', { ascending: false });

        if ('wishListId' in params) {
            query.eq('listId', params.wishListId);
        } else if ('userId' in params) {
            query.eq('wish-lists.user_id', params.userId);
        } else if ('isBookedByUser' in params) {
            query.eq('bookedByUser', params.isBookedByUser);
        }

        const { data, error } = await query;

        if (error) return { success: false, errorCode: "unknown" };

        const wishes = data.map((wish: any) => ({
            ...wish,
            userId: wish.list.user_id,
            list: wish.listId,
            imageUrls: wish.imageUrls?.split(','),
        }));
        return { success: true, wishes };
    },

    createWishQuery: async (params: {
        wishListId: number,
        productUrl?: string,
        name: string,
        description?: string,
        price?: number,
        isFavorite: boolean,
        isSecondHand: boolean,
        acceptEquivalent: boolean,
        imageUrl?: string,
        imageUrls?: string[]
    }): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
        const { wishListId, imageUrls, ...rest } = params;

        const { data: wish, error } = await supabase.from('wishes').insert({
            ...rest,
            listId: wishListId,
            imageUrls: imageUrls?.join(','),
        }).single<Wish>();
        if (error) return { success: false, errorCode: "unknown" };

        await notificationQueries.sendNotification({
            type: NotificationType.WISH_ADDED,
            data: { wishId: wish.id }
        });
        return { success: true };
    },

    updateWishQuery: async (params: {
        wishId: number,
        productUrl?: string,
        name: string,
        description?: string,
        price?: number,
        isFavorite: boolean,
        imageUrl?: string,
        isSecondHand: boolean,
        acceptEquivalent: boolean,
        imageUrls?: string[]
    }): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
        const { wishId, imageUrls, ...rest } = params;


        const { error } = await supabase.from('wishes').update({
            ...rest,
            imageUrls: imageUrls?.join(',')
        }).eq('id', wishId);
        if (error) return { success: false, errorCode: "unknown" };
        return { success: true };
    },

    unbookWishQuery: async (wishId: number): Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
        const { error } = await supabase.from('wishes').update({ bookedByName: null, bookedByUser: null }).eq('id', wishId);
        if (error) return { success: false, errorCode: "unknown" };
        return { success: true };
    },

    bookWishQuery: async (params: { userId: string; wishId: number } | { wishId: number; name: string; userId?: string }):
        Promise<{ success: true } | { success: false, errorCode: "unknown" }> => {
        const { wishId, userId } = params
        const { error } = await supabase.from('wishes')
            .update({
                bookedByUser: userId,
                bookedByName: "name" in params ? params.name : null
            })
            .eq('id', wishId);
        if (error) return { success: false, errorCode: "unknown" };

        await notificationQueries.sendNotification({
            type: NotificationType.WISH_BOOKED,
            data: { wishId, userId }
        });
        return { success: true };
    }
})