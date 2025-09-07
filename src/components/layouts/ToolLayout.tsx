import { ReactNode } from 'react';
import Breadcrumb from '@/components/Breadcrumb';

/**
 * Example data for tool demonstrations
 */
interface Example {
  name: string;
  input: string;
}

/**
 * Props for the ToolLayout component
 */
interface ToolLayoutProps {
  /** The main content/UI of the tool - typically the tool's input/output interface */
  children: ReactNode;
  /** Optional title for the tool */
  title?: string;
  /** Optional description for the tool */
  description?: string;
  /** Optional examples for the tool */
  examples?: Example[];
  /** Optional callback when an example is selected */
  onFillExample?: (example: Example) => void;
}

/**
 * ToolLayout - A reusable wrapper component for text tools
 * 
 * Provides a consistent layout structure for all tools in the SecureTools application.
 * Includes main content area with proper spacing and responsive design.
 * 
 * @example
 * ```tsx
 * <ToolLayout>
 *   <YourToolContent />
 * </ToolLayout>
 * ```
 * 
 * @param props - The component props
 * @returns JSX element containing the tool page layout
 */
export const ToolLayout = ({ 
  children, 
  title, 
  description, 
  examples, 
  onFillExample 
}: ToolLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Tool Content - Responsive width with better desktop sizing */}
      <div className="w-full px-2 sm:px-4 lg:px-6 xl:px-8">
        <div className="max-w-4xl xl:max-w-5xl mx-auto">
          <div className="mx-0 sm:mx-0">
            {/* Breadcrumb Navigation */}
            <div className="p-3 sm:p-6 pb-2">
              <Breadcrumb />
            </div>
            
            {/* Tool Header */}
            {(title || description) && (
              <div className="p-3 sm:p-6 border-b border-border">
                <div className="text-center">
                  {title && (
                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold gradient-text mb-2 sm:mb-3">
                      {title}
                    </h1>
                  )}
                  {description && (
                    <p className="text-xs sm:text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Tool Content */}
            <div className="w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};