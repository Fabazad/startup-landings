'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Button, Link } from '@mui/material';
import { useTranslate } from 'src/locales';
import { useProductIdea } from 'src/app/product-idea-provider';

// Loaded lazily: the mega-menu pulls Popover, Paper, Masonry from @mui/lab,
// plus a scroll-listener hierarchy for the dropdown. None of it is needed
// to render the navigation links themselves, so keep it out of the landing
// hydration window.
const MegaMenuHorizontal = dynamic(
  () =>
    import('src/components/mega-menu/horizontal').then((m) => ({
      default: m.MegaMenuHorizontal,
    })),
  { ssr: false }
);

const SLOT_PROPS = {
  rootItem: {
    title: {
      fontWeight: 'bold',
      py: 0.5,
      pl: 1,
    },
  },
  subItem: {
    mb: 1.5,
    textDecoration: 'none',
    fontSize: '0.9rem',
    '&:hover': {
      textDecoration: 'none',
      color: 'primary.light',
    },
  },
} as const;

/**
 * Renders the "Features" entry of the desktop nav. While the heavy mega-menu
 * chunk is loading we display a regular Button that scrolls to `#features`,
 * so the nav is visually complete and clickable from the first paint and
 * the dropdown layout/JS only arrive once the browser is idle.
 */
export function DeferredFeaturesMenu() {
  const { t } = useTranslate();
  const { features } = useProductIdea();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ric: any = (window as any).requestIdleCallback;
    if (typeof ric === 'function') {
      const id = ric(() => setReady(true), { timeout: 3500 });
      return () => (window as any).cancelIdleCallback?.(id);
    }
    const t2 = window.setTimeout(() => setReady(true), 2000);
    return () => window.clearTimeout(t2);
  }, []);

  if (!ready) {
    // Until the dropdown chunk loads, jump to the first feature anchor
    // so the link is still functional. Falls back to no-op if there are
    // no features for this product.
    const firstFeatureHref = features[0] ? `/#feature-${features[0].id}` : '#';
    return (
      <Button component={Link} href={firstFeatureHref} sx={{ px: 1, fontWeight: 'bold' }}>
        {t('landing.nav.features')}
      </Button>
    );
  }

  return (
    <MegaMenuHorizontal
      data={[
        {
          title: t('landing.nav.features'),
          path: '#',
          children: [
            {
              items: features.map((feature) => ({
                title: feature.title,
                path: `/#feature-${feature.id}`,
              })),
            },
          ],
        },
      ]}
      slotProps={SLOT_PROPS}
    />
  );
}
