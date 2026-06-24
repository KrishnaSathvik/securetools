import blogSearchMeta from './blogSearchMeta.json';
import { getCategoryLabel } from '@/lib/blogCategories';

export type SearchResultType = 'Tool' | 'Article' | 'Page';

export interface SearchIndexItem {
  type: SearchResultType;
  name: string;
  path: string;
  keywords: string[];
}

const STATIC_SEARCH_INDEX: SearchIndexItem[] = [
  {
    type: 'Tool',
    name: 'Password & Passphrase Generator',
    path: '/password-generator',
    keywords: ['password', 'cspng', 'passphrase', 'diceware', 'generator'],
  },
  {
    type: 'Tool',
    name: 'Text Encryptor/Decryptor',
    path: '/text-encryptor',
    keywords: ['encrypt', 'aes-gcm', 'base64', 'cipher', 'decrypt'],
  },
  {
    type: 'Tool',
    name: 'Security Headers Checker (Demo)',
    path: '/security-headers-checker',
    keywords: ['headers', 'demo', 'hsts', 'csp', 'security headers', 'headers demo'],
  },
  {
    type: 'Tool',
    name: 'Two-Factor Authentication Generator',
    path: '/two-factor-auth',
    keywords: ['2fa', 'totp', 'authenticator', 'qr', 'mfa'],
  },
  {
    type: 'Tool',
    name: 'Random Data Generator',
    path: '/random-data-generator',
    keywords: ['random', 'token', 'uuid', 'api key', 'random data', 'random token'],
  },
  {
    type: 'Tool',
    name: 'Password Strength Analyzer',
    path: '/password-strength-analyzer',
    keywords: ['password strength', 'breach database', 'pattern', 'analyzer', 'strength'],
  },
  {
    type: 'Page',
    name: 'Blog',
    path: '/blog',
    keywords: ['blog', 'articles', 'guides', 'browser security tools'],
  },
  {
    type: 'Page',
    name: 'FAQ',
    path: '/faq',
    keywords: ['faq', 'questions', 'help'],
  },
  {
    type: 'Page',
    name: 'About',
    path: '/about',
    keywords: ['about', 'securetools'],
  },
  {
    type: 'Page',
    name: 'Compare',
    path: '/comparisons',
    keywords: ['compare', 'comparisons', 'alternatives'],
  },
  {
    type: 'Page',
    name: 'Privacy Policy',
    path: '/privacy',
    keywords: ['privacy', 'data', 'policy'],
  },
  {
    type: 'Page',
    name: 'Terms of Service',
    path: '/terms',
    keywords: ['terms', 'legal'],
  },
];

const articleSearchIndex: SearchIndexItem[] = blogSearchMeta.map((post) => ({
  type: 'Article',
  name: post.title,
  path: `/blog/${post.slug}`,
  keywords: [
    post.title,
    post.excerpt,
    post.category,
    getCategoryLabel(post.category),
    ...post.tags,
    post.slug.replace(/-/g, ' '),
    ...(post.relatedToolSlug ? [post.relatedToolSlug.replace(/^\//, '').replace(/-/g, ' ')] : []),
  ].filter(Boolean),
}));

export const SEARCH_INDEX: SearchIndexItem[] = [...STATIC_SEARCH_INDEX, ...articleSearchIndex];
