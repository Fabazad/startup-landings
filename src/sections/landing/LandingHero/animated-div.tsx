import { Box, BoxProps } from '@mui/material';
import { m } from 'framer-motion';
import { varFade } from 'src/components/animate';

export const AnimatedDiv = ({
  children,
  component = m.div,
}: BoxProps & { children: React.ReactNode }) => {
  return (
    <Box component={component} variants={varFade({ distance: 24 }).inUp}>
      {children}
    </Box>
  );
};
