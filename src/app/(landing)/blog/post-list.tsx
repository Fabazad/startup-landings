import type { BlogPost } from 'src/types/blog';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import { getServerTranslations } from 'src/locales/server';
import { PostItem, PostItemLatest } from './post-item';
import { PostItemSkeleton } from './post-skeleton';
import { PostListLoadMore } from './post-list-load-more';

// ----------------------------------------------------------------------

type Props = {
  posts: BlogPost[];
  totalCount: number;
  language: string;
  loading?: boolean;
};

export async function PostList({ posts, totalCount, language, loading = false }: Props) {
  const { t } = await getServerTranslations();

  const renderLoading = (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
    >
      <PostItemSkeleton />
    </Box>
  );

  const renderList = (
    <Grid container spacing={3}>
      {posts.slice(0, 3).map((post, index) => (
        <Grid
          key={post.id}
          xs={12}
          sm={6}
          md={4}
          lg={index === 0 ? 6 : 3}
          sx={{ display: { xs: 'none', lg: 'block' } }}
        >
          <PostItemLatest post={post} index={index} />
        </Grid>
      ))}

      {posts.slice(0, 3).map((post) => (
        <Grid key={post.id} xs={12} sm={6} md={4} lg={3} sx={{ display: { lg: 'none' } }}>
          <PostItem post={post} />
        </Grid>
      ))}

      {posts.slice(3, posts.length).map((post) => (
        <Grid key={post.id} xs={12} sm={6} md={4} lg={3}>
          <PostItem post={post} />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <>
      {loading ? renderLoading : renderList}

      {totalCount > 7 && (
        <PostListLoadMore
          initialOffset={7}
          totalCount={totalCount}
          language={language}
          loadMoreText={t('blog.loadMore')}
        />
      )}
    </>
  );
}
