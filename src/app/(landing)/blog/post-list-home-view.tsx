import type { BlogPost } from 'src/types/blog';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { PostList } from './post-list';

// ----------------------------------------------------------------------

type Props = {
  posts: BlogPost[];
};

export function PostListHomeView({ posts }: Props) {
  return (
    <Container>
      <Typography variant="h3">Blog Envy</Typography>

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <PostList posts={posts} />
    </Container>
  );
}
