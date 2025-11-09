import { RawProductIdea } from 'src/types/ProductIdea';
import { INSIGHTFEED_JSON2 } from './InsightFeed/json2';
import { TRIPLY_PRODUCT_IDEA } from './Triply';

export const PRODUCT_IDEA_NAMES = {
  INSIGHTFEED: 'InsightFeed',
  TRIPLY: 'Triply',
} as const;

export type ProductIdeaName = (typeof PRODUCT_IDEA_NAMES)[keyof typeof PRODUCT_IDEA_NAMES];

export const RAW_PRODUCT_IDEAS: Record<ProductIdeaName, RawProductIdea> = {
  [PRODUCT_IDEA_NAMES.INSIGHTFEED]: INSIGHTFEED_JSON2,
  [PRODUCT_IDEA_NAMES.TRIPLY]: TRIPLY_PRODUCT_IDEA,
} as const;
