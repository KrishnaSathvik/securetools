const SITE_URL = 'https://www.securetools.dev';
const SITE_NAME = 'SecureTools';

export interface WebApplicationSchemaOptions {
  name: string;
  description: string;
  path: string;
}

export function buildWebApplicationSchema({
  name,
  description,
  path,
}: WebApplicationSchemaOptions): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${SITE_URL}${path}`,
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Web Browser',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export interface ArticleSchemaOptions {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}

export function buildArticleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  author = 'SecureTools Team',
}: ArticleSchemaOptions): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
  };
}

export interface FaqSchemaItem {
  question: string;
  answer: string;
}

export function buildFaqSchema(faqs: FaqSchemaItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildBlogStructuredData(
  article: Record<string, unknown>,
  faqs?: FaqSchemaItem[]
): Record<string, unknown> {
  if (!faqs?.length) {
    return article;
  }
  return {
    '@context': 'https://schema.org',
    '@graph': [article, buildFaqSchema(faqs)],
  };
}

export const SITE_URL_BASE = SITE_URL;
