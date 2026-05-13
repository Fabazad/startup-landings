'use client';

import { useEffect } from 'react';
import { Blog } from 'src/types/blog';
import { capturePostHog } from 'src/app/providers/posthog-client';

export function PostHogPostViewed({ post }: { post: Blog }) {
  useEffect(() => {
    if (post) {
      capturePostHog('blog_post_viewed', {
        title: post.title,
        slug: post.slug,
        author: post.author,
        productIdeaId: post.product_idea_id,
        language: post.language,
      });
    }
  }, [post]);

  return null;
}
