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
    </>
  );
}

