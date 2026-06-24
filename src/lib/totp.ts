import { generateSecret, generateSync, generateURI } from 'otplib';

/** Generate a cryptographically secure Base32 secret for TOTP. */
export function generateTotpSecret(): string {
  return generateSecret();
}

/** Generate RFC 6238 TOTP code for the given secret. */
export function generateTotpCode(secret: string): string {
  return generateSync({ secret });
}

/** Build a standard otpauth:// URI for authenticator apps. */
export function buildOtpAuthUri(secret: string, issuer: string, account: string): string {
  return generateURI({
    issuer,
    label: account,
    secret,
  });
}

/** Seconds remaining in the current 30-second TOTP window. */
export function getTotpTimeRemaining(timestamp = Date.now()): number {
  const period = 30;
  return period - Math.floor((timestamp / 1000) % period);
}

/** Generate one-time backup codes using CSPRNG. */
export function generateBackupCodes(count = 10, length = 8): string[] {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: count }, () => {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => chars[byte % chars.length]).join('');
  });
}
