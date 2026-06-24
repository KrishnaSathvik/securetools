import type { ReactNode } from 'react';
import { Lock, Shield, AlertCircle, AlertTriangle, Laptop } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SecurityBadge, type SecurityBadgeVariant } from '@/components/SecurityBadge';
import type { ToolDetailsSection } from '@/components/ToolDetailsAccordion';

export interface ToolTrustBadgeItem {
  label: string;
  variant: SecurityBadgeVariant;
}

export interface ToolTrustCallout {
  variant: 'info' | 'warning';
  content: ReactNode;
}

export interface ToolTrustContent {
  badges: ToolTrustBadgeItem[];
  callouts?: ToolTrustCallout[];
  howItWorks: string;
  limitations: string;
  privacyNote?: string;
}

interface ToolTrustDetailsGridProps {
  howItWorks: string;
  limitations: string;
  privacyNote?: string;
  embedded?: boolean;
}

interface ToolTrustSectionProps extends ToolTrustContent {}

const calloutStyles = {
  info: {
    bar: 'callout-info',
    icon: 'icon-info',
    Icon: Shield,
  },
  warning: {
    bar: 'callout-warning',
    icon: 'icon-warning',
    Icon: AlertTriangle,
  },
} as const;

function TrustDetail({
  icon: Icon,
  iconClass,
  title,
  children,
}: {
  icon: typeof Lock;
  iconClass: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3 min-w-0">
      <div className={cn('mt-0.5 shrink-0', iconClass)} aria-hidden>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground/80">{title}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

export function ToolTrustDetailsGrid({
  howItWorks,
  limitations,
  privacyNote,
  embedded = false,
}: ToolTrustDetailsGridProps) {
  const grid = (
    <div
      className={cn(
        'grid gap-5 md:grid-cols-3 md:gap-6',
        !embedded && 'md:divide-x md:divide-border/60'
      )}
    >
      <TrustDetail icon={Lock} iconClass="icon-info" title="How it works">
        {howItWorks}
      </TrustDetail>
      <TrustDetail icon={AlertCircle} iconClass="icon-warning" title="Limitations">
        {limitations}
      </TrustDetail>
      <TrustDetail icon={Shield} iconClass="icon-success" title="Privacy">
        {privacyNote ?? 'Sensitive input is not sent to SecureTools servers.'}
      </TrustDetail>
    </div>
  );

  if (embedded) {
    return grid;
  }

  return (
    <div className="tool-trust-details">
      <h2 className="sr-only">How it works, limitations &amp; privacy</h2>
      <p className="text-xs font-medium text-muted-foreground mb-3 md:mb-4" aria-hidden>
        How it works, limitations &amp; privacy
      </p>
      {grid}
    </div>
  );
}

export function buildTrustDetailsAccordionSection(
  props: Pick<ToolTrustContent, 'howItWorks' | 'limitations' | 'privacyNote'>
): ToolDetailsSection {
  return {
    id: 'how-it-works-limitations-privacy',
    title: 'How it works, limitations & privacy',
    content: (
      <ToolTrustDetailsGrid
        howItWorks={props.howItWorks}
        limitations={props.limitations}
        privacyNote={props.privacyNote}
        embedded
      />
    ),
  };
}

/**
 * Unified trust strip for tool pages: badges, optional callouts, and how/limitations/privacy.
 */
export function ToolTrustSection({
  badges,
  callouts = [],
  howItWorks,
  limitations,
  privacyNote,
}: ToolTrustSectionProps) {
  return (
    <section className="tool-trust-section" aria-label="Trust and limitations">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {badges.map((badge) => (
            <SecurityBadge key={badge.label} label={badge.label} variant={badge.variant} />
          ))}
        </div>
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
          <Laptop className="h-3.5 w-3.5 icon-success" aria-hidden />
          Runs in your browser
        </p>
      </div>

      {callouts.length > 0 && (
        <div className="space-y-2">
          {callouts.map((callout, index) => {
            const style = calloutStyles[callout.variant];
            const CalloutIcon = style.Icon;
            return (
              <div
                key={index}
                className={cn(
                  'flex gap-3 rounded-r-md px-3 py-2.5 text-sm leading-relaxed',
                  style.bar
                )}
              >
                <CalloutIcon className={cn('h-4 w-4 mt-0.5 shrink-0', style.icon)} aria-hidden />
                <div className="min-w-0 [&_a]:underline [&_a]:font-medium [&_strong]:font-semibold [&_strong]:text-foreground">
                  {callout.content}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ToolTrustDetailsGrid
        howItWorks={howItWorks}
        limitations={limitations}
        privacyNote={privacyNote}
      />
    </section>
  );
}

/** @deprecated Use ToolTrustSection — kept for imports that pass only the three text fields. */
export function ToolTrustPanel(props: Omit<ToolTrustSectionProps, 'badges' | 'callouts'> & {
  badges?: ToolTrustBadgeItem[];
  callouts?: ToolTrustCallout[];
}) {
  return (
    <ToolTrustSection
      badges={props.badges ?? []}
      callouts={props.callouts}
      howItWorks={props.howItWorks}
      limitations={props.limitations}
      privacyNote={props.privacyNote}
    />
  );
}
