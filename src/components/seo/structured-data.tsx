import { RawProductIdea } from 'src/types/ProductIdea';

type GlobalStructuredDataProps = {
  rawProductIdea: RawProductIdea;
  baseUrl: string;
};

export function GlobalStructuredData({ rawProductIdea, baseUrl }: GlobalStructuredDataProps) {
  // Organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: rawProductIdea.name,
    url: baseUrl,
    logo: `${baseUrl}/logo/${rawProductIdea.themeColor}-${rawProductIdea.logo}.png`,
    description: rawProductIdea.heroTexts.description.en,
  };

  // WebSite schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: rawProductIdea.name,
    url: baseUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

type SoftwareStructuredDataProps = {
  rawProductIdea: RawProductIdea;
};

export function SoftwareStructuredData({ rawProductIdea }: SoftwareStructuredDataProps) {
  // SoftwareApplication schema
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: rawProductIdea.name,
    description: rawProductIdea.heroTexts.description.en,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    offers:
      rawProductIdea.plans === null
        ? undefined
        : {
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

  // Individual Review schemas
  const reviewSchemas = rawProductIdea.reviews.slice(0, 5).map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: softwareApplicationSchema,
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
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      {reviewSchemas.map((schema) => (
        <script
          key={schema.author.name}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
