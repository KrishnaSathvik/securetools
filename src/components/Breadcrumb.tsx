import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

// Available security tools for breadcrumb mapping
const tools = [
  { name: 'Password', path: '/password-generator', full: 'Password & Passphrase Generator' },
  { name: 'Encryptor', path: '/text-encryptor', full: 'Text Encryptor/Decryptor' },
  { name: 'Headers', path: '/security-headers-checker', full: 'Security Headers Checker' },
  { name: '2FA', path: '/two-factor-auth', full: 'Two-Factor Authentication Generator' },
  { name: 'Random', path: '/random-data-generator', full: 'Random Data Generator' },
  { name: 'Analyzer', path: '/password-strength-analyzer', full: 'Password Strength Analyzer' }
];

const Breadcrumb = ({ items, className = "" }: BreadcrumbProps) => {
  const location = useLocation();
  
  // Generate breadcrumb items from current path if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Only add Home if we're not on the home page
    if (location.pathname !== '/') {
      breadcrumbs.push({ label: 'Home', href: '/' });
    }

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Look up tool name from tools array, fallback to formatted segment
      const tool = tools.find(t => t.path === currentPath);
      const label = tool ? tool.full : segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.label === 'Home' && (
            <Home className="w-4 h-4 mr-1 text-muted-foreground" />
          )}
          
          {item.href ? (
            <Link
              to={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium" aria-current="page">
              {item.label}
            </span>
          )}
          
          {index < breadcrumbItems.length - 1 && (
            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
