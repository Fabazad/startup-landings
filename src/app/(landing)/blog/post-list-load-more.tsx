'use client';

import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { Iconify } from 'src/components/iconify';
import type { BlogPost } from 'src/types/blog';
import { PostItem } from './post-item';

type Props = {
  initialOffset: number;
  totalCount: number;
  language: string;
  loadMoreText: string;
};

export function PostListLoadMore({ initialOffset, totalCount, language, loadMoreText }: Props) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(initialOffset);

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/list?offset=${offset}&limit=8&lang=${language}`);
      const data = await res.json();
      if (data.blogs && data.blogs.length > 0) {
        setBlogs((prev) => [...prev, ...data.blogs]);
        setOffset((prev) => prev + data.blogs.length);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching blogs', error);
    } finally {
      setLoading(false);
    }
  };

  const hasMore = offset < totalCount;

  return (
    <>
      {blogs.length > 0 && (
        <Grid container spacing={3} sx={{ mt: 0 }}>
          {blogs.map((post) => (
            <Grid key={post.id} xs={12} sm={6} md={4} lg={3}>
              <PostItem post={post} />
            </Grid>
          ))}
        </Grid>
      )}

      {hasMore && (
        <Stack alignItems="center" sx={{ mt: 8, mb: { xs: 10, md: 15 } }}>
          <Button
            size="large"
            variant="outlined"
            onClick={handleLoadMore}
            disabled={loading}
            startIcon={
              loading ? <Iconify icon="svg-spinners:12-dots-scale-rotate" width={24} /> : undefined
            }
          >
            {loadMoreText}
          </Button>
        </Stack>
      )}
    </>
  );
}
