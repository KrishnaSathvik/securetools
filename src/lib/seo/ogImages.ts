const SITE_URL = 'https://www.securetools.dev';

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

const TOOL_OG_IMAGES: Record<string, string> = {
  '/password-generator': `${SITE_URL}/og/password-generator.png`,
  '/text-encryptor': `${SITE_URL}/og/text-encryptor.png`,
  '/security-headers-checker': `${SITE_URL}/og/security-headers-checker.png`,
  '/two-factor-auth': `${SITE_URL}/og/two-factor-auth.png`,
  '/random-data-generator': `${SITE_URL}/og/random-data-generator.png`,
  '/password-strength-analyzer': `${SITE_URL}/og/password-strength-analyzer.png`,
};

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export function ogImageForPath(canonicalOrPath?: string): string {
  if (!canonicalOrPath) {
    return DEFAULT_OG_IMAGE;
  }

  let pathname = canonicalOrPath;
  if (canonicalOrPath.startsWith('http')) {
    try {
      pathname = new URL(canonicalOrPath).pathname;
    } catch {
      return DEFAULT_OG_IMAGE;
    }
  }

  const normalized = pathname.replace(/\/$/, '') || '/';
  return TOOL_OG_IMAGES[normalized] ?? DEFAULT_OG_IMAGE;
}
