import { Box } from '@mui/material';
import { useTheme, type SxProps, type Theme } from '@mui/material/styles';
import { m } from 'framer-motion';
import { textGradient } from 'src/theme/styles';

export const TextGradient = ({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}) => {
  const theme = useTheme();
  return (
    <Box
      component={m.span}
      animate={{ backgroundPosition: '200% center' }}
      transition={{
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      sx={{
        ...textGradient(
          `300deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.warning.main} 25%, ${theme.vars.palette.primary.main} 50%, ${theme.vars.palette.warning.main} 75%, ${theme.vars.palette.primary.main} 100%`
        ),
        backgroundSize: '400%',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
