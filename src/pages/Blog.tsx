import { ToolLayout } from '@/components/layouts/ToolLayout';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Shield, Lock, Key, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { blogPosts } from '@/data/blogPosts';
import { BlogPostCard } from '@/components/BlogPostCard';
import { getCategoryLabel } from '@/lib/blogCategories';

const START_HERE_SLUGS = [
  'browser-security-tools-honestly-explained',
  'password-strength-analysis-without-breach-database',
  'what-securetools-text-encryptor-does',
  'security-headers-checker-demo-explained',
] as const;

export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useSEO({
    title: 'Security Blog - SecureTools | Tips, Tutorials & Security Best Practices',
    description:
      'Discover security tips, tutorials, and guides for using SecureTools effectively. Learn about password security, encryption, two-factor authentication, and more.',
    keywords:
      'security blog, password security, encryption, two-factor authentication, security headers, cybersecurity',
    canonical: 'https://www.securetools.dev/blog',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'SecureTools Security Blog',
      description: 'Security tips, tutorials, and guides for using SecureTools effectively.',
      url: 'https://www.securetools.dev/blog',
      publisher: {
        '@type': 'Organization',
        name: 'SecureTools',
        url: 'https://www.securetools.dev',
      },
      inLanguage: 'en-US',
    },
  });

  const categories = [
    { id: 'all', name: 'All Posts', icon: Shield },
    { id: 'passwords', name: 'Passwords', icon: Key },
    { id: 'encryption', name: 'Encryption', icon: Lock },
    { id: '2fa', name: '2FA', icon: Eye },
    { id: 'headers', name: 'Headers Demo', icon: AlertTriangle },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'best-practices', name: 'Security Basics', icon: CheckCircle },
    { id: 'monitoring', name: 'Monitoring', icon: AlertTriangle },
  ];

  const startHerePosts = START_HERE_SLUGS.map((slug) => blogPosts.find((p) => p.slug === slug)).filter(
    (post): post is NonNullable<typeof post> => Boolean(post)
  );

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      const haystack = [
        post.title,
        post.excerpt,
        post.category,
        getCategoryLabel(post.category),
        ...post.tags,
        post.relatedToolSlug ?? '',
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [selectedCategory, searchQuery]);

  return (
    <ToolLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              SecureTools Blog
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Practical guides for SecureTools — what each utility does, honest limits, and safer habits.
            </p>
          </div>

          <div className="relative max-w-md mx-auto mb-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search blog articles"
            />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-12 max-w-6xl mx-auto space-y-12">
        {!searchQuery.trim() && (
          <section>
            <h2 className="text-xl font-bold text-foreground mb-2">Start here</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Product-focused guides — good entry points if you are new to SecureTools.
            </p>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
              {startHerePosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Browse by category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  aria-pressed={isSelected}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors min-h-[44px] ${
                    isSelected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-foreground border-border hover:bg-secondary'
                  }`}
                >
                  <category.icon className="w-4 h-4" aria-hidden />
                  {category.name}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-6">
            {searchQuery.trim()
              ? `Search results (${filteredPosts.length})`
              : selectedCategory === 'all'
                ? 'All posts'
                : categories.find((c) => c.id === selectedCategory)?.name}
          </h2>
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No articles match your search.</p>
          )}
        </section>
      </div>
    </ToolLayout>
  );
};
