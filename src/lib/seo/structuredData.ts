import { getTool, type ToolDefinition, type ToolFaq } from '@/data/tools';

const SITE_URL = 'https://www.securetools.dev';
const SITE_NAME = 'SecureTools';
const SITE_DESCRIPTION =
  'Browser-based security and privacy tools that run locally in your browser';

export interface WebApplicationSchemaOptions {
  name: string;
  description: string;
  path: string;
}

function asGraphNode(schema: Record<string, unknown>): Record<string, unknown> {
  const { ['@context']: _context, ...node } = schema;
  return node;
}

export function buildOrganizationSchema(): Record<string, unknown> {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}

export function buildWebSiteSchema(): Record<string, unknown> {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
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
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
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

export function buildHomepageStructuredData(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      buildWebSiteSchema(),
      {
        ...asGraphNode(
          buildWebApplicationSchema({
            name: SITE_NAME,
            description: SITE_DESCRIPTION,
            path: '/',
          })
        ),
        '@id': `${SITE_URL}/#app`,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };
}

export function buildToolPageStructuredData(
  path: string,
  tool: ToolDefinition | undefined = getTool(path)
): Record<string, unknown> {
  const application = buildWebApplicationSchema({
    name: tool?.name ?? 'SecureTools',
    description: tool?.schemaDescription ?? SITE_DESCRIPTION,
    path,
  });

  if (!tool?.faqs.length) {
    return application;
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [asGraphNode(application), asGraphNode(buildFaqSchema(tool.faqs))],
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

export type FaqSchemaItem = ToolFaq;

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
    '@graph': [asGraphNode(article), asGraphNode(buildFaqSchema(faqs))],
  };
}

export const SITE_URL_BASE = SITE_URL;
