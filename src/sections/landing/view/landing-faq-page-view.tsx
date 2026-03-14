'use client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Stack from '@mui/material/Stack';

import { m } from 'framer-motion';

import { MotionViewport, varFade } from 'src/components/animate';
import { Iconify } from 'src/components/iconify';
import { GenericFAQPage } from 'src/types/ProductIdea';
import { LandingScrollUI } from './landing-scroll-ui';
import { LandingAdvertisement } from '../landing-advertisement';

type Props = {
  faqPage: GenericFAQPage<string>;
};

export function LandingFaqPageView({ faqPage }: Props) {
  return (
    <>
      <LandingScrollUI />

      <Container sx={{ py: 7 }}>
        <MotionViewport>
          <Container>
            <Stack
              spacing={3}
              sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center', alignItems: 'center' }}
            >
              <m.div variants={varFade().inUp}>
                <Iconify icon={faqPage.icon} width={80} sx={{ color: 'primary.main', mb: 3 }} />
                <Typography variant="h2">{faqPage.hero.title}</Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography sx={{ color: 'text.secondary', maxWidth: 600 }}>
                  {faqPage.hero.subtitle}
                </Typography>
              </m.div>
            </Stack>

            <Stack spacing={8}>
              {faqPage.sections.map((section, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <Stack key={`section-${idx}`} spacing={3}>
                  <m.div variants={varFade().inUp}>
                    <Typography variant="h4">{section.title}</Typography>
                  </m.div>

                  <Stack spacing={2}>
                    {section.items.map((item) => (
                      <m.div key={item.id} variants={varFade().inUp}>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                          >
                            <Typography variant="subtitle1">{item.question}</Typography>
                          </AccordionSummary>

                          <AccordionDetails>
                            <Typography sx={{ color: 'text.secondary' }}>{item.answer}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      </m.div>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Container>
        </MotionViewport>
      </Container>

      {/* Optionally append an advertisement at the bottom if appropriate */}
      <LandingAdvertisement />
    </>
  );
}
