// Deep import: the `settings` barrel previously re-exported `./drawer`,
// which transitively pulled `Scrollbar` -> `simplebar-react` and its
// render-blocking CSS into the landing chunk. The barrel no longer
// re-exports the drawer, but we still import deeply here to make the
// minimal dependency explicit.
import { defaultSettings } from 'src/components/settings/config-settings';

// ----------------------------------------------------------------------

export const schemeConfig = {
  modeStorageKey: 'theme-mode',
  defaultMode: defaultSettings.colorScheme,
};
