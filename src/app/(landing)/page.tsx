import { Metadata } from 'next';
import { headers } from 'next/headers';
import { languages } from 'src/locales/config-locales';
import { SoftwareStructuredData } from 'src/components/seo/structured-data';
import { LandingView } from 'src/sections/landing/view';
import { AuthProvider } from '../providers/auth-provider';
import { getRawProductIdea } from '../getProductIdea';

// Revalidate this page every hour (ISR)
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  return {
    alternates: {
      canonical: baseUrl,
      languages: Object.fromEntries(languages.map((lang) => [lang, `${baseUrl}?lang=${lang}`])),
    },
  };
}

export default async function Page() {
  const rawProductIdea = await getRawProductIdea();

  return (
    <AuthProvider productName={rawProductIdea.name}>
      <SoftwareStructuredData rawProductIdea={rawProductIdea} />
      <LandingView />
    </AuthProvider>
  );
}
