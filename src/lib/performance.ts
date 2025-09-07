/**
 * Performance Monitoring
 * 
 * Tracks Core Web Vitals and other performance metrics
 */

interface PerformanceMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  navigationType: string;
}

interface WebVitals {
  CLS: number | null;
  FID: number | null;
  FCP: number | null;
  LCP: number | null;
  TTFB: number | null;
}

class PerformanceMonitor {
  private isProduction = import.meta.env.PROD;
  private metrics: PerformanceMetric[] = [];
  private endpoint = ''; // Disabled - using Google Analytics for performance tracking

  /**
   * Initialize performance monitoring
   */
  init() {
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals
    this.trackCLS();
    this.trackFID();
    this.trackFCP();
    this.trackLCP();
    this.trackTTFB();

    // Track custom metrics
    this.trackPageLoadTime();
    this.trackResourceTiming();
  }

  /**
   * Track Cumulative Layout Shift (CLS)
   */
  private trackCLS() {
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          clsEntries.push(entry);
        }
      }
    });

    observer.observe({ entryTypes: ['layout-shift'] });

    // Report CLS when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.reportMetric('CLS', clsValue, clsEntries.length);
      }
    });
  }

  /**
   * Track First Input Delay (FID)
   */
  private trackFID() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fid = (entry as any).processingStart - entry.startTime;
        this.reportMetric('FID', fid, 1);
      }
    });

    observer.observe({ entryTypes: ['first-input'] });
  }

  /**
   * Track First Contentful Paint (FCP)
   */
  private trackFCP() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.reportMetric('FCP', entry.startTime, 1);
        }
      }
    });

    observer.observe({ entryTypes: ['paint'] });
  }

  /**
   * Track Largest Contentful Paint (LCP)
   */
  private trackLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.reportMetric('LCP', lastEntry.startTime, 1);
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  /**
   * Track Time to First Byte (TTFB)
   */
  private trackTTFB() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const ttfb = (entry as any).responseStart - (entry as any).requestStart;
          this.reportMetric('TTFB', ttfb, 1);
        }
      }
    });

    observer.observe({ entryTypes: ['navigation'] });
  }

  /**
   * Track page load time
   */
  private trackPageLoadTime() {
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      this.reportMetric('PageLoad', loadTime, 1);
    });
  }

  /**
   * Track resource timing
   */
  private trackResourceTiming() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resourceTime = (entry as any).responseEnd - (entry as any).requestStart;
          this.reportMetric('ResourceLoad', resourceTime, 1, {
            name: entry.name,
            type: (entry as any).initiatorType
          });
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  /**
   * Report a performance metric
   */
  private reportMetric(name: string, value: number, delta: number, context?: Record<string, any>) {
    const metric: PerformanceMetric = {
      name,
      value,
      delta,
      id: Math.random().toString(36).substr(2, 9),
      navigationType: performance.navigation?.type?.toString() || 'unknown'
    };

    this.metrics.push(metric);

    // Log in development
    if (!this.isProduction) {
      console.log(`Performance Metric [${name}]:`, value, context);
    }

    // Send to analytics in production
    if (this.isProduction) {
      this.sendMetric(metric, context);
    }
  }

  /**
   * Send metric to analytics service
   */
  private async sendMetric(metric: PerformanceMetric, context?: Record<string, any>) {
    // Skip if no endpoint is configured
    if (!this.endpoint) {
      return;
    }

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...metric,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          context
        }),
      });
    } catch (err) {
      console.error('Failed to send performance metric:', err);
    }
  }

  /**
   * Get current Web Vitals
   */
  getWebVitals(): WebVitals {
    const vitals: WebVitals = {
      CLS: null,
      FID: null,
      FCP: null,
      LCP: null,
      TTFB: null
    };

    this.metrics.forEach(metric => {
      if (metric.name in vitals) {
        (vitals as any)[metric.name] = metric.value;
      }
    });

    return vitals;
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Initialize performance monitoring
performanceMonitor.init();

/**
 * Enhanced Core Web Vitals tracking with detailed metrics
 */
export const trackEnhancedWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Track LCP (Largest Contentful Paint)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    
    if (lastEntry) {
      window.gtag?.('event', 'web_vitals', {
        metric_name: 'LCP',
        metric_value: lastEntry.startTime,
        metric_rating: getVitalRating('LCP', lastEntry.startTime),
        metric_delta: lastEntry.startTime,
        metric_id: lastEntry.id,
        metric_navigation_type: lastEntry.navigationType || 'unknown'
      });
    }
  });
  lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

  // Track FID (First Input Delay)
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      const fid = (entry as any).processingStart - entry.startTime;
      
      window.gtag?.('event', 'web_vitals', {
        metric_name: 'FID',
        metric_value: fid,
        metric_rating: getVitalRating('FID', fid),
        metric_delta: fid,
        metric_id: entry.name,
        metric_navigation_type: entry.navigationType || 'unknown'
      });
    });
  });
  fidObserver.observe({ entryTypes: ['first-input'] });

  // Track CLS (Cumulative Layout Shift)
  let clsValue = 0;
  let clsEntries: PerformanceEntry[] = [];
  
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
        clsEntries.push(entry);
      }
    }
  });
  clsObserver.observe({ entryTypes: ['layout-shift'] });

  // Report CLS when page is hidden
  const reportCLS = () => {
    if (clsValue > 0) {
      window.gtag?.('event', 'web_vitals', {
        metric_name: 'CLS',
        metric_value: clsValue,
        metric_rating: getVitalRating('CLS', clsValue),
        metric_delta: clsValue,
        metric_id: 'cls-' + Date.now(),
        metric_navigation_type: 'unknown'
      });
    }
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      reportCLS();
    }
  });

  // Track FCP (First Contentful Paint)
  const fcpObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        window.gtag?.('event', 'web_vitals', {
          metric_name: 'FCP',
          metric_value: entry.startTime,
          metric_rating: getVitalRating('FCP', entry.startTime),
          metric_delta: entry.startTime,
          metric_id: entry.name,
          metric_navigation_type: entry.navigationType || 'unknown'
        });
      }
    }
  });
  fcpObserver.observe({ entryTypes: ['paint'] });

  // Track TTFB (Time to First Byte)
  const ttfbObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'navigation') {
        const ttfb = (entry as any).responseStart - (entry as any).requestStart;
        window.gtag?.('event', 'web_vitals', {
          metric_name: 'TTFB',
          metric_value: ttfb,
          metric_rating: getVitalRating('TTFB', ttfb),
          metric_delta: ttfb,
          metric_id: entry.name,
          metric_navigation_type: entry.navigationType || 'unknown'
        });
      }
    }
  });
  ttfbObserver.observe({ entryTypes: ['navigation'] });

  // Track additional performance metrics
  const trackAdditionalMetrics = () => {
    // Track page load time
    const loadTime = performance.now();
    window.gtag?.('event', 'performance_metric', {
      metric_name: 'PageLoad',
      metric_value: loadTime,
      metric_rating: loadTime < 3000 ? 'good' : loadTime < 5000 ? 'needs_improvement' : 'poor'
    });

    // Track DOM content loaded
    const domContentLoaded = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (domContentLoaded) {
      const domContentLoadedTime = domContentLoaded.domContentLoadedEventEnd - domContentLoaded.domContentLoadedEventStart;
      window.gtag?.('event', 'performance_metric', {
        metric_name: 'DOMContentLoaded',
        metric_value: domContentLoadedTime,
        metric_rating: domContentLoadedTime < 1000 ? 'good' : domContentLoadedTime < 2000 ? 'needs_improvement' : 'poor'
      });
    }

    // Track resource loading performance
    const resources = performance.getEntriesByType('resource');
    resources.forEach((resource) => {
      const loadTime = resource.responseEnd - resource.requestStart;
      window.gtag?.('event', 'resource_performance', {
        resource_name: resource.name,
        resource_type: (resource as any).initiatorType,
        load_time: loadTime,
        resource_size: (resource as any).transferSize || 0
      });
    });
  };

  // Track metrics after page load
  window.addEventListener('load', () => {
    setTimeout(trackAdditionalMetrics, 1000);
  });
};

/**
 * Get rating for a Web Vital metric
 */
const getVitalRating = (metric: string, value: number): string => {
  const thresholds: Record<string, { good: number; needsImprovement: number }> = {
    CLS: { good: 0.1, needsImprovement: 0.25 },
    FID: { good: 100, needsImprovement: 300 },
    FCP: { good: 1800, needsImprovement: 3000 },
    LCP: { good: 2500, needsImprovement: 4000 },
    TTFB: { good: 800, needsImprovement: 1800 },
  };

  const threshold = thresholds[metric];
  if (!threshold) return 'unknown';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs_improvement';
  return 'poor';
};
