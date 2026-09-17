import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { SISTER_SITES } from '@/lib/sisterSites';

const footerLinks = [
  { name: 'About', path: '/about' },
  { name: 'Guides', path: '/blog' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Compare', path: '/comparisons' },
  { name: 'Privacy', path: '/privacy' },
  { name: 'Terms', path: '/terms' },
];

export const Footer = () => {
  return (
    <footer className="bg-nav-background border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Footer">
            {footerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="text-left sm:text-right">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Built for developers. All tools run locally in your browser.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              © {new Date().getFullYear()} SecureTools. All rights reserved.
            </p>
          </div>
        </div>

        <nav
          aria-label="Related sites"
          className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground text-center sm:text-left shrink-0">
            Also check
          </p>
          <ul className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
            {SISTER_SITES.map((site) => (
              <li key={site.url}>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-3 py-1.5 text-sm text-foreground hover:bg-secondary hover:border-primary/30 transition-colors"
                >
                  <span className="font-medium">{site.name}</span>
                  <span className="text-muted-foreground hidden sm:inline">· {site.shortLabel}</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};
