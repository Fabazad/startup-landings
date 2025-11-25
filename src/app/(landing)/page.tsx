'use client';

import { LandingView } from 'src/sections/landing/view';
import { useAuthContext } from 'src/auth/hooks/use-auth-context';
import { useProductIdea } from 'src/app/product-idea-provider';
import { useRouter } from 'next/navigation';
import { SplashScreen } from 'src/components/loading-screen';


export default function Page() {

  const { isReady } = useProductIdea();

  const { authenticated, loading } = useAuthContext();

  const router = useRouter();

  if (isReady && authenticated) {
    router.push('/app');
    return;
  }

  if (loading) return <SplashScreen />;

  return (
    <>
      <LandingView />
    </>
  );
}
