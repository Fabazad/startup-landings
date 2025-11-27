'use client';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import { useAuthContext } from 'src/auth/hooks';
import { m } from 'framer-motion';
import Box from '@mui/material/Box';
import { varAlpha } from 'src/theme/styles';




export default function Page() {
  const theme = useTheme();
  const { user } = useAuthContext();

  const displayName =
    user?.user_metadata?.full_name ||
    user?.displayName ||
    'Invité';

  const photoURL = user?.photoURL ?? '';

  const borderWidth = 2;

  const spacing =  2;

  return (
    <div>

<Box
      sx={{
        width : 128,
        height: 128,
        flexShrink: 0,
        borderRadius: '50%',
        position: 'relative',
        alignItems: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
        overlay: {
          border: 2,
          spacing: 3,
          color: `conic-gradient(${theme.vars.palette.primary.main}, ${theme.vars.palette.warning.main}, ${theme.vars.palette.primary.main})`,
       }
      }}
    >
      <Avatar
        src= {photoURL}
        sx={{
          zIndex: 1,
          width: `calc(100% - ${borderWidth * 2 + spacing * 2}px)`,
          height: `calc(100% - ${borderWidth * 2 + spacing * 2}px)`,
          overlay: {
            border: 2,
            spacing: 3,
            color: `conic-gradient(${theme.vars.palette.primary.main}, ${theme.vars.palette.warning.main}, ${theme.vars.palette.primary.main})`,
         },
        }}
      >
        {displayName?.charAt(0).toUpperCase()}
      </Avatar>
      <Box
        component={m.span}
        sx={{
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          borderRadius: 'inherit',
          background: `conic-gradient(${theme.vars.palette.primary.main}, ${theme.vars.palette.warning.main}, ${theme.vars.palette.primary.main})`,
          mask: 'linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)',
          WebkitMask: 'linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          p: `2px`,
        }}
      />
    </Box>
    </div>
  );
}
