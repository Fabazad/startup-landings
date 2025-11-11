import { Box, Card, Typography, useColorScheme } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useFormContext, useWatch } from 'react-hook-form';
import { Field } from 'src/components/hook-form';
import { varAlpha } from 'src/theme/styles';
import { Feature } from 'src/types/ProductIdea';

export const FeatureOption = ({ feature }: { feature: Feature }) => {
  const theme = useTheme();
  const { mode } = useColorScheme();

  const isSelected = useWatch({ name: feature.id });
  const { setValue } = useFormContext();

  return (
    <Card
      key={feature.id}
      sx={{
        p: 2,
        m: 1,
        borderColor: isSelected
          ? theme.palette.primary.main
          : theme.palette.grey[mode === 'dark' ? 700 : 300],
        borderWidth: 3,
        borderStyle: 'solid',
        cursor: 'pointer',
        transition: 'border-color 0.2s ease-in-out',
        '&:hover': {
          boxShadow: `0 0 10px 0 ${theme.palette.primary.main}`,
          '& .MuiCheckbox-root': {
            backgroundColor: `${varAlpha(theme.vars.palette.primary.mainChannel, theme.palette.action.hoverOpacity)}`,
          },
        },
        display: 'flex',
      }}
      onClick={() => {
        setValue(feature.id, !isSelected);
      }}
    >
      <Field.Checkbox name={feature.id} label="" />
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
          {feature.title}
        </Typography>
        <ul>
          {feature.items.map((item) => (
            <li>
              <Typography key={item.title} variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                {item.title}
              </Typography>
            </li>
          ))}
        </ul>
      </Box>
    </Card>
  );
};
