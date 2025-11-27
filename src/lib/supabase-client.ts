import { createBrowserClient } from '@supabase/ssr';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------


const supabaseUrl = CONFIG.supabase.url;
const supabaseKey = CONFIG.supabase.key;

export const supabase = createBrowserClient(supabaseUrl, supabaseKey);