import { Breakpoint, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AnimatedDiv } from './animated-div';

export const HeroDescription = ({
  smKey,
  lgKey,
  children,
}: {
  smKey: number | Breakpoint;
  lgKey: number | Breakpoint;
  children: React.ReactNode;
}) => {
  const theme = useTheme();
  return (
    <AnimatedDiv>
      <Typography
        variant="body2"
        sx={{
          mx: 'auto',
          [theme.breakpoints.up(smKey)]: { whiteSpace: 'pre' },
          [theme.breakpoints.up(lgKey)]: { fontSize: 20, lineHeight: '36px' },
        }}
      >
        {children}
      </Typography>
    </AnimatedDiv>
  );
};
