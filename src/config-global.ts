import { paths } from 'src/routes/paths';

import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
  assetsDir: string;
  isStaticExport: boolean;
  auth: {
    method: 'jwt' | 'amplify' | 'firebase' | 'supabase' | 'auth0';
    skip: boolean;
    redirectPath: string;
  };
  mapboxApiKey: string;
  supabase: { url: string; key: string };
  posthog: { key: string; host: string };
  resend: { apiKey: string };
  amazon: { affiliateTag: string; accessKey: string; secretKey: string };
  openai: { apiKey: string };
  listy: { projectSession: string }
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'Minimal UI',
  appVersion: packageJson.version,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? '',
  assetsDir: process.env.NEXT_PUBLIC_ASSETS_DIR ?? '',
  isStaticExport: JSON.parse(`${process.env.BUILD_STATIC_EXPORT}`),
  /**
   * Auth
   * @method jwt | amplify | firebase | supabase | auth0
   */
  auth: {
    method: 'supabase',
    skip: false,
    redirectPath: paths.envy.root,
  },
  /**
   * Mapbox
   */
  mapboxApiKey: process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? '',
  /**
   * Supabase
   */
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  },
  /**
   * Posthog
   */
  posthog: {
    key: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '',
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? '',
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY ?? '',
  },
  amazon: {
    affiliateTag: 'meekoloc04-21',
    accessKey: process.env.AMAZON_ACCESS_KEY ?? '',
    secretKey: process.env.AMAZON_SECRET_KEY ?? '',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY ?? '',
  },
  listy: {
    projectSession: process.env.LISTY_PROJECT_SESSION ?? '',
  }
};
