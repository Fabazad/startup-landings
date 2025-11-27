'use client';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useAuthContext } from 'src/auth/hooks';
import { m } from 'framer-motion';
import Box from '@mui/material/Box';
import { LayoutSection } from 'src/layouts/core/layout-section';

export default function Page() {
  const theme = useTheme();
  const { user } = useAuthContext();

  const displayName =
    user?.user_metadata?.full_name ||
    user?.displayName ||
    'Invité';

  const photoURL = user?.photoURL ?? '';

  const borderWidth = 2;

  const spacing = 2;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '75%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', mt: 3 }}>
          <Box
            sx={{
              width: 180,
              height: 180,
              flexShrink: 0,
              borderRadius: '50%',
              position: 'relative',
              alignItems: 'center',
              display: 'inline-flex',
              justifyContent: 'center',
            }}
          >
            <Avatar
              src={photoURL}
              sx={{
                zIndex: 1,
                width: `calc(100% - ${borderWidth * 2 + spacing * 2}px)`,
                height: `calc(100% - ${borderWidth * 2 + spacing * 2}px)`,
              }}
            >
              {displayName?.charAt(0).toUpperCase()}
            </Avatar>

            <Box
              component={m.span}
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                ease: 'linear',
                repeat: Infinity,
              }}
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
                p: `${borderWidth}px`,
              }}
            />
          </Box>
          <Box sx={{display:"flex", flexDirection:"column", gap:"3", height:"auto", mt:"3"}}>
            <Typography variant="h4" sx={{ ml: 3 }}>
              {displayName}
            </Typography>
            <Typography variant="h6" sx={{ ml: 3, fontWeight: 400 }}>
              <b>0</b> liste • <b>1</b> liste suivie • <b>16</b> Envies
            </Typography>
          </Box>      
        </Box>
      </Box>
    </Box>
  );
}
