import { Divider } from '@mui/material';
import { varAlpha } from 'src/theme/styles';
import { FloatLine, FloatPlusIcon } from '../components/svg-elements';

export const Lines = ({ isFirst }: { isFirst: boolean }) => (
  <>
    {isFirst && (
      <>
        <FloatPlusIcon sx={{ top: 52, left: 72 }} />
        <FloatLine sx={{ top: 60, left: 0 }} />
      </>
    )}
    <FloatPlusIcon sx={{ bottom: 0, left: 72 }} />
    <FloatLine vertical sx={{ top: 0, left: 80 }} />
    <FloatLine sx={{ bottom: 7, left: 0 }} />
    <Divider
      component="div"
      sx={{
        width: 1,
        opacity: 0.16,
        height: '1px',
        border: 'none',
        position: 'absolute',
        background: (theme) =>
          `linear-gradient(to right, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)} 0%, ${theme.vars.palette.grey[500]} 50%, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)} 100%)`,
        bottom: 0,
        display: { xs: 'block', md: 'none' },
      }}
    />
  </>
);
