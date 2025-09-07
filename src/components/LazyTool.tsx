/**
 * LazyTool - Lazy-loaded tool component wrapper
 * 
 * Implements code splitting for tool pages to improve initial load performance.
 * Each tool is loaded only when needed, reducing the initial bundle size.
 */

import { lazy, Suspense, ComponentType } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Loading skeleton component for tools
 */
const ToolSkeleton = () => (
  <div className="space-y-8">
    {/* Header skeleton */}
    <Card>
      <CardContent className="pt-6">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>

    {/* Tool interface skeleton */}
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

/**
 * Lazy load a tool component
 */
export const createLazyTool = (importFn: () => Promise<{ default: ComponentType<unknown> }>) => {
  const LazyComponent = lazy(importFn);

  return (props: Record<string, unknown>) => (
    <Suspense fallback={<ToolSkeleton />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Lazy-loaded tool components
export const LazyWordCounter = createLazyTool(() => import('@/pages/tools/WordCounter'));
export const LazyCaseConverter = createLazyTool(() => import('@/pages/tools/CaseConverter'));
export const LazyLineBreaks = createLazyTool(() => import('@/pages/tools/LineBreaks'));
export const LazyDiffChecker = createLazyTool(() => import('@/pages/tools/DiffChecker'));
export const LazyLoremIpsum = createLazyTool(() => import('@/pages/tools/LoremIpsum'));
export const LazyTextSorter = createLazyTool(() => import('@/pages/tools/TextSorter'));
