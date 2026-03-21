'use client';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// ----------------------------------------------------------------------

type Props = {
  content: string;
};

export function LandingPrivacyPolicyView({ content }: Props) {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 5, md: 10 } }}>
      <Box
        sx={{
          '& h1': {
            typography: 'h3',
            mb: 3,
          },
          '& h2': {
            typography: 'h5',
            mt: 4,
            mb: 2,
          },
          '& h3': {
            typography: 'h6',
            mt: 3,
            mb: 1.5,
          },
          '& p': {
            typography: 'body1',
            mb: 2,
            color: 'text.secondary',
          },
          '& ul': {
            pl: 3,
            mb: 2,
            listStyleType: 'disc',
          },
          '& ol': {
            pl: 3,
            mb: 2,
            listStyleType: 'decimal',
          },
          '& li': {
            typography: 'body1',
            color: 'text.secondary',
            mb: 0.5,
            display: 'list-item',
          },
          '& a': {
            color: 'primary.main',
            textDecoration: 'underline',
          },
          '& hr': {
            my: 3,
            borderColor: 'divider',
          },
          '& table': {
            width: '100%',
            borderCollapse: 'collapse',
            mb: 2,
          },
          '& th, & td': {
            border: '1px solid',
            borderColor: 'divider',
            px: 2,
            py: 1,
            typography: 'body2',
          },
          '& th': {
            bgcolor: 'background.neutral',
            fontWeight: 'bold',
          },
          '& strong': {
            fontWeight: 600,
          },
          '& em': {
            fontStyle: 'italic',
            color: 'text.secondary',
          },
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </Box>
    </Container>
  );
}
