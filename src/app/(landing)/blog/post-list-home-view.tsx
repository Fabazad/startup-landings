import type { BlogPost, IPostItem } from 'src/types/blog';

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
      <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
        Blog
      </Typography>

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
       
      </Stack>

      <PostList posts={posts} />
    </Container>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: IPostItem[];
  sortBy: string;
};
