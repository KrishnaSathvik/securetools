import { Link } from 'react-router-dom';

/**
 * Footer - The main footer component for SecureTools
 * 
 * Features:
 * - Essential page links (About, Blog, FAQ, Compare, Privacy, Terms)
 * - Copyright information
 * - Responsive design
 * - Consistent styling with the app theme
 * 
 * @example
 * ```tsx
 * // Used in main app layout
 * <Footer />
 * 
 * // Automatically handles:
 * // - Responsive footer layout
 * // - Theme-consistent styling
 * // - Navigation to essential pages
 * ```
 * 
 * Responsive Behavior:
 * - Desktop: Horizontal layout with links and copyright
 * - Mobile: Stacked layout for better mobile experience
 * 
 * @returns JSX element containing the complete footer interface
 */
export const Footer = () => {
  return (
    <footer className="bg-nav-background border-t border-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
          {/* Footer Links */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:items-start gap-3 sm:gap-4 lg:gap-6">
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
              <Link 
                to="/about" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded-md hover:bg-secondary/50"
              >
                About
              </Link>
              <Link 
                to="/blog" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded-md hover:bg-secondary/50"
              >
                Blog
              </Link>
              <Link 
                to="/faq" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded-md hover:bg-secondary/50"
              >
                FAQ
              </Link>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
              <Link 
                to="/comparisons" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded-md hover:bg-secondary/50"
              >
                Compare
              </Link>
              <Link 
                to="/privacy" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded-md hover:bg-secondary/50"
              >
                Privacy
              </Link>
              <Link 
                to="/terms" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded-md hover:bg-secondary/50"
              >
                Terms
              </Link>
            </div>
          </div>
          
          {/* Copyright and Description */}
          <div className="text-center lg:text-right">
            <div className="text-xs sm:text-sm text-muted-foreground mb-2">
              Your security tools toolkit. All tools run locally in your browser.
            </div>
            <div className="text-xs text-muted-foreground">
              © 2025 SecureTools. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
