import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.join(__dirname, '../src/data/blog/posts');

function parseQuotedList(value) {
  if (!value) return [];
  return value
    .split(',')
    .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);
}

const posts = [];
const searchMeta = [];
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.ts') && f !== 'index.ts');

for (const file of files) {
  const src = fs.readFileSync(path.join(postsDir, file), 'utf8');
  const slug = src.match(/slug: '([^']+)'/)?.[1];
  const title = src.match(/title: '((?:[^'\\]|\\.)*)'/)?.[1]?.replace(/\\'/g, "'");
  const titleDouble = src.match(/title: "((?:[^"\\]|\\.)*)"/)?.[1];
  const excerpt = src.match(/excerpt:\s*\n?\s*'((?:[^'\\]|\\.)*)'/)?.[1]?.replace(/\\'/g, "'");
  const excerptAlt = src.match(/excerpt:\s*\n?\s*'([^']+)'/)?.[1];
  const category = src.match(/category: '([^']+)'/)?.[1] ?? '';
  const tagsRaw = src.match(/tags: \[([^\]]+)\]/)?.[1];
  const tags = parseQuotedList(tagsRaw);
  const relatedToolSlug = src.match(/relatedToolSlug: '([^']+)'/)?.[1];
  const noindex = /noindex:\s*true/.test(src);

  if (slug && !noindex) {
    const resolvedTitle = title || titleDouble || slug;
    const resolvedExcerpt = excerpt || excerptAlt || '';

    posts.push({
      slug,
      title: resolvedTitle,
      excerpt: resolvedExcerpt,
    });

    searchMeta.push({
      slug,
      title: resolvedTitle,
      excerpt: resolvedExcerpt,
      category,
      tags,
      relatedToolSlug,
    });
  }
}

posts.sort((a, b) => a.slug.localeCompare(b.slug));
searchMeta.sort((a, b) => a.slug.localeCompare(b.slug));

fs.writeFileSync(path.join(__dirname, 'blog-routes.json'), JSON.stringify(posts, null, 2));
fs.writeFileSync(
  path.join(__dirname, '../src/data/blogSearchMeta.json'),
  JSON.stringify(searchMeta, null, 2)
);
console.log(`Wrote ${posts.length} blog routes and search metadata`);
