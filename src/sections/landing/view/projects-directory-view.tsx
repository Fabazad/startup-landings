'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import { ProductIdea } from 'src/types/ProductIdea';
import { useTranslate } from 'src/locales/use-locales';

import { Logo } from 'src/components/logo';

type Props = {
  productIdeas: ProductIdea[];
  baseUrl: string;
  protocol: string;
};

export function ProjectsDirectoryView({ productIdeas, baseUrl, protocol }: Props) {
  const { t } = useTranslate();
  const displayIdeas = productIdeas.filter((idea) => idea.id !== 'onama');
  const baseDomain = baseUrl.replace(/^www\./, '');

  return (
    <Container sx={{ py: 10 }}>
      <Box sx={{ mb: 10, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          {t('projects_directory_title', { defaultValue: 'Our Projects' })}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('projects_directory_subtitle', {
            defaultValue: 'Discover the portfolio of innovative applications built by Onama.',
          })}
        </Typography>
      </Box>

      <Box
        gap={4}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {displayIdeas.map((idea) => {
          const targetUrl = `${protocol}://${idea.id}.${baseDomain}`;

          return (
            <Card
              key={idea.id}
              sx={{
                height: '100%',
                borderRadius: 2,
                boxShadow: (theme) => theme.customShadows.z8,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: (theme) => theme.customShadows.z24,
                },
              }}
            >
              <CardActionArea
                component="a"
                href={targetUrl}
                sx={{
                  height: '100%',
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}
              >
                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'background.neutral',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Logo
                    themeColor={idea.themeColor}
                    logo={idea.logo}
                    productName={idea.name}
                    width={48}
                    height={48}
                  />
                </Box>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 'fontWeightBold' }}>
                  {idea.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                  {idea.heroTexts.description}
                </Typography>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
}
