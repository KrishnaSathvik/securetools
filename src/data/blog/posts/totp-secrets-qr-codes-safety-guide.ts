import type { BlogPost } from '../types';

const SITE = 'https://www.securetools.dev';

export const totpSecretsQrCodesSafetyGuide: BlogPost = {
  id: 17,
  slug: 'totp-secrets-qr-codes-safety-guide',
  title: 'Protecting TOTP Secrets, QR Codes, and Backup Codes',
  excerpt:
    'How to handle authenticator setup safely: secret storage, QR screenshots, backup codes, and when to use the SecureTools 2FA generator.',
  metaTitle: 'TOTP Secret & QR Code Safety Guide | SecureTools',
  metaDescription:
    'Learn how to protect TOTP secrets, QR codes, and backup codes during 2FA setup. Conservative guidance for the SecureTools 2FA generator.',
  canonical: `${SITE}/blog/totp-secrets-qr-codes-safety-guide`,
  category: '2fa',
  author: 'SecureTools Team',
  date: '2026-06-24',
  updated: '2026-06-24',
  readTime: '9 min read',
  tags: ['2FA', 'TOTP', 'QR Codes', 'Backup Codes'],
  featured: false,
  relatedToolSlug: '/two-factor-auth',
  relatedTools: ['/two-factor-auth', '/password-generator'],
  relatedPosts: [
    'two-factor-authentication-guide',
    'password-security-guide',
    'browser-security-tools-honestly-explained',
  ],
  faqs: [
    {
      question: 'Who can generate my TOTP codes?',
      answer:
        'Anyone with your TOTP secret or a scan of your enrollment QR code can generate valid codes for that account until you rotate the secret.',
    },
    {
      question: 'Is it safe to screenshot a 2FA QR code?',
      answer:
        'Avoid it. Screenshots may sync to cloud galleries or be visible on shared devices. Scan directly into your authenticator app when possible.',
    },
    {
      question: 'Where should backup codes be stored?',
      answer:
        'Offline in a secure place — password manager secure note, encrypted backup, or physical safe. Do not store them in plain email or chat.',
    },
    {
      question: 'Does SecureTools upload my TOTP secret?',
      answer:
        'No. Secret generation and QR rendering run locally in your browser. Secrets only leave the page if you copy or screenshot them.',
    },
    {
      question: 'Should I use SecureTools to enroll production accounts?',
      answer:
        'Prefer your service provider’s official enrollment flow. SecureTools is helpful for learning, testing RFC 6238 behavior, or prototyping — not a replacement for provider UX and recovery policies.',
    },
    {
      question: 'What if I lose my phone and backup codes?',
      answer:
        'Use your provider’s account recovery process. That is why backup codes and recovery options matter before you need them.',
    },
  ],
  content: `Two-factor authentication reduces risk from stolen passwords — but **TOTP secrets are keys**. If someone copies your secret or QR code, they can generate your codes. This guide covers safe handling and how the [2FA Generator](${SITE}/two-factor-auth) fits in.

## Quick answer

Treat TOTP secrets like passwords: **do not share** QR codes or screenshots, **store backup codes offline**, and **enroll production accounts** through your provider’s official flow. SecureTools generates TOTP locally for learning and testing — secrets are not sent to our servers.

## Key takeaways

- Secret or QR = ability to generate codes.
- Screenshots and cloud sync increase exposure.
- Backup codes are one-time recovery — guard them.
- Use official provider enrollment for live accounts.
- Combine 2FA with unique passwords.

## What a TOTP secret is

**TOTP** (RFC 6238) combines a shared secret with the current time to produce short-lived codes. The secret is usually shared via:

- A **QR code** (\`otpauth://\` URI)
- A **manual entry** string

Anyone who obtains that secret can produce codes until you rotate enrollment.

## QR code safety

| Practice | Why |
|----------|-----|
| Scan directly into authenticator app | Minimizes copies |
| Avoid screenshots | May sync to cloud or leak on shared devices |
| Do not post QR in tickets/chat | Equivalent to sharing a password |
| Use private screen when enrolling | Shoulder surfing risk |

## Backup codes

Backup codes are **single-use** recovery secrets. Store them:

- In a **password manager** secure note, or
- **Printed** in a physically secured location

Do not email them to yourself in plain text alongside account details.

## When to use SecureTools 2FA Generator

Good fits:

- Learning how TOTP and otpauth URIs work
- Testing clock drift and code refresh locally
- Generating **sample** secrets for documentation or dev

Avoid:

- Replacing your bank’s official enrollment UI
- Sharing generated QR images in public channels
- Storing production secrets only in browser session memory

## Pair with strong passwords

2FA helps when passwords leak — but **reused passwords** still matter. Use the [Password Generator](${SITE}/password-generator) and a password manager for unique credentials.

## Related tools

- [Two-Factor Authentication Generator](${SITE}/two-factor-auth)
- [Password & Passphrase Generator](${SITE}/password-generator)

## Related reading

- [Two-Factor Authentication Guide](${SITE}/blog/two-factor-authentication-guide)
- [Password Security Guide](${SITE}/blog/password-security-guide)

## Try the 2FA generator

Practice TOTP locally with the [2FA Generator](${SITE}/two-factor-auth) — read the **Protect your secret** warning first.`,
};
