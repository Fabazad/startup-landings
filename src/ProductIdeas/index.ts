import { RawProductIdea } from 'src/types/ProductIdea';
import { INSIGHTFEED_PRODUCT_IDEA } from './InsightFeed';

export const PRODUCT_IDEA_NAMES = {
  INSIGHTFEED: 'InsightFeed',
} as const;

export type ProductIdeaName = (typeof PRODUCT_IDEA_NAMES)[keyof typeof PRODUCT_IDEA_NAMES];

export const RAW_PRODUCT_IDEAS: Record<ProductIdeaName, RawProductIdea> = {
  [PRODUCT_IDEA_NAMES.INSIGHTFEED]: INSIGHTFEED_PRODUCT_IDEA,
} as const;
