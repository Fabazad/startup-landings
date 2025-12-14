'use client';

import { useContext } from 'react';

import { AuthContext } from '../context/auth-context';
import { User } from 'src/app/envy/types/User';
import { AuthContextValue } from '../types';

// ----------------------------------------------------------------------

export function useAuthContext(): { user?: User; authenticated: boolean; checkUserSession: AuthContextValue['checkUserSession']; loading: AuthContextValue['loading'] } {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext: Context must be used inside AuthProvider');
  }

  const user = context.user ? {
    id: context.user.id,
    displayName: context.user.user_metadata?.displayName || context.user.user_metadata?.display_name || context.user.user_metadata?.full_name,
    avatarUrl: context.user.user_metadata?.avatarUrl || context.user.user_metadata?.avatar_url,
    about: context.user.user_metadata?.about,
    birthday: context.user.user_metadata?.birthday,
    email: context.user.email!,
    hasPassword: context.user.user_metadata?.has_password === true
  } : undefined;

  return {
    authenticated: context.authenticated,
    user,
    checkUserSession: context.checkUserSession,
    loading: context.loading
  };
}
