import { describe, expect, it } from 'vitest';
import { buildLlmsTxt, buildRobotsTxt } from '../../../scripts/generate-sitemap.mjs';

describe('buildLlmsTxt', () => {
  const llms = buildLlmsTxt();

  it('uses live SecureTools tool paths', () => {
    expect(llms.startsWith('# SecureTools\n')).toBe(true);
    expect(llms).toContain('https://www.securetools.dev/password-generator');
    expect(llms).toContain('https://www.securetools.dev/text-encryptor');
    expect(llms).toContain('https://www.securetools.dev/security-headers-checker');
    expect(llms).toContain('https://www.securetools.dev/two-factor-auth');
    expect(llms).toContain('https://www.securetools.dev/random-data-generator');
    expect(llms).toContain('https://www.securetools.dev/password-strength-analyzer');
  });

  it('points guides at /blog, not /guides', () => {
    expect(llms).toContain('https://www.securetools.dev/blog');
    expect(llms).not.toContain('https://www.securetools.dev/guides');
  });

  it('lists sister sites under Related sites', () => {
    expect(llms).toContain('## Related sites');
    expect(llms).toContain('[ByteToolBox](https://www.bytetoolbox.com/)');
    expect(llms).toContain('[TextCraft](https://www.textcraft.dev/)');
  });
});

describe('buildRobotsTxt', () => {
  it('keeps a global allow and separates search crawlers from training crawlers', () => {
    const robots = buildRobotsTxt({ allowTraining: true });

    expect(robots).toContain('User-agent: *\nAllow: /');
    expect(robots).toContain('Sitemap: https://www.securetools.dev/sitemap.xml');
    expect(robots).not.toMatch(/Crawl-delay/i);

    const searchIdx = robots.indexOf('# Search and discovery');
    const trainingIdx = robots.indexOf('# Training');
    expect(trainingIdx).toBeGreaterThan(searchIdx);

    const searchBlock = robots.slice(searchIdx, trainingIdx);
    expect(searchBlock).toContain('User-agent: OAI-SearchBot\nAllow: /');
    expect(searchBlock).not.toContain('GPTBot');

    const trainingBlock = robots.slice(trainingIdx);
    expect(trainingBlock).toContain('User-agent: GPTBot\nAllow: /');
    expect(trainingBlock).toContain('User-agent: ClaudeBot\nAllow: /');
    expect(trainingBlock).toContain('User-agent: Google-Extended\nAllow: /');
  });

  it('can opt training crawlers out without blocking search', () => {
    const robots = buildRobotsTxt({ allowTraining: false });
    expect(robots).toContain('User-agent: Claude-SearchBot\nAllow: /');
    expect(robots.slice(robots.indexOf('# Training'))).toContain('User-agent: GPTBot\nDisallow: /');
  });
});
