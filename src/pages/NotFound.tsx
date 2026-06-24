import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useSEO({
    title: 'Page Not Found - SecureTools',
    description: 'The page you requested could not be found on SecureTools.',
    canonical: 'https://www.securetools.dev/404',
  });

  useEffect(() => {
    document.title = 'Page Not Found | SecureTools';
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold gradient-text mb-4">404</p>
        <h1 className="text-xl font-semibold text-foreground mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn&apos;t find <code className="text-sm bg-muted px-1 rounded">{location.pathname}</code>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Back to home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/password-generator">
              <Search className="w-4 h-4 mr-2" />
              Browse tools
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
