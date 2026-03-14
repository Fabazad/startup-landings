import type { Blog, BlogPost } from 'src/types/blog';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { Markdown } from 'src/components/markdown';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { getServerTranslations } from 'src/locales/server';
import { PostItem } from '../post-item';
import { PostDetailsHero } from './post-details-hero';
import { PostHogPostViewed } from './posthog-post-viewed';

// ----------------------------------------------------------------------

type Props = {
  post: Blog;
  latestPosts: BlogPost[];
};

export async function PostDetailsHomeView({ post, latestPosts }: Props) {
  const { t } = await getServerTranslations();

  return (
    <>
      <PostHogPostViewed post={post} />
      <PostDetailsHero
        title={post.title}
        author={{ name: post.author, avatarUrl: '' }}
        coverUrl={post.cover_image || ''}
        createdAt={post.created_at}
      />

      <Container maxWidth={false} sx={{ py: 3, mb: 5, borderBottom: 'solid 1px divider' }}>
        <CustomBreadcrumbs
          links={[
            { name: t('landing.nav.home'), href: '/' },
            { name: t('blog.title'), href: paths.post.root },
            { name: post?.title },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Typography variant="subtitle1">{post.excerpt}</Typography>
          <Markdown>{post.content}</Markdown>
        </Stack>
      </Container>

      {!!latestPosts?.length && (
        <Container sx={{ pb: 15 }}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            {t('blog.recentPosts')}
          </Typography>

          <Grid container spacing={3}>
            {latestPosts?.slice(latestPosts.length - 4).map((latestPost) => (
              <Grid key={latestPost.id} xs={12} sm={6} md={4} lg={3}>
                <PostItem post={latestPost} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
}
