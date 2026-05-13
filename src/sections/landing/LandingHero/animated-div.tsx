import { Box, BoxProps } from '@mui/material';

/**
 * Wrapper for hero text blocks. Previously used framer-motion to fade in on
 * mount, but that rendered children with `opacity: 0` server-side, leaving the
 * hero visually empty until React hydration + animation completed. That hurt
 * Speed Index significantly. We now render plain markup so the SSR'd hero
 * content paints as soon as the browser receives the HTML and CSS.
 */
export function AnimatedDiv({ children, ...other }: BoxProps & { children: React.ReactNode }) {
  return <Box {...other}>{children}</Box>;
}
