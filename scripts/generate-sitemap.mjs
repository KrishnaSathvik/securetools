/**
 * Regenerate public/sitemap.xml from known routes and blog posts.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const blogRoutesPath = path.join(__dirname, 'blog-routes.json');
const sitemapPath = path.join(root, 'public', 'sitemap.xml');

const SITE_URL = 'https://www.securetools.dev';
const lastmod = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/password-generator', priority: '0.9', changefreq: 'weekly' },
  { loc: '/text-encryptor', priority: '0.9', changefreq: 'weekly' },
  { loc: '/security-headers-checker', priority: '0.8', changefreq: 'weekly' },
  { loc: '/two-factor-auth', priority: '0.9', changefreq: 'weekly' },
  { loc: '/random-data-generator', priority: '0.9', changefreq: 'weekly' },
  { loc: '/password-strength-analyzer', priority: '0.9', changefreq: 'weekly' },
  { loc: '/blog', priority: '0.8', changefreq: 'weekly' },
  { loc: '/faq', priority: '0.7', changefreq: 'monthly' },
  { loc: '/about', priority: '0.7', changefreq: 'monthly' },
  { loc: '/comparisons', priority: '0.7', changefreq: 'monthly' },
  { loc: '/privacy', priority: '0.5', changefreq: 'yearly' },
  { loc: '/terms', priority: '0.5', changefreq: 'yearly' },
];

const blogRoutes = fs.existsSync(blogRoutesPath)
  ? JSON.parse(fs.readFileSync(blogRoutesPath, 'utf8'))
  : [];

const urlEntry = (loc, priority, changefreq) => `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const urls = [
  ...staticRoutes.map((r) => urlEntry(r.loc, r.priority, r.changefreq)),
  ...blogRoutes.map((post) => urlEntry(`/blog/${post.slug}`, '0.7', 'monthly')),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n\n')}
</urlset>
`;

fs.writeFileSync(sitemapPath, xml);
console.log(`Wrote sitemap with ${staticRoutes.length + blogRoutes.length} URLs`);
