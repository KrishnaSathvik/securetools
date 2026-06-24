import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SITE_URL = 'https://www.securetools.dev';

const markdownComponents: Components = {
  a: ({ href, children }) => {
    if (href?.startsWith('/')) {
      return (
        <Link to={href} className="text-link hover:text-link-hover hover:underline">
          {children}
        </Link>
      );
    }
    if (href?.startsWith(SITE_URL)) {
      const path = href.slice(SITE_URL.length) || '/';
      return (
        <Link to={path} className="text-link hover:text-link-hover hover:underline">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className="text-link hover:text-link-hover hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  },
  table: ({ children }) => (
    <div className="blog-table-wrap">
      <table>{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => <th>{children}</th>,
  td: ({ children }) => <td>{children}</td>,
};

type BlogBlock =
  | { type: 'markdown'; content: string }
  | { type: 'callout'; variant: 'answer' | 'takeaways'; title: string; content: string };

const CALLOUT_REGEX = /^## (Quick answer|Key takeaways)\n\n([\s\S]*?)(?=\n## |\n---|\n$)/gm;

function splitBlogContent(content: string): BlogBlock[] {
  const blocks: BlogBlock[] = [];
  let lastIndex = 0;

  for (const match of content.matchAll(CALLOUT_REGEX)) {
    const start = match.index ?? 0;
    if (start > lastIndex) {
      const slice = content.slice(lastIndex, start).trimEnd();
      if (slice) blocks.push({ type: 'markdown', content: slice });
    }
    blocks.push({
      type: 'callout',
      variant: match[1] === 'Quick answer' ? 'answer' : 'takeaways',
      title: match[1],
      content: match[2].trim(),
    });
    lastIndex = start + match[0].length;
  }

  const remainder = content.slice(lastIndex).trimStart();
  if (remainder) blocks.push({ type: 'markdown', content: remainder });
  if (blocks.length === 0) blocks.push({ type: 'markdown', content });

  return blocks;
}

function MarkdownBlock({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {content}
    </ReactMarkdown>
  );
}

export function BlogMarkdown({ content }: { content: string }) {
  return (
    <>
      {splitBlogContent(content).map((block, index) => {
        if (block.type === 'markdown') {
          return <MarkdownBlock key={index} content={block.content} />;
        }

        const calloutClass =
          block.variant === 'answer'
            ? 'blog-callout blog-callout-answer blog-callout-prose'
            : 'blog-callout blog-callout-takeaways blog-callout-prose';

        return (
          <div key={index}>
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground scroll-mt-20">{block.title}</h2>
            <div className={calloutClass}>
              <MarkdownBlock content={block.content} />
            </div>
          </div>
        );
      })}
    </>
  );
}
