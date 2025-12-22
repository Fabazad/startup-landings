import { createClient } from '@supabase/supabase-js';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const supabaseUrl = CONFIG.supabase.url;
const supabaseServiceRoleKey = CONFIG.supabase.adminKey

if (!supabaseServiceRoleKey) throw new Error('NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY is not defined');

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});
