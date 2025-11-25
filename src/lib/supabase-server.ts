import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { CONFIG } from 'src/config-global';

const supabaseUrl = CONFIG.supabase.url;
const supabaseKey = CONFIG.supabase.key;

export async function createSupabase() {
    const cookieStore = await cookies();

    console.log(cookieStore);

    return createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value }) => cookieStore.set(name, value))
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}