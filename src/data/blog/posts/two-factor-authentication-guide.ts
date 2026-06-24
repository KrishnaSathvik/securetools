import type { BlogPost } from '../types';

const SITE = 'https://www.securetools.dev';

export const twoFactorAuthenticationGuide: BlogPost = {
  id: 3,
  slug: 'two-factor-authentication-guide',
  title: 'Two-Factor Authentication: Implementation and Best Practices',
  excerpt:
    'How TOTP, QR codes, and backup codes work—and how SecureTools implements RFC 6238 locally with otplib.',
  metaDescription:
    'Learn 2FA methods, TOTP (RFC 6238), otpauth URIs, backup codes, and safe use of the SecureTools 2FA generator.',
  category: '2fa',
  author: 'SecureTools Team',
  date: '2025-09-07',
  updated: '2026-06-24',
  readTime: '11 min read',
  tags: ['Two-Factor Authentication', 'Security', 'Authentication', 'TOTP'],
  featured: false,
  relatedToolSlug: '/two-factor-auth',
  relatedTools: ['/two-factor-auth', '/password-generator'],
  relatedPosts: ['password-security-guide', 'api-security-authentication', 'totp-secrets-qr-codes-safety-guide'],
  faqs: [
    {
      question: 'What is TOTP?',
      answer:
        'Time-based One-Time Password (RFC 6238) generates short codes from a shared secret and the current time window (usually 30 seconds). Authenticator apps and compatible services use the same algorithm.',
    },
    {
      question: 'How does SecureTools generate TOTP codes?',
      answer:
        'The Two-Factor Authentication Generator uses otplib for RFC 6238 TOTP, crypto.getRandomValues() for secrets and backup codes, and renders otpauth QR codes locally in your browser.',
    },
    {
      question: 'Is SMS 2FA as strong as authenticator apps?',
      answer:
        'SMS is better than password alone but weaker than app-based TOTP or hardware keys due to SIM swap and interception risks. Prefer authenticator apps or passkeys where possible.',
    },
    {
      question: 'Can I scan the QR code on a shared computer?',
      answer:
        'Avoid displaying enrollment secrets on untrusted or shared screens. Treat setup like handling a password.',
    },
    {
      question: 'What are backup codes for?',
      answer:
        'One-time recovery codes if you lose access to your authenticator device. Store them separately from the device, like a spare key.',
    },
    {
      question: 'Does SecureTools store my TOTP secret?',
      answer:
        'No server storage of your secret for tool usage. Secrets exist in your browser session while you use the page; closing the tab ends that session unless you saved them elsewhere yourself.',
    },
    {
      question: 'Should I use a browser tool for production 2FA enrollment?',
      answer:
        'Use vendor official flows for production accounts. SecureTools is helpful for learning, testing interoperability, and understanding otpauth URIs—not a replacement for your bank or IdP enrollment UI.',
    },
  ],
  content: `Two-factor authentication (2FA) adds a second check beyond passwords. This guide aligns with how **SecureTools actually implements TOTP**—not simplified pseudo-code.

## Quick answer

**TOTP (RFC 6238)** combines a shared secret with the current time to produce short codes. The [SecureTools 2FA Generator](${SITE}/two-factor-auth) creates secrets with **CSPRNG**, computes codes via **otplib**, builds **otpauth://** QR codes, and generates **backup codes**—all **locally in your browser**.

## Factor types

1. **Something you know** — password, PIN
2. **Something you have** — phone app, hardware key
3. **Something you are** — biometrics (with its own limitations)

## TOTP in SecureTools

Our implementation (\`src/lib/totp.ts\`) uses:

- \`generateSecret()\` from **otplib** for Base32 secrets
- \`generateSync({ secret })\` for RFC 6238 codes
- \`generateURI()\` for standard **otpauth** QR payloads
- \`crypto.getRandomValues()\` for backup codes

\`\`\`javascript
// Pattern used in SecureTools (conceptual)
import { generateSecret, generateSync, generateURI } from 'otplib';

const secret = generateSecret();
const code = generateSync({ secret });
const uri = generateURI({ issuer: 'Example', label: 'user@example.com', secret });
\`\`\`

**Do not** build production TOTP with \`Math.random()\` for secrets or codes.

## QR codes and otpauth URLs

Authenticator apps scan a QR encoding an \`otpauth://totp/...\` URI containing the secret and metadata (issuer, account). Our generator displays this locally—never send secrets over insecure channels.

## Backup codes

Generate one-time codes and store them offline (password manager, printed copy in a safe). Each code should work once.

## SMS and email codes

Easier to deploy but generally **weaker** than app TOTP or FIDO2 keys. If SMS is the only option, still enable it.

## Device and enrollment safety

- Enroll on a trusted device
- Do not screenshot secrets to cloud albums
- Revoke lost devices promptly at the service provider

## Key takeaways

- Prefer **authenticator apps / hardware keys** over SMS when available.
- SecureTools uses **RFC 6238 via otplib** and **CSPRNG**—not custom math.random TOTP.
- Treat secrets like passwords during setup.
- Practice with the [2FA Generator](${SITE}/two-factor-auth).

## Related reading

- [Password Security Guide](${SITE}/blog/password-security-guide)
- [API Security & Authentication](${SITE}/blog/api-security-authentication)`,
};
