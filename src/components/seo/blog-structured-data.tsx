import type { Blog } from 'src/types/blog';

type BlogStructuredDataProps = {
  post: Blog;
  baseUrl: string;
  productName: string;
};

export function BlogStructuredData({ post, baseUrl, productName }: BlogStructuredDataProps) {
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seo_title || post.title,
    description: post.seo_description || post.excerpt || '',
    image: post.cover_image || undefined,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: productName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    keywords: post.seo_keywords?.join(', ') || undefined,
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
    />
  );
}
