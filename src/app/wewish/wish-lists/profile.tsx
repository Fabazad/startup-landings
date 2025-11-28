'use client';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useAuthContext } from 'src/auth/hooks';
import { m } from 'framer-motion';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Link from 'next/link';

export const Profile = () => {
  const theme = useTheme();
  const { user } = useAuthContext();

  const displayName =
    user?.user_metadata?.full_name ||
    user?.displayName ||
    'Invité';

  const photoURL = user?.photoURL ?? '';

  const borderWidth = 2;

  const spacing = 2;

  const height = {sm : 100, xs : "unset"} ;
  const widthButton = {sm : 200, xs : 180} ;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my : {sm : 4, xs :3} }}>
      <Box sx={{ width: '100%', display: {sm : "flex", xs :"none"}, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: height }}>
          <Box
            sx={{
              width: height,
              height: height,
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, height: "100%", justifyContent:"center" }}>
            <Typography variant="h3" sx={{ ml: 3 }}>
              {displayName}
            </Typography>
            <Typography variant="h6" sx={{ ml: 3, fontWeight: 400 }}>
              <b>0</b> liste •  <b>1</b>  liste suivie • <b>16</b> Envies
            </Typography>
          </Box>
        </Box>
        <Box sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 3 }}>
            <Link href="/wewish/wish-list">
              <Button variant="contained" sx={{ borderRadius: 999, px: 1, py: 1, width: widthButton }}>
                <Typography variant="h6" sx={{ fontWeight: 400 }}>
                  Créer une liste
                </Typography>
              </Button>
            </Link>
            <Button variant="outlined" sx={{ borderRadius: 999, px: 1, py: 1, width: widthButton }}>
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                Modifier mon profil
              </Typography>                </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '100%', display: {xs : "flex", sm :"none"}, flexDirection: 'row', justifyContent:"center" }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection:'column', height: height, gap:2 }}>
  <Box sx={{ display: 'flex', alignItems: 'center', flexDirection:"column" }}>            
    <Typography variant="h3" >
              {displayName}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 400 }}>
              <b>0</b> liste •  <b>1</b>  liste suivie • <b>16</b> Envies
            </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', height: '100%', gap: 2 }}>
            <Link href="/wewish/wish-list">
              <Button variant="contained" sx={{ borderRadius: 999, px: 1, py: 1, width: widthButton }}>
                <Typography variant="h6" sx={{ fontWeight: 400 }}>
                  Créer une liste
                </Typography>
              </Button>
            </Link>
            <Button variant="outlined" sx={{ borderRadius: 999, px: 1, py: 1, width: widthButton }}>
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                Modifier mon profil
              </Typography>                </Button>
          </Box>
</Box>
      </Box>
    </Box>
  );
}
