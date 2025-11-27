'use client';

import { useAuthContext } from 'src/auth/hooks';
import Box from '@mui/material/Box';


export default function Page() {
  const { user } = useAuthContext();


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    </Box>
  );
}
