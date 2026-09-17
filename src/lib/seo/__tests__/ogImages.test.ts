import { describe, expect, it } from 'vitest';
import { DEFAULT_OG_IMAGE, ogImageForPath } from '../ogImages';

describe('ogImageForPath', () => {
  it('uses the homepage brand card for the site root', () => {
    expect(DEFAULT_OG_IMAGE).toBe('https://www.securetools.dev/og-image.png');
    expect(ogImageForPath('https://www.securetools.dev')).toBe(DEFAULT_OG_IMAGE);
    expect(ogImageForPath('/')).toBe(DEFAULT_OG_IMAGE);
  });

  it('maps each tool path to its dedicated OG image', () => {
    expect(ogImageForPath('/password-generator')).toBe(
      'https://www.securetools.dev/og/password-generator.png'
    );
    expect(ogImageForPath('/text-encryptor')).toBe(
      'https://www.securetools.dev/og/text-encryptor.png'
    );
    expect(ogImageForPath('/security-headers-checker')).toBe(
      'https://www.securetools.dev/og/security-headers-checker.png'
    );
    expect(ogImageForPath('https://www.securetools.dev/two-factor-auth')).toBe(
      'https://www.securetools.dev/og/two-factor-auth.png'
    );
    expect(ogImageForPath('/random-data-generator')).toBe(
      'https://www.securetools.dev/og/random-data-generator.png'
    );
    expect(ogImageForPath('/password-strength-analyzer')).toBe(
      'https://www.securetools.dev/og/password-strength-analyzer.png'
    );
  });

  it('falls back to the homepage brand card for other routes', () => {
    expect(ogImageForPath('/about')).toBe(DEFAULT_OG_IMAGE);
    expect(ogImageForPath('/blog/password-security-guide')).toBe(DEFAULT_OG_IMAGE);
  });
});
