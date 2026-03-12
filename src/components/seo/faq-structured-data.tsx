import { GenericFAQPage } from 'src/types/ProductIdea';

type FaqStructuredDataProps = {
  faqPage: GenericFAQPage<string>;
  baseUrl: string;
};

export function FaqStructuredData({ faqPage, baseUrl }: FaqStructuredDataProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: `${baseUrl}/faq/${faqPage.slug.en}/`,
    name: faqPage.seo.title,
    description: faqPage.seo.description,
    mainEntity: faqPage.sections.flatMap((section) =>
      section.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      }))
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
