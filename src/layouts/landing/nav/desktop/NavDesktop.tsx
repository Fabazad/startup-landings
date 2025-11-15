import { Button, Link, Stack } from '@mui/material';
import { useProductIdea } from 'src/app/product-idea-provider';
import { MegaMenuHorizontal } from 'src/components/mega-menu';
import { useTranslate } from 'src/locales';

export const NavDesktop = () => {
  const { t } = useTranslate();

  const { features } = useProductIdea();

  return (
    <Stack direction="row" gap={2} sx={{ display: { xs: 'none', md: 'flex' }, mx: 3 }}>
      <MegaMenuHorizontal
        data={[
          {
            title: t('landing.nav.features'),
            path: '#',
            children: [
              {
                items: features.map((feature) => ({
                  title: feature.title,
                  path: `#feature-${feature.id}`,
                })),
              },
            ],
          },
        ]}
        slotProps={{
          rootItem: {
            title: {
              fontWeight: 'bold',
              py: 0.5,
              pl: 1,
            },
          },
          subItem: {
            mb: 1.5,
            textDecoration: 'none',
            fontSize: '0.9rem',
            '&:hover': {
              textDecoration: 'none',
              color: 'primary.light',
            },
          },
        }}
      />
      <Button component={Link} href="#pricing" sx={{ px: 1 }}>
        {t('landing.nav.pricing')}
      </Button>
      <Button component={Link} href="#testimonials" sx={{ px: 2 }}>
        {t('landing.nav.testimonials')}
      </Button>
      <Button component={Link} href="#contact" sx={{ px: 2 }}>
        {t('landing.nav.contact')}
      </Button>
    </Stack>
  );
};
