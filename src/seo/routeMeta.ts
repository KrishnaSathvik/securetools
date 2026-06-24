import { buildWebApplicationSchema } from '@/lib/seo/structuredData';
import { blogPosts } from '@/data/blogPosts';

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  structuredData?: Record<string, unknown>;
}

const SITE_URL = 'https://www.securetools.dev';

const toolRoutes: RouteMeta[] = [
  {
    path: '/password-generator',
    title: 'Password & Passphrase Generator - SecureTools',
    description:
      'Generate cryptographically secure passwords and memorable passphrases with entropy analysis and Diceware support. Runs entirely in your browser.',
    keywords: 'password generator, passphrase generator, diceware, entropy, security',
    canonical: `${SITE_URL}/password-generator`,
    structuredData: buildWebApplicationSchema({
      name: 'Password & Passphrase Generator',
      description: 'Generate secure passwords and passphrases in your browser.',
      path: '/password-generator',
    }),
  },
  {
    path: '/text-encryptor',
    title: 'Text Encryptor/Decryptor - AES-256 Tool | SecureTools',
    description:
      'Encrypt and decrypt text with AES-256-GCM, plus Base64, URL encoding, and ROT13. All processing happens locally in your browser.',
    keywords: 'text encryptor, AES encryption, Base64, URL encoding, ROT13',
    canonical: `${SITE_URL}/text-encryptor`,
    structuredData: buildWebApplicationSchema({
      name: 'Text Encryptor/Decryptor',
      description: 'Browser-based text encryption and encoding utilities.',
      path: '/text-encryptor',
    }),
  },
  {
    path: '/security-headers-checker',
    title: 'Security Headers Checker (Demo) | SecureTools',
    description:
      'Educational demo that explains common HTTP security headers. Does not perform live remote scanning from the browser.',
    keywords: 'security headers, HSTS, CSP, X-Frame-Options, educational demo',
    canonical: `${SITE_URL}/security-headers-checker`,
    structuredData: buildWebApplicationSchema({
      name: 'Security Headers Checker (Demo)',
      description: 'Educational security headers review demo for learning header purposes.',
      path: '/security-headers-checker',
    }),
  },
  {
    path: '/two-factor-auth',
    title: 'Two-Factor Authentication Generator - TOTP & QR | SecureTools',
    description:
      'Generate RFC 6238 TOTP codes, otpauth QR codes, and backup codes locally in your browser.',
    keywords: '2FA generator, TOTP generator, QR code, authenticator app, backup codes',
    canonical: `${SITE_URL}/two-factor-auth`,
    structuredData: buildWebApplicationSchema({
      name: 'Two-Factor Authentication Generator',
      description: 'Browser-based TOTP and QR setup helper.',
      path: '/two-factor-auth',
    }),
  },
  {
    path: '/random-data-generator',
    title: 'Random Data Generator - Secure Strings & Tokens | SecureTools',
    description:
      'Generate cryptographically secure random strings, API keys, tokens, and UUIDs in your browser.',
    keywords: 'random data generator, API key generator, token generator, UUID generator',
    canonical: `${SITE_URL}/random-data-generator`,
    structuredData: buildWebApplicationSchema({
      name: 'Random Data Generator',
      description: 'Generate secure random data locally in the browser.',
      path: '/random-data-generator',
    }),
  },
  {
    path: '/password-strength-analyzer',
    title: 'Password Strength Analyzer | SecureTools',
    description:
      'Analyze password strength, entropy, and common patterns locally. Pattern-based analysis only — no live breach database lookup.',
    keywords: 'password strength analyzer, password checker, entropy analysis',
    canonical: `${SITE_URL}/password-strength-analyzer`,
    structuredData: buildWebApplicationSchema({
      name: 'Password Strength Analyzer',
      description: 'Local password strength and pattern analysis.',
      path: '/password-strength-analyzer',
    }),
  },
];

export const routeMetaList: RouteMeta[] = [
  {
    path: '/',
    title: 'SecureTools - Professional Security & Privacy Tools',
    description:
      'Free browser-based security tools: password generator, text encryptor, 2FA helper, random data generator, and password strength analyzer. Private, fast, and runs locally.',
    keywords:
      'security tools, password generator, text encryptor, 2FA generator, random data generator, password analyzer',
    canonical: SITE_URL,
    structuredData: buildWebApplicationSchema({
      name: 'SecureTools',
      description: 'Professional security and privacy tools that run entirely in your browser.',
      path: '/',
    }),
  },
  ...toolRoutes,
  {
    path: '/blog',
    title: 'Security Blog - SecureTools',
    description:
      'Security tips, tutorials, and guides on passwords, encryption, 2FA, headers, and secure development.',
    keywords: 'security blog, password security, encryption, cybersecurity',
    canonical: `${SITE_URL}/blog`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'SecureTools Security Blog',
      description: 'Security tips and tutorials from SecureTools.',
      url: `${SITE_URL}/blog`,
      publisher: {
        '@type': 'Organization',
        name: 'SecureTools',
        url: SITE_URL,
      },
    },
  },
  {
    path: '/faq',
    title: 'Frequently Asked Questions - SecureTools',
    description: 'Answers about SecureTools privacy, local processing, offline use, and our six free security tools.',
    canonical: `${SITE_URL}/faq`,
  },
  {
    path: '/about',
    title: 'About SecureTools',
    description: 'Learn about SecureTools — free browser-based security utilities with local processing and no account required.',
    canonical: `${SITE_URL}/about`,
  },
  {
    path: '/comparisons',
    title: 'SecureTools vs Other Security Tools',
    description: 'Compare SecureTools with password managers and security utilities on privacy, offline use, and tool breadth.',
    canonical: `${SITE_URL}/comparisons`,
  },
  {
    path: '/privacy',
    title: 'Privacy Policy - SecureTools',
    description: 'How SecureTools handles privacy. Tools run locally in your browser; we do not collect your tool input data.',
    canonical: `${SITE_URL}/privacy`,
  },
  {
    path: '/terms',
    title: 'Terms of Service - SecureTools',
    description: 'Terms of use for SecureTools browser-based security utilities.',
    canonical: `${SITE_URL}/terms`,
  },
  ...blogPosts
    .filter((post) => !post.noindex)
    .map((post) => ({
      path: `/blog/${post.slug}`,
      title: post.metaTitle ?? `${post.title} | SecureTools Blog`,
      description: post.metaDescription ?? post.excerpt,
      canonical: post.canonical ?? `${SITE_URL}/blog/${post.slug}`,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.metaDescription ?? post.excerpt,
        url: `${SITE_URL}/blog/${post.slug}`,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        author: { '@type': 'Organization', name: post.author },
        publisher: { '@type': 'Organization', name: 'SecureTools', url: SITE_URL },
      },
    })),
];

export function getRouteMeta(path: string): RouteMeta | undefined {
  return routeMetaList.find((route) => route.path === path);
}
