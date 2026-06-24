const CATEGORY_LABELS: Record<string, string> = {
  passwords: 'Passwords',
  encryption: 'Encryption',
  '2fa': '2FA',
  headers: 'Headers Demo',
  privacy: 'Privacy',
  'best-practices': 'Security Basics',
  monitoring: 'Monitoring',
};

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category.replace(/-/g, ' ');
}
