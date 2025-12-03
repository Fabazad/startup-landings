'use client';

import { useGoogleOneTapLogin } from 'react-google-one-tap-login';
import { CONFIG } from 'src/config-global';
import { supabase } from 'src/lib/supabase-client';

export const googleOneTapLogin = () => {
  useGoogleOneTapLogin({
    onError: (error) => console.error(error),
    onSuccess: async (response) => {
      console.log("response", response);
      try {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: "response.credential",
        });

        if (error) {
          console.error('Error signing in with Google One Tap:', error);
        }
      } catch (error) {
        console.error('Error signing in with Google One Tap:', error);
      }
    },
    googleAccountConfigs: {
      client_id: CONFIG.google.clientId,
    },
  });
};