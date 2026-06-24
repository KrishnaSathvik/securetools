export interface BlogToolLink {
  path: string;
  name: string;
  description: string;
}

export const BLOG_TOOL_CATALOG: Record<string, BlogToolLink> = {
  '/password-generator': {
    path: '/password-generator',
    name: 'Password & Passphrase Generator',
    description: 'Generate passwords and passphrases with CSPRNG in your browser.',
  },
  '/password-strength-analyzer': {
    path: '/password-strength-analyzer',
    name: 'Password Strength Analyzer',
    description: 'Pattern-based strength and entropy estimates — no live breach lookup.',
  },
  '/text-encryptor': {
    path: '/text-encryptor',
    name: 'Text Encryptor',
    description: 'AES-256-GCM encryption and encoding utilities that run locally.',
  },
  '/two-factor-auth': {
    path: '/two-factor-auth',
    name: 'Two-Factor Authentication Generator',
    description: 'RFC 6238 TOTP codes, otpauth QR codes, and backup codes.',
  },
  '/security-headers-checker': {
    path: '/security-headers-checker',
    name: 'Security Headers Checker (Demo)',
    description: 'Educational demo — simulated headers, not live remote scanning.',
  },
  '/random-data-generator': {
    path: '/random-data-generator',
    name: 'Random Data Generator',
    description: 'CSPRNG strings, tokens, and UUIDs in the browser.',
  },
};

export function getBlogTool(path: string): BlogToolLink | undefined {
  return BLOG_TOOL_CATALOG[path];
}
