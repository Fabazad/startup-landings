import { supabase } from "./supabase-client";
import { createSupabase } from "./supabase-server";

export const getSupabase = async () => {
    if (typeof window === 'undefined') {
        return createSupabase();
    }
    return supabase
}