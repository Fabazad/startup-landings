import type { ButtonProps } from '@mui/material/Button';
import type { Theme, SxProps } from '@mui/material/styles';
import { useCallback } from 'react';
import Button from '@mui/material/Button';
import { toast } from 'src/components/snackbar';
import { useAuthContext } from 'src/auth/hooks';
import { signOut } from 'src/auth/context/supabase/action';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

type Props = ButtonProps & {
  sx?: SxProps<Theme>;
  onClose?: () => void;
};

export function SignOutButton({ onClose, ...other }: Props) {

  const router = useRouter();

  const { checkUserSession } = useAuthContext();


  const handleLogout = useCallback(async () => {
    try {
      await signOut();
      await checkUserSession?.();
      onClose?.();
      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error('Unable to logout!');
    }
  }, [checkUserSession, onClose]);

  return (
    <Button
      fullWidth
      variant="soft"
      size="large"
      color="error"
      onClick={handleLogout}
      {...other}
    >
      Logout
    </Button>
  );
}
