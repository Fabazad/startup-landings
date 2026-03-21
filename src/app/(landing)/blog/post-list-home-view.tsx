import type { BlogPost } from 'src/types/blog';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getServerTranslations } from 'src/locales/server';
import { PostList } from './post-list';

// ----------------------------------------------------------------------

type Props = {
  posts: BlogPost[];
  totalCount: number;
  language: string;
};

export async function PostListHomeView({ posts, totalCount, language }: Props) {
  const { t } = await getServerTranslations();

  return (
    <Container>
      <Typography variant="h3">{t('blog.title')}</Typography>

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <PostList posts={posts} totalCount={totalCount} language={language} />
    </Container>
  );
}
