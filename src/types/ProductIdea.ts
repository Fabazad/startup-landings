import { PrimaryColor } from 'src/components/settings';
import { LanguageValue, Translated } from 'src/locales';

type GenericItem<Text extends Translated | string> = {
  icon: string;
  title: Text;
  description: Text;
};

export type Item = GenericItem<string>;
export type RawItem = GenericItem<Translated>;

type GenericFeature<Text extends Translated | string> = {
  icon: string;
  /** Tell that's this is the end of a pain point that the feature solves. max 70 characters. */
  pain: Text;
  title: Text;
  /** Minimum 2 items, maximum 3 items. */
  items: GenericItem<Text>[];
  imgUrl: string;
};

export type Feature = GenericFeature<string>;
export type RawFeature = GenericFeature<Translated>;

type GenericReview<Text extends Translated | string> = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  jobTitle: Text;
  content: Text;
  postedAt: Date;
};

export type Review = GenericReview<string>;
export type RawReview = GenericReview<Translated>;

type GenericPlan<Text extends Translated | string> = {
  price: number;
  included: Text[];
};

export type Plan = GenericPlan<string>;
export type RawPlanPrice = GenericPlan<Translated>;

export type GenericPlans<Text extends Translated | string> = {
  basic: GenericPlan<Text>;
  premium: GenericPlan<Text>;
  ultimate: GenericPlan<Text>;
};
export type RawPlans = GenericPlans<Translated>;
export type Plans = GenericPlans<string>;

type GenericProductIdea<Text extends Translated | string> = {
  id: string;
  name: string;
  /** 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red' **/
  themeColor: PrimaryColor;
  logoUrl: string;
  faviconUrl: string;
  /** Minimum 3 features, maximum 5 features. */
  features: GenericFeature<Text>[];
  heroTexts: {
    /** The description should describe the value proposition of the product. */
    description: Text;
    /** The headings should be punchy and explain the value proposition of the product. */
    headingPart1: Text;
    headingPart2: Text;
  };
  /** 8 or 12 reviews. */
  reviews: GenericReview<Text>[];
  testimonialsTexts: {
    titlePart1: Text;
    titlePart2: Text;
  };
  plans: GenericPlans<Text>;
};

export type ProductIdea = GenericProductIdea<string>;
export type RawProductIdea = GenericProductIdea<Translated>;

export const translateProductIdea = (
  productIdea: RawProductIdea,
  lang: LanguageValue
): ProductIdea => {
  return {
    ...productIdea,
    heroTexts: {
      ...productIdea.heroTexts,
      description: productIdea.heroTexts.description[lang],
      headingPart1: productIdea.heroTexts.headingPart1[lang],
      headingPart2: productIdea.heroTexts.headingPart2[lang],
    },
    testimonialsTexts: {
      ...productIdea.testimonialsTexts,
      titlePart1: productIdea.testimonialsTexts.titlePart1[lang],
      titlePart2: productIdea.testimonialsTexts.titlePart2[lang],
    },
    reviews: productIdea.reviews.map((review) => ({
      ...review,
      content: review.content[lang],
      jobTitle: review.jobTitle[lang],
    })),
    features: productIdea.features.map((feature) => ({
      ...feature,
      title: feature.title[lang],
      pain: feature.pain[lang],
      items: feature.items.map((item) => ({
        ...item,
        title: item.title[lang],
        description: item.description?.[lang],
      })),
    })),
    plans: {
      basic: {
        ...productIdea.plans.basic,
        included: productIdea.plans.basic.included.map((included) => included[lang]),
      },
      premium: {
        ...productIdea.plans.premium,
        included: productIdea.plans.premium.included.map((included) => included[lang]),
      },
      ultimate: {
        ...productIdea.plans.ultimate,
        included: productIdea.plans.ultimate.included.map((included) => included[lang]),
      },
    },
  };
};
