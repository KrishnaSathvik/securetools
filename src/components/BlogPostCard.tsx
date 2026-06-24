import { Link } from 'react-router-dom';
import { ArrowRight, Wrench } from 'lucide-react';
import type { BlogPost } from '@/data/blog/types';
import { getBlogTool } from '@/data/blog/toolCatalog';
import { SecurityBadge } from '@/components/SecurityBadge';
import { getCategoryLabel } from '@/lib/blogCategories';

interface BlogPostCardProps {
  post: BlogPost;
  showTryTool?: boolean;
  compact?: boolean;
}

export function BlogPostCard({ post, showTryTool = true, compact = false }: BlogPostCardProps) {
  const tool = post.relatedToolSlug ? getBlogTool(post.relatedToolSlug) : undefined;

  return (
    <article
      className={`bg-card border border-border rounded-lg hover-card-brand ${
        compact ? 'p-4' : 'p-4 sm:p-5'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <SecurityBadge label={getCategoryLabel(post.category)} variant="neutral" />
        {tool && (
          <SecurityBadge label={tool.name.replace(' (Demo)', '').split(' ').slice(0, 2).join(' ')} variant="local" />
        )}
        <span className="text-xs text-muted-foreground ml-auto">{post.readTime}</span>
      </div>

      <h3 className={`font-semibold text-foreground mb-2 leading-snug ${compact ? 'text-base' : 'text-lg'}`}>
        <Link to={`/blog/${post.slug}`} className="hover:text-link transition-colors">
          {post.title}
        </Link>
      </h3>

      <p className={`text-muted-foreground mb-4 ${compact ? 'text-sm line-clamp-2' : 'text-sm line-clamp-3'}`}>
        {post.excerpt}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          to={`/blog/${post.slug}`}
          className="text-sm font-medium text-link hover:text-link-hover hover:underline inline-flex items-center gap-1"
        >
          Read article
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
        {showTryTool && tool && (
          <Link
            to={tool.path}
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            <Wrench className="h-3.5 w-3.5" aria-hidden />
            Try tool
          </Link>
        )}
      </div>
    </article>
  );
}
