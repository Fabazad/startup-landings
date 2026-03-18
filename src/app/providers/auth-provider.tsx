/* eslint-disable no-console */

'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ProductIdeaName, PRODUCT_IDEA_NAMES } from 'src/ProductIdeas';

export function AuthProvider({
  children,
  productName,
}: {
  children: React.ReactNode;
  productName: ProductIdeaName;
}) {
  const router = useRouter();

  useEffect(() => {
    const item = localStorage?.getItem('sb-snompcrhhpnorquapudz-auth-token');

    if (item && productName === PRODUCT_IDEA_NAMES.ENVY) router.replace('/envy');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return children;
}
