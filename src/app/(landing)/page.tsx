import { LandingView } from 'src/sections/landing/view';
import { getProductIdea } from '../getProductIdea';
import { getAuthUser } from 'src/auth/getAuthUser';
import { redirect } from 'next/navigation';
import { paths } from 'src/routes/paths';

// Revalidate this page every hour (ISR)
export const revalidate = 3600;

export default async function Page() {

  const [{ isReady }, userRes] = await Promise.all([getProductIdea(), getAuthUser()])

  if (isReady && userRes.success && userRes.user) return redirect(paths.envy.root);


  return <LandingView />;
}
