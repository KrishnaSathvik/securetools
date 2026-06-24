import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SEARCH_INDEX, type SearchResultType } from '@/data/searchIndex';

const tools = [
  { name: 'Password', path: '/password-generator', full: 'Password & Passphrase Generator', keywords: ['password', 'cspng', 'passphrase', 'diceware'] },
  { name: 'Encryptor', path: '/text-encryptor', full: 'Text Encryptor/Decryptor', keywords: ['encrypt', 'aes-gcm', 'base64', 'cipher'] },
  { name: 'Headers (Demo)', path: '/security-headers-checker', full: 'Security Headers Checker (Demo)', keywords: ['headers', 'demo', 'hsts', 'csp'] },
  { name: '2FA', path: '/two-factor-auth', full: 'Two-Factor Authentication Generator', keywords: ['2fa', 'totp', 'authenticator', 'qr'] },
  { name: 'Random', path: '/random-data-generator', full: 'Random Data Generator', keywords: ['random', 'token', 'uuid', 'api key'] },
  { name: 'Analyzer', path: '/password-strength-analyzer', full: 'Password Strength Analyzer', keywords: ['password strength', 'breach database', 'pattern', 'analyzer'] },
];

export const Navigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchIndex = SEARCH_INDEX;

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.securetools.dev/'
      }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const tool = tools.find(t => t.path === currentPath);
      const name = tool ? tool.full : segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      
      breadcrumbs.push({
        '@type': 'ListItem',
        position: index + 2,
        name: name,
        item: `https://www.securetools.dev${currentPath}`
      });
    });

    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs
    };
    
    const existingScript = document.querySelector('script[data-breadcrumb]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-breadcrumb', 'true');
    script.textContent = JSON.stringify(breadcrumbData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-breadcrumb]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const filteredResults = searchIndex.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    const haystack = [item.name, ...item.keywords].join(' ').toLowerCase();
    return haystack.includes(query);
  });

  const handleResultSelect = (path: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const typeBadgeClass: Record<SearchResultType, string> = {
    Tool: 'bg-success/15 text-success',
    Article: 'bg-info/15 text-info',
    Page: 'bg-secondary text-muted-foreground',
  };

  return (
    <>
      <nav className="bg-nav-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-12 sm:h-14 gap-4">
            <div className="flex items-center gap-1 min-w-0">
              <Link to="/" className="flex items-center gap-2 shrink-0 mr-2 sm:mr-4">
                <img 
                  src="/favicon.svg" 
                  alt="SecureTools Logo" 
                  className="w-5 h-5"
                />
                <span className="text-base font-semibold text-foreground">
                  SecureTools
                </span>
              </Link>

              <div className="hidden lg:flex items-center gap-0.5">
                {tools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className={`px-2.5 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
                      location.pathname === tool.path
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tool.name}
                  </Link>
                ))}
                <Link
                  to="/blog"
                  className={`px-2.5 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
                    location.pathname.startsWith('/blog')
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Guides
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-2 py-1.5 h-8"
                aria-label="Open search"
              >
                <Search className="w-3.5 h-3.5" aria-hidden />
                <span className="hidden md:inline text-xs">Search</span>
                <kbd className="hidden md:inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-xs text-muted-foreground">
                  ⌘K
                </kbd>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-1.5 h-8 w-8"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border bg-card/50 backdrop-blur-sm">
              <div className="space-y-2 px-2">
                {tools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === tool.path
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    {tool.full}
                  </Link>
                ))}
                <Link
                  to="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname.startsWith('/blog')
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  Guides
                </Link>
                
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <Search className="w-4 h-4" aria-hidden />
                  Search
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Search SecureTools"
          onClick={() => setIsSearchOpen(false)}
        >
          <div 
            className="fixed left-1/2 top-1/4 sm:top-1/3 -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:w-[90vw] max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-card border border-border rounded-lg shadow-lg">
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground" aria-hidden />
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search tools, articles, pages..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search tools, articles, and pages"
                />
                <kbd className="hidden sm:inline-flex px-2 py-1 text-xs text-muted-foreground bg-muted rounded">ESC</kbd>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {filteredResults.length > 0 ? (
                  filteredResults.slice(0, 12).map((result) => (
                    <button
                      key={`${result.type}-${result.path}`}
                      type="button"
                      onClick={() => handleResultSelect(result.path)}
                      className="flex w-full items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors border-b border-border last:border-b-0 text-left"
                    >
                      <span className={`text-xs font-medium rounded px-1.5 py-0.5 shrink-0 ${typeBadgeClass[result.type]}`}>
                        {result.type}
                      </span>
                      <span className="font-medium text-foreground text-sm truncate">{result.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                    No results for &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
