import { useEffect } from 'react';
import { initializeAnalytics, trackPageView } from '@/lib/analytics';
import { useLocation } from 'react-router-dom';
import { getGoogleAnalyticsId, isAnalyticsConfigured } from '@/config/analytics';

/**
 * Custom hook for initializing and managing analytics
 * 
 * Automatically initializes Google Analytics 4 and tracks page views
 * when the route changes. Handles analytics setup and cleanup.
 * 
 * @example
 * ```tsx
 * const App = () => {
 *   useAnalytics(); // Initialize analytics
 *   return <div>App content</div>;
 * };
 * ```
 */
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics if configured
    if (isAnalyticsConfigured()) {
      const measurementId = getGoogleAnalyticsId();
      if (measurementId) {
        initializeAnalytics(measurementId);
        console.log('✅ Google Analytics initialized with ID:', measurementId);
      }
    } else {
      console.log('⚠️ Google Analytics not configured. Update src/config/analytics.ts with your Measurement ID');
    }
  }, []);

  useEffect(() => {
    // Track page views on route changes
    if (isAnalyticsConfigured()) {
      const pageTitle = document.title;
      const pagePath = location.pathname + location.search;
      
      trackPageView(pageTitle, pagePath);
    }
  }, [location]);
};
