'use client';

import { createContext, useCallback, useMemo, useState } from 'react';

import { useCookies } from 'src/hooks/use-cookies';
import { useLocalStorage } from 'src/hooks/use-local-storage';

import { STORAGE_KEY, defaultSettings } from '../config-settings';

import type { SettingsContextValue, SettingsProviderProps, SettingsState } from '../types';

// ----------------------------------------------------------------------

export const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsConsumer = SettingsContext.Consumer;

// ----------------------------------------------------------------------

export function SettingsProvider({
  children,
  settings,
  caches = 'localStorage',
}: SettingsProviderProps) {
  const { colorScheme, ...restSettings } = settings;
  const { colorScheme: defaultColorScheme, ...defaultRestSettings } = defaultSettings;

  const cookies = useCookies<Omit<SettingsState, 'colorScheme'>>(
    STORAGE_KEY,
    restSettings,
    defaultRestSettings
  );

  const localStorage = useLocalStorage<Omit<SettingsState, 'colorScheme'>>(
    STORAGE_KEY,
    restSettings
  );

  const values = caches === 'cookie' ? cookies : localStorage;

  const [openDrawer, setOpenDrawer] = useState(false);

  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      ...values.state,
      canReset: values.canReset,
      onReset: values.resetState,
      onUpdate: values.setState,
      onUpdateField: values.setField,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
    }),
    [
      values.state,
      values.setField,
      values.setState,
      values.canReset,
      values.resetState,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
    ]
  );

  // @ts-ignore
  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}
