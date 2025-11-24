import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { GoogleIcon } from 'src/assets/icons';

// ----------------------------------------------------------------------

type FormSocialsProps = BoxProps & {
  signInWithGoogle: () => void;
};

export function FormSocials({
  sx,
  signInWithGoogle,
  ...other
}: FormSocialsProps) {
  return (
    <Box gap={1.5} display="flex" justifyContent="center" sx={sx} {...other}>
      <IconButton color="inherit" onClick={signInWithGoogle}>
        <GoogleIcon width={22} />
      </IconButton>
    </Box >
  );
}
