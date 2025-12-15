import { RawProductIdea } from 'src/types/ProductIdea';
import { INSIGHTFEED_JSON } from './InsightFeed/json';
import { TRAIN_BACK_PRODUCT_IDEA } from './TrainBack/json';
import { TRIPLY_PRODUCT_IDEA } from './Triply';
import { VIBY_PRODUCT_IDEA } from './Viby/json';
import { WE_WISH_PRODUCT_IDEA } from './Envy/json';


export const PRODUCT_IDEA_NAMES = {
  INSIGHT_FEED: 'INSIGHT_FEED',
  TRIPLY: 'TRIPLY',
  TRAIN_BACK: 'TRAIN_BACK',
  VIBY: 'VIBY',
  WE_WISH: 'WE_WISH',
} as const;

export type ProductIdeaName = (typeof PRODUCT_IDEA_NAMES)[keyof typeof PRODUCT_IDEA_NAMES];

export const RAW_PRODUCT_IDEAS: Record<ProductIdeaName, RawProductIdea> = {
  [PRODUCT_IDEA_NAMES.INSIGHT_FEED]: INSIGHTFEED_JSON,
  [PRODUCT_IDEA_NAMES.TRIPLY]: TRIPLY_PRODUCT_IDEA,
  [PRODUCT_IDEA_NAMES.TRAIN_BACK]: TRAIN_BACK_PRODUCT_IDEA,
  [PRODUCT_IDEA_NAMES.VIBY]: VIBY_PRODUCT_IDEA,
  [PRODUCT_IDEA_NAMES.WE_WISH]: WE_WISH_PRODUCT_IDEA,
} as const;

export const DEFAULT_PRODUCT_IDEA: RawProductIdea = RAW_PRODUCT_IDEAS.INSIGHT_FEED;
