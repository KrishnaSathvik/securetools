export const SITE_URL = 'https://www.securetools.dev';
export const SITE_NAME = 'SecureTools';
export const SITE_DESCRIPTION = `SecureTools provides free, privacy-first browser-based security tools.
Tools run locally in the user's browser and include password generation,
text encryption, TOTP helpers, random data generation, password strength
analysis, and an educational security-headers demo.`;

export const SEARCH_CRAWLERS = [
  'Googlebot',
  'OAI-SearchBot',
  'Claude-SearchBot',
  'Claude-User',
];

export const TRAINING_CRAWLERS = ['GPTBot', 'ClaudeBot', 'Google-Extended'];

/** Flip to false to opt public pages out of model-training crawls. Search crawlers stay allowed. */
export const ALLOW_TRAINING_CRAWLERS = true;

export const TOOLS = [
  {
    path: '/password-generator',
    name: 'Password & Passphrase Generator',
    llmsDescription: 'Generate random passwords, Diceware passphrases, and mnemonic passwords locally in the browser.',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '/text-encryptor',
    name: 'Text Encryptor/Decryptor',
    llmsDescription: 'Encrypt and decrypt text with AES-GCM, plus Base64, URL encoding, and ROT13.',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '/security-headers-checker',
    name: 'Security Headers Checker (Demo)',
    llmsDescription: 'Learn common HTTP security headers with simulated examples — not live remote scanning.',
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    path: '/two-factor-auth',
    name: 'Two-Factor Authentication Generator',
    llmsDescription: 'Generate TOTP codes, QR setup data, and backup codes locally for testing and learning.',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '/random-data-generator',
    name: 'Random Data Generator',
    llmsDescription: 'Create random strings, UUIDs, bytes, and numbers locally for testing and development.',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '/password-strength-analyzer',
    name: 'Password Strength Analyzer',
    llmsDescription: 'Review password length, patterns, and approximate strength locally — no breach lookup.',
    changefreq: 'weekly',
    priority: '0.9',
  },
];

export const STATIC_PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  ...TOOLS.map(({ path, changefreq, priority }) => ({ path, changefreq, priority })),
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/faq', changefreq: 'monthly', priority: '0.7' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/comparisons', changefreq: 'monthly', priority: '0.7' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.5' },
  { path: '/terms', changefreq: 'yearly', priority: '0.5' },
];

export const LLMS_GUIDES = [
  {
    path: '/blog',
    name: 'Security Guides',
    description: 'Practical references for passwords, encryption, TOTP, headers, and local security tooling.',
  },
  {
    path: '/blog/browser-security-tools-honestly-explained',
    name: 'Browser Security Tools, Honestly Explained',
    description: 'What these browser tools can and cannot do, including demo and local-processing limits.',
  },
  {
    path: '/blog/password-strength-analysis-without-breach-database',
    name: 'Password Strength Analysis Without a Breach Database',
    description: 'How local pattern and entropy checks differ from live breach lookups.',
  },
  {
    path: '/blog/what-securetools-text-encryptor-does',
    name: 'What the Text Encryptor Does',
    description: 'AES-GCM encryption versus encoding modes, and what stays in the browser.',
  },
];

export const LLMS_ABOUT = [
  { path: '/about', name: 'About SecureTools' },
  { path: '/privacy', name: 'Privacy' },
  { path: '/faq', name: 'FAQ' },
];

export const RELATED_SITES = [
  {
    name: 'ByteToolBox',
    url: 'https://www.bytetoolbox.com/',
    description: 'Developer tools for JSON, Base64, hashes, UUIDs, regex, and timestamps.',
  },
  {
    name: 'TextCraft',
    url: 'https://www.textcraft.dev/',
    description: 'Browser tools for counting, cleaning, converting, comparing, and organizing text.',
  },
];
