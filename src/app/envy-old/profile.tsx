import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Link from 'next/link';
import { RotatingBackground } from './components/RotatingBackground';
import { User } from './types/User';
import { paths } from 'src/routes/paths';
import { Iconify } from 'src/components/iconify';

export const Profile = ({ user, userStats }: { user: User; userStats: { wishListCount: number, wishCount: number, followingCount: number } }) => {

  const displayName = user.displayName || 'Invité';

  const photoURL = user.avatarUrl ?? '';

  const borderWidth = 2;

  const spacing = 2;

  const height = { sm: 100, xs: "unset" };
  const widthButton = { sm: 200, xs: 180 };

  // Chloé, utilises les userStats pour afficher les données

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
      <Box sx={{ width: '100%', display: { sm: "flex", xs: "none" }, flexDirection: 'row', justifyContent: 'space-between' }}>
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

            <RotatingBackground />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, height: "100%", justifyContent: "center" }}>
            <Typography variant="h3" sx={{ ml: 3 }}>
              {displayName}
            </Typography>
            <Typography variant="h6" sx={{ ml: 3, fontWeight: 400 }}>
              <b>{userStats.wishListCount}</b> {userStats.wishListCount > 1 ? ' listes' : ' liste'} •  <b>{userStats.followingCount}</b>{userStats.followingCount > 1 ? ' listes suivies' : ' liste suivie'} • <b>{userStats.wishCount}</b> {userStats.wishCount > 1 ? 'Envies' : 'Envie'}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 3 }}>
            <Link href={paths.envy.wishList.create}>
              <Button startIcon={<Iconify icon="eva:plus-fill" />} variant="contained" sx={{ borderRadius: 999, px: 3, py: 1, width: widthButton }}>
                <Typography variant="h6" sx={{ fontWeight: 400 }}>
                  Créer une liste
                </Typography>
              </Button>
            </Link>
            <Button variant="outlined" sx={{ borderRadius: 999, px: 1, py: 1, width: widthButton }} href={paths.envy.account.profile}>
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                Modifier mon profil
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '100%', display: { xs: "flex", sm: "none" }, flexDirection: 'row', justifyContent: "center" }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: height, gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: "column" }}>
            <Typography variant="h3" >
              {displayName}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 400 }}>
              <b>{userStats.wishListCount}</b> {userStats.wishListCount > 1 ? ' listes' : ' liste'} •  <b>{userStats.followingCount}</b>{userStats.followingCount > 1 ? ' listes suivies' : ' liste suivie'} • <b>{userStats.wishCount}</b> {userStats.wishCount > 1 ? 'Envies' : 'Envie'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', height: '100%', gap: 2 }}>
            <Link href={paths.envy.wishList.create}>
              <Button startIcon={<Iconify icon="eva:plus-fill" />} variant="contained" sx={{ borderRadius: 999, px: 1, py: 1, width: widthButton }}>
                <Typography variant="h6" sx={{ fontWeight: 400 }}>
                  Créer une liste
                </Typography>
              </Button>
            </Link>
            <Button variant="outlined" sx={{ borderRadius: 999, px: 1, py: 1, width: widthButton }} href={paths.envy.account.profile}>
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                Modifier mon profil
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
