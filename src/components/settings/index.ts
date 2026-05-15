// `./drawer` is intentionally NOT re-exported here. The settings drawer pulls
// in `Scrollbar` -> `simplebar-react` (~24 KB) and a render-blocking CSS file.
// No landing route mounts the drawer, so importing it through this barrel
// (e.g. for `useSettingsContext`) would leak that weight into every visit.
// If a screen ever needs the drawer, deep-import it from `./drawer` directly.

export * from './context';

export type * from './types';

export * from './config-settings';
