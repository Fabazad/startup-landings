import { LandingView } from 'src/sections/landing/view';
import { getProductIdea } from '../getProductIdea';
import { redirect } from 'next/navigation';
import { paths } from 'src/routes/paths';

// Revalidate this page every hour (ISR)
export const revalidate = 3600;

export default async function Page() {

  const { isReady } = await getProductIdea()

  if (isReady) return redirect(paths.envy.root);


  return <LandingView />;
}
