import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useTranslate } from 'src/locales';
import { varAlpha } from 'src/theme/styles';

export const LandingContact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
  };

  const { t } = useTranslate();

  return (
    <Stack
      alignItems="center"
      sx={{
        px: 3,
        py: 8,
        textAlign: 'center',
        background: (theme) =>
          `linear-gradient(270deg, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)})`,
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h3" sx={{ textAlign: 'left' }}>
          {t('landing.contact.title')}
          <br />
          {t('landing.contact.description')}
        </Typography>

        <Box gap={3} display="flex" flexDirection="column" sx={{ my: 5 }}>
          <TextField fullWidth label="Email" required />
          <TextField fullWidth label={t('landing.contact.message')} multiline rows={4} required />
        </Box>

        <Button size="large" variant="contained" type="submit">
          {t('landing.contact.submit')}
        </Button>
      </Box>
    </Stack>
  );
};
