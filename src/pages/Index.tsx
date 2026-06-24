import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search, Zap, Shield, Clock, Copy, BookOpen, ArrowRight } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { getBlogPostBySlug } from '@/data/blogPosts';
import type { BlogPost } from '@/data/blog/types';
import { getBlogTool } from '@/data/blog/toolCatalog';
import { getCategoryLabel } from '@/lib/blogCategories';

const HOMEPAGE_BLOG_SLUGS = [
  'browser-security-tools-honestly-explained',
  'password-strength-analysis-without-breach-database',
  'what-securetools-text-encryptor-does',
  'security-headers-checker-demo-explained',
] as const;

const homepageBlogPosts = HOMEPAGE_BLOG_SLUGS.map((slug) => getBlogPostBySlug(slug)).filter(
  (post): post is NonNullable<typeof post> => Boolean(post)
);

const tools = [
  {
    name: 'Password & Passphrase Generator',
    path: '/password-generator',
    description: 'Generate random passwords, Diceware passphrases, and mnemonic passwords locally in your browser.',
    badge: 'CSPRNG',
    guideSlug: 'password-security-guide',
    keywords: ['password', 'passphrase', 'diceware', 'entropy', 'security', 'cspng'],
  },
  {
    name: 'Text Encryptor/Decryptor',
    path: '/text-encryptor',
    description: 'Encrypt text with AES-GCM or use encoding modes like Base64 and URL encoding.',
    badge: 'AES-GCM',
    guideSlug: 'what-securetools-text-encryptor-does',
    keywords: ['encryption', 'decryption', 'aes', 'cipher', 'security', 'cryptography'],
  },
  {
    name: 'Security Headers Checker (Demo)',
    path: '/security-headers-checker',
    description: 'Learn common HTTP security headers with simulated examples — not live remote scanning.',
    badge: 'Demo',
    guideSlug: 'security-headers-checker-demo-explained',
    keywords: ['security', 'headers', 'ssl', 'tls', 'vulnerability', 'analysis', 'demo'],
  },
  {
    name: 'Two-Factor Authentication Generator',
    path: '/two-factor-auth',
    description: 'Generate TOTP codes, QR setup data, and backup codes locally for testing and learning.',
    badge: 'TOTP',
    guideSlug: 'totp-secrets-qr-codes-safety-guide',
    keywords: ['2fa', 'totp', 'authenticator', 'qr code', 'security', 'mfa'],
  },
  {
    name: 'Random Data Generator',
    path: '/random-data-generator',
    description: 'Create random strings, UUIDs, bytes, and numbers for testing, examples, and development workflows.',
    badge: 'Local',
    guideSlug: 'generate-api-keys-and-random-tokens-browser',
    keywords: ['random', 'generator', 'api key', 'token', 'cryptographic', 'secure'],
  },
  {
    name: 'Password Strength Analyzer',
    path: '/password-strength-analyzer',
    description: 'Review password length, patterns, and approximate strength locally — no breach lookup.',
    badge: 'No breach DB',
    guideSlug: 'password-strength-analysis-without-breach-database',
    keywords: ['password', 'strength', 'analyzer', 'security', 'entropy', 'patterns'],
  },
] as const;

const features = [
  {
    icon: <Zap className="w-5 h-5" aria-hidden />,
    title: 'Runs in your browser',
    description: 'Quick checks and generators without server round-trips',
  },
  {
    icon: <Shield className="w-5 h-5" aria-hidden />,
    title: 'Privacy first',
    description: 'Sensitive input stays on your device — processed locally',
  },
  {
    icon: <Clock className="w-5 h-5" aria-hidden />,
    title: 'No account needed',
    description: 'Open a tool and start — works offline once loaded',
  },
  {
    icon: <Copy className="w-5 h-5" aria-hidden />,
    title: 'Copy-friendly',
    description: 'Copy results directly to your clipboard from any tool',
  },
];

function HomepageGuideCard({ post }: { post: BlogPost }) {
  const tool = post.relatedToolSlug ? getBlogTool(post.relatedToolSlug) : undefined;
  const categoryLabel = tool
    ? tool.name.replace(' (Demo)', '').toUpperCase()
    : getCategoryLabel(post.category).toUpperCase();

  return (
    <article className="home-guide-card flex flex-col">
      <span className="home-guide-tag">{categoryLabel}</span>
      <h3 className="text-base font-semibold text-foreground mt-3 mb-2 leading-snug">
        <Link to={`/blog/${post.slug}`} className="hover:text-link transition-colors">
          {post.title}
        </Link>
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
        {post.excerpt}
      </p>
      <div className="flex flex-wrap items-center gap-4 mt-auto">
        <Link
          to={`/blog/${post.slug}`}
          className="text-sm font-medium text-link hover:underline inline-flex items-center gap-1.5"
        >
          <BookOpen className="h-3.5 w-3.5" aria-hidden />
          Read guide
        </Link>
        {tool && (
          <Link
            to={tool.path}
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            Try tool
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        )}
      </div>
    </article>
  );
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  useSEO({
    title: 'SecureTools - Browser Security & Privacy Tools',
    description:
      'Browser-based security tools for passwords, encryption, 2FA, random data, and security-header education. Run locally in your browser — no account required.',
    keywords:
      'security tools, password generator, text encryptor, security headers, 2FA generator, random data generator, password analyzer, browser security tools, free security utilities',
    canonical: 'https://www.securetools.dev',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'SecureTools',
      description: 'Browser-based security and privacy tools that run locally in your browser',
      url: 'https://www.securetools.dev',
      applicationCategory: 'Security Tools',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  });

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <section className="home-hero text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            SecureTools
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-2 leading-relaxed">
            Browser-based security tools for passwords, encryption, 2FA, random data, and security-header education.
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-8">
            Paste data, validate it, convert it, copy it back — all locally in your browser.
          </p>

          <div className="relative max-w-lg mx-auto">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-secondary/30 border-border"
              aria-label="Search security tools"
            />
          </div>
        </section>

        {/* Tools */}
        <section className="home-section">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredTools.map((tool) => (
              <article key={tool.path} className="home-tool-card flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="text-base font-semibold text-card-foreground leading-snug">{tool.name}</h2>
                  <span className="home-tool-badge shrink-0">{tool.badge}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{tool.description}</p>
                <div className="flex flex-wrap items-center gap-4 mt-auto">
                  <Link
                    to={tool.path}
                    className="text-sm font-medium text-link hover:underline inline-flex items-center gap-1"
                  >
                    Try it now
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                  {tool.guideSlug && getBlogPostBySlug(tool.guideSlug) && (
                    <Link
                      to={`/blog/${tool.guideSlug}`}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Guide
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Guides */}
        {homepageBlogPosts.length > 0 && (
          <section className="home-section">
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Popular security guides</h2>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">
                Honest guides on what each tool can and cannot do.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {homepageBlogPosts.map((post) => (
                <HomepageGuideCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Why */}
        <section className="home-section home-why">
          <h2 className="text-xl font-bold text-foreground text-center mb-10">Why SecureTools?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 max-w-3xl mx-auto">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mb-3 border border-primary/20 icon-brand">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-1.5 text-sm">{feature.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
