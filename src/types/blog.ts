import { z } from 'zod';
import { PRODUCT_IDEA_NAMES } from 'src/ProductIdeas';
import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type IPostFilters = {
  publish: string;
};

export type IPostHero = {
  title: string;
  coverUrl: string;
  createdAt?: IDateValue;
  author?: { name: string; avatarUrl: string };
};

export type IPostComment = {
  id: string;
  name: string;
  avatarUrl: string;
  message: string;
  postedAt: IDateValue;
  users: { id: string; name: string; avatarUrl: string }[];
  replyComment: {
    id: string;
    userId: string;
    message: string;
    tagUser?: string;
    postedAt: IDateValue;
  }[];
};

export type IPostItem = {
  id: string;
  title: string;
  tags?: string[];
  publish?: string;
  content?: string;
  coverUrl?: string;
  metaTitle?: string;
  totalViews?: number;
  totalShares?: number;
  description?: string;
  totalComments?: number;
  totalFavorites?: number;
  metaKeywords?: string[];
  metaDescription?: string;
  comments?: IPostComment[];
  createdAt: IDateValue;
  favoritePerson?: { name: string; avatarUrl: string }[];
  author: { name: string; avatarUrl?: string };
};

const jsonValueSchema: z.ZodType<unknown> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(jsonValueSchema),
    z.record(jsonValueSchema),
  ])
);

export const blogDataSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  cover_image: z.string().url().optional().or(z.literal('')),
  cover_image_alt: z.string().optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  seo_keywords: z.array(z.string()).optional(),
  schema: jsonValueSchema.optional(),
  product_idea_id: z.nativeEnum(PRODUCT_IDEA_NAMES),
  language: z.string().default('fr'),
  published: z.boolean().default(true),
  author: z.string().default('AI'),
  author_avatar: z.string().optional(),
  // Optional refresh marker. Set to an ISO timestamp to resurface the post to the top of the blog
  // list (its feed_date becomes this value); pass null to drop it back to its original position.
  // Omit on an update to leave ordering untouched — a normal edit must not resurface a post.
  content_refreshed_at: z.string().datetime({ offset: true }).nullable().optional(),
});

export const blogSchema = blogDataSchema.extend({
  id: z.string(),
  // First publication date (datePublished). Stable — never changes on edits.
  created_at: z.string(),
  // Bumped on every edit by a DB trigger. Drives <lastmod> / schema.org dateModified.
  updated_at: z.string(),
  // Ordering key for the blog list = coalesce(content_refreshed_at, created_at).
  // Generated column — never written directly.
  feed_date: z.string(),
});

export type Blog = z.infer<typeof blogSchema>;
export type BlogPost = Pick<
  Blog,
  | 'id'
  | 'title'
  | 'slug'
  | 'excerpt'
  | 'cover_image'
  | 'created_at'
  | 'feed_date'
  | 'author'
  | 'author_avatar'
>;

export const DEFAULT_AUTHOR = {
  name: 'Fabien Turgut',
  avatarUrl: '/assets/images/mock/avatar/avatar-12.webp',
};
