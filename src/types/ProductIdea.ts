import { PrimaryColor } from 'src/components/settings';
import { LanguageValue, Translated } from 'src/locales';

type GenericItem<Text extends Translated | string> = {
  icon: string;
  title: Text;
  description?: Text;
};

export type Item = GenericItem<string>;
export type RawItem = GenericItem<Translated>;

type GenericFeature<Text extends Translated | string> = {
  id: string;
  /** Use names from Material Design Icons ones. ex: mdi:account-sync */
  icon: string;
  /** Tell that's this is the end of a pain point that the feature solves and how it solves it. max 70 characters. */
  pain: Text;
  title: Text;
  /** 2 or 3 items. Avoid using too many items. */
  items: GenericItem<Text>[];
  imgUrl: string;
};

export type Feature = GenericFeature<string>;
export type RawFeature = GenericFeature<Translated>;

type GenericReview<Text extends Translated | string> = {
  id: string;
  /** First name and first letter of the last name. Try using non gendered names. */
  name: string;
  /** The rating should be either 4 or 5. with 80% of the reviews being 5 stars. */
  rating: number;
  /** The job title should be a the name of the reviewer's role. Matching the personas of the product. */
  jobTitle: Text;
  /** The content should be a short review of the product. Max 120 characters. */
  content: Text;
  /** Can be formatted as 'new Date('2025-05-06T10:15:00.000Z')'. */
  postedAt: Date;
};

export type Review = GenericReview<string>;
export type RawReview = GenericReview<Translated>;

type GenericPlan<Text extends Translated | string> = {
  /** The target persona of the plan or/and the use case of the plan. */
  target: Text;
  price: number;
  /** The included options of the plan. Max 5 items, avoid using too many items. */
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
  /** By default false. */
  isReady: boolean;
  name: string;
  /** 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red' | 'lavender' **/
  themeColor: PrimaryColor;
  /** The logo should be either 'panda' => cute logo, 'octopus' => more professional logo or 'heart' => more modern logo. */
  logo: 'panda' | 'octopus' | 'heart' | 'gift';
  ctaName?: Text;
  /** Minimum 3 features, maximum 5 features. */
  features: GenericFeature<Text>[];
  heroTexts: {
    /** The description should describe best the value proposition of the product. It has to be punchy, can use multiple lines. Max 300 characters.*/
    description: Text;
    /** The headings should be punchy, short (each heading should be max 20 characters) and should clearly describe what the product does. */
    headingPart1: Text;
    headingPart2: Text;
  };
  /** 8 or 12 reviews. */
  reviews: GenericReview<Text>[];
  testimonialsTexts: {
    titlePart1: Text;
    titlePart2: Text;
  };
  testimonialNumbers: Array<{ label: Text; value: number; unit?: string }>
  plans: GenericPlans<Text> | null;
};

export type ProductIdea = GenericProductIdea<string>;
export type RawProductIdea = GenericProductIdea<Translated>;

export const translateProductIdea = (
  productIdea: RawProductIdea,
  lang: LanguageValue
): ProductIdea => {
  return {
    ...productIdea,
    ctaName: productIdea.ctaName?.[lang],
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
    plans: productIdea.plans === null ? null : {
      basic: {
        ...productIdea.plans.basic,
        target: productIdea.plans.basic.target[lang],
        included: productIdea.plans.basic.included.map((included) => included[lang]),
      },
      premium: {
        ...productIdea.plans.premium,
        target: productIdea.plans.premium.target[lang],
        included: productIdea.plans.premium.included.map((included) => included[lang]),
      },
      ultimate: {
        ...productIdea.plans.ultimate,
        target: productIdea.plans.ultimate.target[lang],
        included: productIdea.plans.ultimate.included.map((included) => included[lang]),
      },
    },
    testimonialNumbers: productIdea.testimonialNumbers.map((item) => ({
      ...item,
      label: item.label[lang],
    })),
  };
};
