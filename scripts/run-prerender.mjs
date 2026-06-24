/**
 * Runs Playwright full-body prerender when Chromium can launch (local/CI).
 * Skipped on Vercel — system libraries for headless Chrome are not available.
 */
const shouldSkip =
  process.env.VERCEL === '1' ||
  process.env.SKIP_PLAYWRIGHT_PRERENDER === '1';

if (shouldSkip) {
  console.log(
    'Skipping Playwright prerender on this environment. Per-route meta tags and noscript SEO fallbacks are still in dist/.'
  );
  process.exit(0);
}

await import('./prerender-full-html.mjs');
