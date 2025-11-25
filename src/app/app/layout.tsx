'use client';

import { WeWishLayout } from 'src/apps/WeWish/layout';
import { useAuthContext } from 'src/auth/hooks';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------


export default function Layout({ children }: {
  children: React.ReactNode;
}) {

  const { unauthenticated } = useAuthContext();
  const router = useRouter();

  if (unauthenticated) router.push("/")

  return <WeWishLayout>{children}</WeWishLayout>;
}
