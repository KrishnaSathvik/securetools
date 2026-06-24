import { cn } from '@/lib/utils';

export type SecurityBadgeVariant =
  | 'local'
  | 'csprng'
  | 'aes-gcm'
  | 'demo'
  | 'totp'
  | 'no-breach'
  | 'pattern'
  | 'dev-test'
  | 'approximate'
  | 'passphrases'
  | 'neutral';

const variantStyles: Record<SecurityBadgeVariant, string> = {
  local: 'badge-tone-success',
  csprng: 'badge-tone-info',
  'aes-gcm': 'badge-tone-info',
  demo: 'badge-tone-warning',
  totp: 'badge-tone-success',
  'no-breach': 'badge-tone-warning',
  pattern: 'badge-tone-warning',
  'dev-test': 'badge-tone-neutral',
  approximate: 'badge-tone-warning',
  passphrases: 'badge-tone-success',
  neutral: 'badge-tone-neutral',
};

interface SecurityBadgeProps {
  label: string;
  variant?: SecurityBadgeVariant;
  className?: string;
}

export function SecurityBadge({ label, variant = 'neutral', className }: SecurityBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium tracking-wide',
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
