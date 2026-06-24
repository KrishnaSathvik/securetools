/**
 * Full-body prerender: serve dist, render each route with Playwright, save HTML.
 */
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';
import { getAllPrerenderRoutes } from './seo-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function resolveDistFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  const safePath = path.normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, '');
  const relative = safePath.startsWith('/') ? safePath.slice(1) : safePath;

  const candidates = [];
  if (relative) {
    candidates.push(path.join(distDir, relative));
    candidates.push(path.join(distDir, relative, 'index.html'));
  }
  candidates.push(path.join(distDir, 'index.html'));

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return path.join(distDir, 'index.html');
}

function startStaticServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const filePath = resolveDistFile(req.url || '/');
      const ext = path.extname(filePath).toLowerCase();
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
      const stream = fs.createReadStream(filePath);
      stream.on('error', () => {
        res.statusCode = 500;
        res.end('Internal Server Error');
      });
      stream.pipe(res);
    });

    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : 0;
      resolve({ server, baseUrl: `http://127.0.0.1:${port}` });
    });
  });
}

function routeOutputPath(routePath) {
  if (routePath === '/') {
    return path.join(distDir, 'index.html');
  }
  return path.join(distDir, routePath.replace(/^\//, ''), 'index.html');
}

async function waitForRouteContent(page, route) {
  await page.waitForFunction(
    () => {
      const rootEl = document.getElementById('root');
      return Boolean(rootEl && rootEl.innerHTML.trim().length > 200);
    },
    { timeout: 45000 }
  );

  for (const snippet of route.mustContain) {
    await page.waitForFunction(
      (text) => document.body?.innerText?.includes(text) ?? false,
      snippet,
      { timeout: 45000 }
    );
  }

  await page.waitForTimeout(300);
}

function verifySavedHtml(html, bodyText, route) {
  if (html.includes('<div id="root"></div>')) {
    throw new Error(`Route ${route.path}: root is still empty after prerender`);
  }
  for (const snippet of route.mustContain) {
    if (!bodyText.includes(snippet)) {
      throw new Error(`Route ${route.path}: missing expected content "${snippet}"`);
    }
  }
  if (!html.includes('<title>')) {
    throw new Error(`Route ${route.path}: missing <title>`);
  }
}

async function prerenderRoute(browser, baseUrl, route) {
  const page = await browser.newPage();
  try {
    const url = `${baseUrl}${route.path === '/' ? '/' : route.path}`;
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await waitForRouteContent(page, route);

    const { html, bodyText } = await page.evaluate(() => ({
      html: document.documentElement.outerHTML,
      bodyText: document.body?.innerText ?? '',
    }));
    const documentHtml = `<!DOCTYPE html>\n${html}`;

    verifySavedHtml(documentHtml, bodyText, route);

    const outPath = routeOutputPath(route.path);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, documentHtml, 'utf8');

    return outPath;
  } finally {
    await page.close();
  }
}

async function main() {
  if (!fs.existsSync(path.join(distDir, 'index.html'))) {
    console.error('dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const routes = getAllPrerenderRoutes();
  console.log(`Prerendering ${routes.length} routes...`);

  const { server, baseUrl } = await startStaticServer();
  const browser = await chromium.launch({ headless: true });

  try {
    const written = [];
    for (const route of routes) {
      const outPath = await prerenderRoute(browser, baseUrl, route);
      written.push(outPath);
      console.log(`  ✓ ${route.path}`);
    }
    console.log(`Prerendered ${written.length} routes with full body HTML.`);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((err) => {
  console.error('Prerender failed:', err.message);
  process.exit(1);
});
