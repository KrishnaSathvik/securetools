export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolDefinition {
  path: string;
  name: string;
  description: string;
  badge: string;
  keywords: string[];
  guideSlug: string;
  relatedToolPaths: string[];
  schemaDescription: string;
  faqs: ToolFaq[];
}

export const TOOLS: ToolDefinition[] = [
  {
    path: '/password-generator',
    name: 'Password & Passphrase Generator',
    description:
      'Generate random passwords, Diceware passphrases, and mnemonic passwords locally in your browser.',
    badge: 'CSPRNG',
    keywords: ['password', 'passphrase', 'diceware', 'entropy', 'security', 'cspng'],
    guideSlug: 'password-security-guide',
    relatedToolPaths: ['/password-strength-analyzer', '/two-factor-auth', '/random-data-generator'],
    schemaDescription: 'Generate secure passwords and passphrases in your browser.',
    faqs: [
      {
        question: 'What is a password generator?',
        answer:
          'A password generator creates random passwords or memorable passphrases using a cryptographically secure random source. SecureTools does this locally in your browser with the Web Crypto API.',
      },
      {
        question: 'How do I generate a secure password?',
        answer:
          'Use a long random password (16+ characters with mixed character types) or a Diceware passphrase of four or more unrelated words. Copy the result into a password manager rather than reusing it.',
      },
      {
        question: 'Does SecureTools upload generated passwords?',
        answer:
          'No. Passwords and passphrases are generated in your browser and are not sent to SecureTools servers. Optional password history stays in this browser’s local storage only.',
      },
      {
        question: 'Does this work offline?',
        answer:
          'Yes. After the page loads, generation continues without a network connection.',
      },
      {
        question: 'Where should I store generated passwords?',
        answer:
          'Store them in a password manager. Avoid saving sensitive values in shared browsers or in the optional on-page history on untrusted devices.',
      },
    ],
  },
  {
    path: '/text-encryptor',
    name: 'Text Encryptor/Decryptor',
    description: 'Encrypt text with AES-GCM or use encoding modes like Base64 and URL encoding.',
    badge: 'AES-GCM',
    keywords: ['encryption', 'decryption', 'aes', 'cipher', 'security', 'cryptography'],
    guideSlug: 'what-securetools-text-encryptor-does',
    relatedToolPaths: ['/password-generator', '/two-factor-auth'],
    schemaDescription: 'Browser-based text encryption and encoding utilities.',
    faqs: [
      {
        question: 'What does the text encryptor do?',
        answer:
          'It encrypts and decrypts text with AES-256-GCM in your browser, and also offers encoding modes such as Base64, URL encoding, and ROT13. Encoding is not encryption.',
      },
      {
        question: 'Does SecureTools upload the text I encrypt?',
        answer:
          'No. Your text and passphrase are processed locally. They are not uploaded to SecureTools servers.',
      },
      {
        question: 'Is Base64 the same as encryption?',
        answer:
          'No. Base64 and URL encoding only change how data is represented. Anyone can decode them. Use AES-GCM with a strong passphrase when you need confidentiality.',
      },
      {
        question: 'What happens if I lose my passphrase?',
        answer:
          'You cannot decrypt the ciphertext. There is no recovery path. Keep the passphrase somewhere durable and never send it alongside the ciphertext on the same channel.',
      },
    ],
  },
  {
    path: '/security-headers-checker',
    name: 'Security Headers Checker (Demo)',
    description:
      'Learn common HTTP security headers with simulated examples — not live remote scanning.',
    badge: 'Demo',
    keywords: ['security', 'headers', 'ssl', 'tls', 'vulnerability', 'analysis', 'demo'],
    guideSlug: 'security-headers-checker-demo-explained',
    relatedToolPaths: ['/text-encryptor', '/two-factor-auth'],
    schemaDescription: 'Educational security headers review demo for learning header purposes.',
    faqs: [
      {
        question: 'What is a security headers checker?',
        answer:
          'It explains common HTTP response headers such as CSP, HSTS, and X-Frame-Options. This SecureTools page is an educational demo, not a live scanner.',
      },
      {
        question: 'Does this scan my live website?',
        answer:
          'No. Browsers block reading response headers from arbitrary sites (CORS). Results here are simulated examples for learning.',
      },
      {
        question: 'Does the URL I type get uploaded?',
        answer:
          'No. The URL is used only as demo context in your browser. SecureTools does not send a scan request to its servers.',
      },
      {
        question: 'How do I check real headers?',
        answer:
          'Use a server-side scanner, your hosting provider, browser developer tools on a site you control, or a proxy you operate. This demo cannot replace that.',
      },
    ],
  },
  {
    path: '/two-factor-auth',
    name: 'Two-Factor Authentication Generator',
    description: 'Generate TOTP codes, QR setup data, and backup codes locally for testing and learning.',
    badge: 'TOTP',
    keywords: ['2fa', 'totp', 'authenticator', 'qr code', 'security', 'mfa'],
    guideSlug: 'totp-secrets-qr-codes-safety-guide',
    relatedToolPaths: ['/password-generator', '/random-data-generator'],
    schemaDescription: 'Browser-based TOTP and QR setup helper.',
    faqs: [
      {
        question: 'What is a TOTP generator?',
        answer:
          'TOTP (RFC 6238) creates short codes that change every 30 seconds from a shared secret. This tool generates secrets, otpauth QR codes, and backup codes locally.',
      },
      {
        question: 'Does SecureTools upload my authenticator secret?',
        answer:
          'No. Secrets, QR data, and backup codes stay in your browser session unless you copy them elsewhere.',
      },
      {
        question: 'Can I use this for production accounts?',
        answer:
          'Use it to learn and test. For production services, register secrets through the provider’s official setup flow and store them in a trusted authenticator app.',
      },
      {
        question: 'What are backup codes?',
        answer:
          'One-time recovery codes for when you cannot use the authenticator. Treat them like passwords: save them offline and never share QR screenshots.',
      },
    ],
  },
  {
    path: '/random-data-generator',
    name: 'Random Data Generator',
    description:
      'Create random strings, UUIDs, bytes, and numbers for testing, examples, and development workflows.',
    badge: 'Local',
    keywords: ['random', 'generator', 'api key', 'token', 'cryptographic', 'secure'],
    guideSlug: 'generate-api-keys-and-random-tokens-browser',
    relatedToolPaths: ['/password-generator', '/two-factor-auth'],
    schemaDescription: 'Generate secure random data locally in the browser.',
    faqs: [
      {
        question: 'What is a random data generator?',
        answer:
          'It creates random strings, UUID v4 values, bytes, and numbers in your browser using the Web Crypto API.',
      },
      {
        question: 'Are these production API keys?',
        answer:
          'No. Generated values suit testing, placeholders, and development. For production secrets, use your infrastructure’s approved secret-management process.',
      },
      {
        question: 'Does SecureTools upload generated values?',
        answer: 'No. Random output is created locally and is not sent to SecureTools servers.',
      },
      {
        question: 'What is UUID v4?',
        answer:
          'UUID v4 is a 128-bit identifier built from random bits. It is useful as a unique key in examples and databases, not as a password substitute.',
      },
    ],
  },
  {
    path: '/password-strength-analyzer',
    name: 'Password Strength Analyzer',
    description: 'Review password length, patterns, and approximate strength locally — no breach lookup.',
    badge: 'No breach DB',
    keywords: ['password', 'strength', 'analyzer', 'security', 'entropy', 'patterns'],
    guideSlug: 'password-strength-analysis-without-breach-database',
    relatedToolPaths: ['/password-generator', '/two-factor-auth'],
    schemaDescription: 'Local password strength and pattern analysis.',
    faqs: [
      {
        question: 'What is a password strength analyzer?',
        answer:
          'It estimates strength from length, character variety, common patterns, and entropy-style math. This tool runs those checks locally in your browser.',
      },
      {
        question: 'Does this check breach databases?',
        answer:
          'No. It does not look up Have I Been Pwned or any live breach database. A high score does not prove a password was never leaked.',
      },
      {
        question: 'Does SecureTools upload the password I type?',
        answer:
          'No. Analysis stays in your browser. Prefer testing a similar pattern rather than pasting your real primary password.',
      },
      {
        question: 'Why are crack-time numbers approximate?',
        answer:
          'They assume a simple brute-force model. Real attacks use guessing, patterns, and leaked passwords, so the figure is a comparison aid, not a guarantee.',
      },
    ],
  },
];

export interface BlogToolLink {
  path: string;
  name: string;
  description: string;
}

export const BLOG_TOOL_CATALOG: Record<string, BlogToolLink> = Object.fromEntries(
  TOOLS.map((tool) => [
    tool.path,
    { path: tool.path, name: tool.name, description: tool.description },
  ])
);

export function getTool(path: string): ToolDefinition | undefined {
  return TOOLS.find((tool) => tool.path === path);
}

export function getBlogTool(path: string): BlogToolLink | undefined {
  return BLOG_TOOL_CATALOG[path];
}
