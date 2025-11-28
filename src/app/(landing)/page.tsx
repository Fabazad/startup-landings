import { LandingView } from 'src/sections/landing/view';
import { getProductIdea } from '../getProductIdea';
import { getAuthUser } from 'src/auth/getAuthUser';
import { redirect } from 'next/navigation';


export default async function Page() {

  const [{ isReady }, userRes] = await Promise.all([getProductIdea(), getAuthUser()])

  if (isReady && userRes.success && userRes.user) return redirect('/wewish');


  return (
    <>
      <LandingView />
    </>
  );
}
