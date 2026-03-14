'use client';

import { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';
import { Blog } from 'src/types/blog';

export function PostHogPostViewed({ post }: { post: Blog }) {
  const posthog = usePostHog();

  useEffect(() => {
    if (posthog && post) {
      posthog.capture('blog_post_viewed', {
        title: post.title,
        slug: post.slug,
        author: post.author,
        productIdeaId: post.product_idea_id,
        language: post.language,
      });
    }
  }, [posthog, post]);

  return null;
}
