/* eslint-disable no-console */
import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

// Static front-ends rebuilt through a Vercel deploy hook whenever their blog content
// changes. envynest.fr (repo envy-gift-wishlist) prerenders every published article at
// build time: without a rebuild, a newly published post keeps returning a 404 (and used
// to serve the home page as a soft-404) until the next unrelated code push.
const FRONT_DEPLOY_HOOKS: Record<string, string> = {
  Envy: CONFIG.blog.envyFrontDeployHookUrl,
};

export type FrontRebuildResult = 'triggered' | 'failed' | 'skipped';

/**
 * Fire the deploy hook of the front serving `productIdeaId`'s blog, if any.
 * Fail-open by design: the content is already stored in Supabase, so a hook failure
 * must never fail the publish itself — it is only reported in the API response.
 */
export async function triggerFrontRebuild(productIdeaId: string): Promise<FrontRebuildResult> {
  const hookUrl = FRONT_DEPLOY_HOOKS[productIdeaId];
  if (!hookUrl) return 'skipped';

  try {
    const response = await fetch(hookUrl, {
      method: 'POST',
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      console.warn(`Front rebuild hook for ${productIdeaId} answered HTTP ${response.status}`);
      return 'failed';
    }
    return 'triggered';
  } catch (error) {
    console.warn(`Front rebuild hook for ${productIdeaId} failed:`, error);
    return 'failed';
  }
}
