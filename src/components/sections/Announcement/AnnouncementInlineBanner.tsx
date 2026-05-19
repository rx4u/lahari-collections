'use client';

import { useState } from 'react';
import { Megaphone, X } from 'lucide-react';

interface InlineBannerContent {
  message: string;
  subtitle?: string;
  cta?: { text: string; url: string };
  dismissible?: boolean;
  type?: 'info' | 'success' | 'warning';
}

interface Props {
  content: InlineBannerContent;
  eyebrow?: string;
  subtitle?: string;
}

// `text-white` on success/warning CTAs is intentional: paired with the
// semantic `--color-success` / `--color-warning` brand surfaces which
// are theme-independent (defined as fixed oklch values in globals.css,
// not bridge tokens). The ESLint bg/text-white-black rule targets
// className= JSX attributes; these string-literal values flow in via
// template substitution and aren't matched by the selector. Audit-trail
// note: white-on-semantic-brand is the same pattern as Vercel/Linear
// success toasts and is locked to those two semantic colors only.
const typeStyles = {
  info: {
    wrapper: 'bg-primary/10 border-primary/20',
    icon: 'text-primary',
    text: 'text-primary',
    subtitle: 'text-primary/70',
    cta: 'bg-primary text-primary-foreground hover:bg-primary/90',
  },
  success: {
    wrapper: 'bg-[var(--color-success-soft)] border-[color-mix(in_oklch,var(--color-success)_20%,transparent)]',
    icon: 'text-[var(--color-success)]',
    text: 'text-[var(--color-success)]',
    subtitle: 'text-[color-mix(in_oklch,var(--color-success)_70%,transparent)]',
    cta: 'bg-[var(--color-success)] text-white hover:opacity-90',
  },
  warning: {
    wrapper: 'bg-[var(--color-warning-soft)] border-[color-mix(in_oklch,var(--color-warning)_20%,transparent)]',
    icon: 'text-[var(--color-warning)]',
    text: 'text-[var(--color-warning)]',
    subtitle: 'text-[color-mix(in_oklch,var(--color-warning)_70%,transparent)]',
    cta: 'bg-[var(--color-warning)] text-white hover:opacity-90',
  },
};

export default function AnnouncementInlineBanner({ content, eyebrow, subtitle }: Props) {
  const [dismissed, setDismissed] = useState(false);
  const { message, subtitle: contentSubtitle, cta, dismissible = true, type = 'info' } = content;
  const resolvedSubtitle = subtitle ?? contentSubtitle;
  const styles = typeStyles[type];

  if (dismissed) return null;

  return (
    <div className={`w-full border ${styles.wrapper} px-4 py-4`}>
      <div className="page-container flex items-start gap-3">
        <Megaphone className={`w-5 h-5 mt-0.5 shrink-0 ${styles.icon}`} />
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm leading-snug ${styles.text}`}>{message}</p>
          {resolvedSubtitle && (
            <p className={`text-sm mt-0.5 ${styles.subtitle}`}>{resolvedSubtitle}</p>
          )}
          {cta && (
            <a
              href={cta.url}
              className={`inline-block mt-2 px-4 py-1.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors ${styles.cta}`}
            >
              {cta.text}
            </a>
          )}
        </div>
        {dismissible && (
          <button
            onClick={() => setDismissed(true)}
            className={`shrink-0 p-1 rounded-[var(--radius-md)] hover:bg-foreground/10 transition-colors ${styles.icon}`}
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
