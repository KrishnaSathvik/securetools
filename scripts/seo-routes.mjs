/**
 * Shared prerender/SEO route list (paths + verification snippets).
 * Blog slugs come from scripts/blog-routes.json (generated before build).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const STATIC_ROUTES = [
  { path: '/', mustContain: ['SecureTools', 'run locally in your browser', 'Popular security guides'] },
  { path: '/password-generator', mustContain: ['Password & Passphrase Generator', 'How it works, limitations & privacy'] },
  { path: '/text-encryptor', mustContain: ['Text Encryptor/Decryptor'] },
  {
    path: '/security-headers-checker',
    mustContain: ['Security Headers Checker (Demo)', 'Demo only', 'simulated'],
  },
  { path: '/two-factor-auth', mustContain: ['Two-Factor Authentication Generator', 'TOTP'] },
  { path: '/random-data-generator', mustContain: ['Random Data Generator'] },
  { path: '/password-strength-analyzer', mustContain: ['Password Strength Analyzer', 'does not check breach databases'] },
  { path: '/blog', mustContain: ['SecureTools Blog', 'Start here'] },
  { path: '/faq', mustContain: ['Frequently Asked Questions', 'What is SecureTools'] },
  { path: '/about', mustContain: ['About SecureTools', 'Our Mission'] },
  { path: '/comparisons', mustContain: ['SecureTools vs Competitors'] },
  { path: '/privacy', mustContain: ['Privacy Policy'] },
  { path: '/terms', mustContain: ['Terms of Service'] },
];

export function loadBlogRoutes() {
  const blogRoutesPath = path.join(__dirname, 'blog-routes.json');
  if (!fs.existsSync(blogRoutesPath)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(blogRoutesPath, 'utf8'));
}

export function getAllPrerenderRoutes() {
  const blogRoutes = loadBlogRoutes();
  const blogRouteEntries = blogRoutes.map((post) => ({
    path: `/blog/${post.slug}`,
    mustContain: [post.title, 'Back to blog'],
  }));
  return [...STATIC_ROUTES, ...blogRouteEntries];
}

/** Route meta for generate-route-html.mjs (kept in sync with src/seo/routeMeta.ts). */
export function getRouteMetaList() {
  const SITE_URL = 'https://www.securetools.dev';
  const staticMeta = [
    {
      path: '/',
      title: 'SecureTools - Professional Security & Privacy Tools',
      description:
        'Free browser-based security tools: password generator, text encryptor, 2FA helper, random data generator, and password strength analyzer. Private, fast, and runs locally.',
      keywords:
        'security tools, password generator, text encryptor, 2FA generator, random data generator, password analyzer',
    },
    {
      path: '/password-generator',
      title: 'Password & Passphrase Generator - SecureTools',
      description:
        'Generate cryptographically secure passwords and memorable passphrases with entropy analysis and Diceware support. Runs entirely in your browser.',
      keywords: 'password generator, passphrase generator, diceware, entropy, security',
    },
    {
      path: '/text-encryptor',
      title: 'Text Encryptor/Decryptor - AES-256 Tool | SecureTools',
      description:
        'Encrypt and decrypt text with AES-256-GCM, plus Base64, URL encoding, and ROT13. All processing happens locally in your browser.',
      keywords: 'text encryptor, AES encryption, Base64, URL encoding, ROT13',
    },
    {
      path: '/security-headers-checker',
      title: 'Security Headers Checker (Demo) | SecureTools',
      description:
        'Educational demo that explains common HTTP security headers. Does not perform live remote scanning from the browser.',
      keywords: 'security headers, HSTS, CSP, X-Frame-Options, educational demo',
    },
    {
      path: '/two-factor-auth',
      title: 'Two-Factor Authentication Generator - TOTP & QR | SecureTools',
      description:
        'Generate RFC 6238 TOTP codes, otpauth QR codes, and backup codes locally in your browser.',
      keywords: '2FA generator, TOTP generator, QR code, authenticator app, backup codes',
    },
    {
      path: '/random-data-generator',
      title: 'Random Data Generator - Secure Strings & Tokens | SecureTools',
      description:
        'Generate cryptographically secure random strings, API keys, tokens, and UUIDs in your browser.',
      keywords: 'random data generator, API key generator, token generator, UUID generator',
    },
    {
      path: '/password-strength-analyzer',
      title: 'Password Strength Analyzer | SecureTools',
      description:
        'Analyze password strength, entropy, and common patterns locally. Pattern-based analysis only — no live breach database lookup.',
      keywords: 'password strength analyzer, password checker, entropy analysis',
    },
    {
      path: '/blog',
      title: 'Security Blog - SecureTools',
      description:
        'Security tips, tutorials, and guides on passwords, encryption, 2FA, headers, and secure development.',
      keywords: 'security blog, password security, encryption',
    },
    {
      path: '/faq',
      title: 'Frequently Asked Questions - SecureTools',
      description:
        'Answers about SecureTools privacy, local processing, offline use, and our six free security tools.',
      keywords: 'SecureTools FAQ, security tools questions',
    },
    {
      path: '/about',
      title: 'About SecureTools',
      description:
        'Learn about SecureTools — free browser-based security utilities with local processing and no account required.',
      keywords: 'about SecureTools, security tools',
    },
    {
      path: '/comparisons',
      title: 'SecureTools vs Other Security Tools',
      description:
        'Compare SecureTools with password managers and security utilities on privacy, offline use, and tool breadth.',
      keywords: 'security tools comparison',
    },
    {
      path: '/privacy',
      title: 'Privacy Policy - SecureTools',
      description:
        'How SecureTools handles privacy. Tools run locally in your browser; we do not collect your tool input data.',
      keywords: 'privacy policy, SecureTools',
    },
    {
      path: '/terms',
      title: 'Terms of Service - SecureTools',
      description: 'Terms of use for SecureTools browser-based security utilities.',
      keywords: 'terms of service, SecureTools',
    },
  ];

  const blogMeta = loadBlogRoutes().map((post) => ({
    path: `/blog/${post.slug}`,
    title: `${post.title} | SecureTools Blog`,
    description: post.excerpt,
    keywords: 'security blog, SecureTools',
  }));

  return staticMeta.map((route) => ({
    ...route,
    canonical: route.path === '/' ? SITE_URL : `${SITE_URL}${route.path}`,
  })).concat(
    blogMeta.map((route) => ({
      ...route,
      canonical: `${SITE_URL}${route.path}`,
    }))
  );
}
