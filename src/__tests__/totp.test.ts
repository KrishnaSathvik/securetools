import { describe, it, expect } from 'vitest';
import {
  generateTotpSecret,
  generateTotpCode,
  buildOtpAuthUri,
  generateBackupCodes,
} from '../lib/totp';

describe('TOTP utilities', () => {
  it('generates a base32 secret of expected length', () => {
    const secret = generateTotpSecret(32);
    expect(secret).toHaveLength(32);
    expect(secret).toMatch(/^[A-Z2-7]+$/);
  });

  it('builds a valid otpauth URI', () => {
    const secret = 'JBSWY3DPEHPK3PXP';
    const uri = buildOtpAuthUri(secret, 'SecureTools', 'user@example.com');
    expect(uri).toContain('otpauth://totp/');
    expect(uri).toContain('secret=JBSWY3DPEHPK3PXP');
    expect(uri).toContain('issuer=SecureTools');
  });

  it('generates a 6-digit TOTP code', () => {
    const secret = generateTotpSecret();
    const code = generateTotpCode(secret);
    expect(code).toMatch(/^\d{6}$/);
  });

  it('generates backup codes', () => {
    const codes = generateBackupCodes(5, 8);
    expect(codes).toHaveLength(5);
    codes.forEach((code) => expect(code).toHaveLength(8));
  });
});
