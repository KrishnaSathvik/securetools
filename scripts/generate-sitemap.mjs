/**
 * Regenerate public/sitemap.xml, robots.txt, and llms.txt from the site catalog.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  ALLOW_TRAINING_CRAWLERS,
  LLMS_ABOUT,
  LLMS_GUIDES,
  RELATED_SITES,
  SEARCH_CRAWLERS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  STATIC_PAGES,
  TOOLS,
  TRAINING_CRAWLERS,
} from './site-catalog.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const blogRoutesPath = path.join(__dirname, 'blog-routes.json');
const publicDir = path.join(root, 'public');
const lastmod = new Date().toISOString().slice(0, 10);

const blogRoutes = fs.existsSync(blogRoutesPath)
  ? JSON.parse(fs.readFileSync(blogRoutesPath, 'utf8'))
  : [];

const allPages = [
  ...STATIC_PAGES.map((page) => ({
    loc: page.path,
    changefreq: page.changefreq,
    priority: page.priority,
  })),
  ...blogRoutes.map((post) => ({
    loc: `/blog/${post.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
  })),
];

export function buildSitemapXml(pages = allPages, modified = lastmod) {
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <lastmod>${modified}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function buildRobotsTxt({ allowTraining = ALLOW_TRAINING_CRAWLERS } = {}) {
  const directive = (allow) => (allow ? 'Allow: /' : 'Disallow: /');
  const blocks = (agents, allow) =>
    agents.map((agent) => `User-agent: ${agent}\n${directive(allow)}`).join('\n\n');
  const trainingPolicy = allowTraining ? 'allow' : 'disallow';

  return `# ${SITE_NAME}
# ${SITE_URL}

User-agent: *
Allow: /

# Search and discovery
${blocks(SEARCH_CRAWLERS, true)}

# Training — separate from search. Currently: ${trainingPolicy}
${blocks(TRAINING_CRAWLERS, allowTraining)}

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

export function buildLlmsTxt() {
  const toolsList = TOOLS.map(
    (tool) => `- [${tool.name}](${SITE_URL}${tool.path}): ${tool.llmsDescription}`
  ).join('\n');

  const guidesList = LLMS_GUIDES.map(
    (guide) => `- [${guide.name}](${SITE_URL}${guide.path}): ${guide.description}`
  ).join('\n');

  const aboutList = LLMS_ABOUT.map(
    (page) => `- [${page.name}](${SITE_URL}${page.path})`
  ).join('\n');

  const relatedList = RELATED_SITES.map(
    (site) => `- [${site.name}](${site.url}): ${site.description}`
  ).join('\n');

  const summary = SITE_DESCRIPTION.trim().split('\n').join('\n> ');

  return `# ${SITE_NAME}

> ${summary}

## Tools

${toolsList}

## Guides

${guidesList}

## About

${aboutList}

## Related sites

${relatedList}
`;
}

function writeDiscoveryFiles() {
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), buildSitemapXml());
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), buildRobotsTxt());
  fs.writeFileSync(path.join(publicDir, 'llms.txt'), buildLlmsTxt());
  console.log(
    `Generated discovery files: sitemap (${allPages.length} URLs), robots.txt, llms.txt`
  );
}

const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  writeDiscoveryFiles();
}
