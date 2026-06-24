import { Link, useParams, Navigate } from 'react-router-dom';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { blogPosts, getBlogPostBySlug } from '@/data/blogPosts';
import { getBlogTool } from '@/data/blog/toolCatalog';
import { buildArticleSchema, buildBlogStructuredData } from '@/lib/seo/structuredData';
import { BlogPostCard } from '@/components/BlogPostCard';
import { BlogMarkdown } from '@/components/BlogMarkdown';
import { getCategoryLabel } from '@/lib/blogCategories';
import { SecurityBadge } from '@/components/SecurityBadge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  const pageTitle = post?.metaTitle ?? (post ? `${post.title} | SecureTools Blog` : 'Article Not Found | SecureTools Blog');
  const pageDescription = post?.metaDescription ?? post?.excerpt ?? 'SecureTools security blog article.';
  const canonical = post?.canonical ?? (post ? `https://www.securetools.dev/blog/${post.slug}` : 'https://www.securetools.dev/blog');

  const articleSchema = post
    ? buildArticleSchema({
        title: post.title,
        description: pageDescription,
        slug: post.slug,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        author: post.author,
      })
    : undefined;

  const structuredData =
    post && articleSchema ? buildBlogStructuredData(articleSchema, post.faqs) : undefined;

  useSEO({
    title: pageTitle,
    description: pageDescription,
    keywords: post?.tags.join(', ') ?? 'security blog',
    canonical,
    ogType: post ? 'article' : 'website',
    structuredData,
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const primaryTool = post.relatedToolSlug ? getBlogTool(post.relatedToolSlug) : undefined;
  const relatedToolPaths = [
    ...(post.relatedToolSlug ? [post.relatedToolSlug] : []),
    ...(post.relatedTools ?? []),
  ].filter((path, index, arr) => arr.indexOf(path) === index);

  const relatedPosts = (post.relatedPosts ?? [])
    .map((relatedSlug) => blogPosts.find((p) => p.slug === relatedSlug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const displayDate = post.updated ?? post.date;

  return (
    <ToolLayout>
      <article className="px-4 sm:px-6 py-8 max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          Back to blog
        </Link>

        <header className="mb-8 pb-8 border-b border-border">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <SecurityBadge label={getCategoryLabel(post.category)} variant="neutral" />
            <span className="text-sm text-muted-foreground">{post.readTime}</span>
            <span className="text-muted-foreground" aria-hidden>·</span>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" aria-hidden />
              Updated {new Date(displayDate).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">{post.title}</h1>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" aria-hidden />
            {post.author}
          </div>
        </header>

        <div className="blog-prose">
          <BlogMarkdown content={post.content} />
        </div>

        {post.faqs.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-lg font-bold text-foreground mb-4">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {post.faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-sm font-medium text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {relatedToolPaths.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-lg font-bold text-foreground mb-4">Related SecureTools</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {relatedToolPaths.map((toolPath) => {
                const tool = getBlogTool(toolPath);
                if (!tool) return null;
                return (
                  <Link
                    key={toolPath}
                    to={tool.path}
                    className="block rounded-lg border border-border bg-card p-4 hover-card-brand"
                  >
                    <p className="font-medium text-foreground text-sm mb-1">{tool.name}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className="mt-10 pt-8 border-t border-border">
            <h2 className="text-lg font-bold text-foreground mb-4">Related articles</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedPosts.map((related) => (
                <BlogPostCard key={related.slug} post={related} showTryTool={false} compact />
              ))}
            </div>
          </section>
        )}

        {primaryTool && (
          <div className="blog-tool-cta mt-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="blog-tool-cta-label">SecureTools tool</p>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                  Try {primaryTool.name.replace(' (Demo)', '')}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  Run checks and generators instantly in your browser. No account required — your input stays on your
                  device.
                </p>
              </div>
              <Link
                to={primaryTool.path}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 text-sm font-medium transition-colors w-full sm:w-auto"
              >
                Open {primaryTool.name.replace(' (Demo)', '')}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        )}
      </article>
    </ToolLayout>
  );
};
