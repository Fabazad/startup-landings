import { Translated } from 'src/locales';
import { GenericPlans, RawProductIdea } from 'src/types/ProductIdea';

type StructuredDataProps = {
  rawProductIdea: RawProductIdea;
  baseUrl: string;
};

export function StructuredData({ rawProductIdea, baseUrl }: StructuredDataProps) {
  // SoftwareApplication schema
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: rawProductIdea.name,
    description: rawProductIdea.heroTexts.description.en,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    offers: rawProductIdea.plans === null ? undefined : {
      '@type': 'AggregateOffer',
      offerCount: 3,
      lowPrice: rawProductIdea.plans.basic.price,
      highPrice: rawProductIdea.plans.ultimate.price,
      priceCurrency: 'EUR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: (
        rawProductIdea.reviews.reduce((sum, review) => sum + review.rating, 0) /
        rawProductIdea.reviews.length
      ).toFixed(1),
      reviewCount: rawProductIdea.reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    featureList: rawProductIdea.features.map((feature) => feature.title.en),
  };

  // Organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: rawProductIdea.name,
    url: baseUrl,
    logo: `${baseUrl}/logo/${rawProductIdea.themeColor}-${rawProductIdea.logo}.svg`,
    description: rawProductIdea.heroTexts.description.en,
  };

  // WebSite schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: rawProductIdea.name,
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // FAQ schema - generated from features
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: rawProductIdea.features.map((feature) => ({
      '@type': 'Question',
      name: feature.pain.en,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${feature.title.en}. ${feature.items.map(item => item.title.en).join('. ')}.`,
      },
    })),
  };

  // Individual Review schemas
  const reviewSchemas = rawProductIdea.reviews.slice(0, 5).map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name: rawProductIdea.name,
    },
    author: {
      '@type': 'Person',
      name: review.name,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.content.en,
    datePublished: review.postedAt.toISOString(),
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {reviewSchemas.map((schema, index) => (
        <script
          key={`review-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

