import { CONFIG } from 'src/config-global';

// Direct import: pulling from the `src/sections/error` barrel re-exports
// the 403 and 500 client views, and Next.js then lists those `'use client'`
// modules in the not-found chunk manifest — which is loaded for every route
// as the global fallback. Importing the file directly keeps the other error
// views (and their dependencies) out of the landing chunks.
import { NotFoundView } from 'src/sections/error/not-found-view';

// ----------------------------------------------------------------------

export const metadata = { title: `404 page not found! | Error - ${CONFIG.appName}` };

export default function Page() {
  return <NotFoundView />;
}
