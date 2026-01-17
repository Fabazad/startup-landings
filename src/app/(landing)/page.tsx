import { LandingView } from 'src/sections/landing/view';

// Revalidate this page every hour (ISR)
export const revalidate = 3600;

export default async function Page() {

  return <LandingView />;
}
