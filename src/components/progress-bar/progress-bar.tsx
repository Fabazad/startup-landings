'use client';

import './styles.css';

import NProgress from 'nprogress';
import { Suspense, useEffect } from 'react';

import { useRouter, usePathname, useSearchParams } from 'src/routes/hooks';

// ----------------------------------------------------------------------

type PushStateInput = [data: any, unused: string, url?: string | URL | null | undefined];

export function ProgressBar() {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a[href]') as HTMLAnchorElement | null;

      if (!anchor) return;

      const targetUrl = anchor.href;
      const currentUrl = window.location.href;
      const rel = anchor.getAttribute('rel');
      const href = anchor.getAttribute('href');
      const eventTarget = anchor.getAttribute('target');

      if (
        href?.startsWith('/') &&
        eventTarget !== '_blank' &&
        rel !== 'noopener' &&
        targetUrl !== currentUrl
      ) {
        NProgress.start();
      }
    };

    document.addEventListener('click', handleAnchorClick);

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      },
    });
  });

  return (
    <Suspense fallback={null}>
      <NProgressDone />
    </Suspense>
  );
}

// ----------------------------------------------------------------------

function NProgressDone() {
  const pathname = usePathname();

  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, router, searchParams]);

  return null;
}
