import { z } from 'zod';
import type { IDateValue } from './common';
import { PRODUCT_IDEA_NAMES } from 'src/ProductIdeas';

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

export const blogDataSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  cover_image: z.string().url().optional().or(z.literal('')),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  seo_keywords: z.array(z.string()).optional(),
  product_idea_id: z.nativeEnum(PRODUCT_IDEA_NAMES),
  language: z.string().default('fr'),
  published: z.boolean().default(true),
  author: z.string().default('AI'),
});

export const blogSchema = blogDataSchema.extend({
  id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Blog = z.infer<typeof blogSchema>;
export type BlogPost = Pick<
  Blog,
  'id' | 'title' | 'slug' | 'excerpt' | 'cover_image' | 'created_at' | 'author'
>;
