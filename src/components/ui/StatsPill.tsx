import { cn } from '@/lib/utils';

interface StatsPillProps {
  label: string;
  value: string | number;
  variant?: 'default' | 'accent' | 'success';
  className?: string;
}

export function StatsPill({ label, value, variant = 'default', className }: StatsPillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium",
        "border transition-colors min-w-0 flex-shrink-0",
        {
          'bg-secondary text-secondary-foreground border-border': variant === 'default',
          'bg-gradient-accent text-white border-transparent': variant === 'accent', 
          'bg-success/10 text-success border-success/20': variant === 'success',
        },
        className
      )}
    >
      <span className="text-muted-foreground truncate">{label}:</span>
      <span className="font-semibold whitespace-nowrap">{value}</span>
    </div>
  );
}

interface StatsGridProps {
  children: React.ReactNode;
  className?: string;
}

export function StatsGrid({ children, className }: StatsGridProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5 sm:gap-2 mb-4", className)}>
      {children}
    </div>
  );
}