import { Link } from 'react-router-dom';

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
      </div>
    </footer>
  );
};
