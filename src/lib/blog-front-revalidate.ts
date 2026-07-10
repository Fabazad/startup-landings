/* eslint-disable no-console */
import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

// Fronts served by an on-demand-revalidated Next.js app. On publish / update /
// unpublish we ping their /api/revalidate endpoint so the change is served
// within seconds (plain ISR would otherwise take up to an hour). The content
// already lives in Supabase, so this is fail-open: a revalidate failure must
// never fail the publish itself — it is only reported in the API response.
const FRONT_BASE_URLS: Record<string, string> = {
  Envy: CONFIG.blog.envyFrontUrl,
};

export type FrontRevalidateResult = 'revalidated' | 'failed' | 'skipped';

/**
 * Ask the front serving `productIdeaId`'s blog to revalidate the given article
 * (plus its blog index, sitemap and RSS). No-op ('skipped') if that product has
 * no front configured or no shared secret is set.
 */
export async function revalidateFront(
  productIdeaId: string,
  slug?: string
): Promise<FrontRevalidateResult> {
  const baseUrl = FRONT_BASE_URLS[productIdeaId];
  const secret = CONFIG.blog.revalidateSecret;
  if (!baseUrl || !secret) return 'skipped';

  try {
    const response = await fetch(`${baseUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({ slug }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      console.warn(`Front revalidate for ${productIdeaId} answered HTTP ${response.status}`);
      return 'failed';
    }
    return 'revalidated';
  } catch (error) {
    console.warn(`Front revalidate for ${productIdeaId} failed:`, error);
    return 'failed';
  }
}
