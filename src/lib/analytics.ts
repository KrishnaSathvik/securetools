/**
 * Analytics tracking functions for SecureTools
 * 
 * Provides comprehensive analytics tracking for:
 * - Tool usage and interactions
 * - User behavior and engagement
 * - Performance metrics
 * - Error tracking
 * - Conversion tracking
 * 
 * All tracking is privacy-focused and GDPR compliant.
 */

// Google Analytics 4 configuration
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/**
 * Initialize Google Analytics 4
 * 
 * @param measurementId - GA4 Measurement ID (G-XXXXXXXXXX)
 */
export const initializeAnalytics = (measurementId: string) => {
  if (typeof window === 'undefined' || window.gtag) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false,
    anonymize_ip: true,
  });
};

/**
 * Track page views
 * 
 * @param pageTitle - Title of the page
 * @param pagePath - Path of the page
 */
export const trackPageView = (pageTitle: string, pagePath: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_title: pageTitle,
    page_location: window.location.origin + pagePath,
    page_path: pagePath,
  });
};

/**
 * Track tool usage
 * 
 * @param toolName - Name of the tool being used
 * @param action - Action performed (e.g., 'format', 'convert', 'generate')
 * @param details - Additional details about the action
 */
export const trackToolUsage = (toolName: string, action: string, details?: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'tool_usage', {
    tool_name: toolName,
    action: action,
    ...details,
  });
};

/**
 * Track text processing operations
 * 
 * @param toolName - Name of the tool
 * @param operation - Type of operation (e.g., 'word_count', 'case_convert')
 * @param inputLength - Length of input text
 * @param processingTime - Time taken to process (in milliseconds)
 */
export const trackTextProcessing = (
  toolName: string,
  operation: string,
  inputLength: number,
  processingTime?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'text_processing', {
    tool_name: toolName,
    operation: operation,
    input_length: inputLength,
    processing_time: processingTime,
  });
};

/**
 * Track user interactions
 * 
 * @param interaction - Type of interaction (e.g., 'copy', 'download', 'clear')
 * @param toolName - Name of the tool
 * @param details - Additional interaction details
 */
export const trackInteraction = (
  interaction: string,
  toolName: string,
  details?: Record<string, any>
) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'user_interaction', {
    interaction_type: interaction,
    tool_name: toolName,
    ...details,
  });
};

/**
 * Track errors
 * 
 * @param error - Error message or type
 * @param toolName - Name of the tool where error occurred
 * @param details - Additional error details
 */
export const trackError = (error: string, toolName: string, details?: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'error', {
    error_message: error,
    tool_name: toolName,
    ...details,
  });
};

/**
 * Track performance metrics
 * 
 * @param metric - Performance metric name
 * @param value - Metric value
 * @param toolName - Name of the tool
 */
export const trackPerformance = (metric: string, value: number, toolName: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'performance_metric', {
    metric_name: metric,
    metric_value: value,
    tool_name: toolName,
  });
};

/**
 * Track Core Web Vitals
 * 
 * @param vitals - Web Vitals object
 */
export const trackWebVitals = (vitals: {
  CLS?: number | null;
  FID?: number | null;
  FCP?: number | null;
  LCP?: number | null;
  TTFB?: number | null;
}) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  // Track each vital separately
  Object.entries(vitals).forEach(([metric, value]) => {
    if (value !== null && value !== undefined) {
      window.gtag('event', 'web_vitals', {
        metric_name: metric,
        metric_value: value,
        metric_rating: getVitalRating(metric, value),
      });
    }
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

/**
 * Track search queries
 * 
 * @param query - Search query
 * @param resultsCount - Number of results returned
 */
export const trackSearch = (query: string, resultsCount: number) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'search', {
    search_term: query,
    results_count: resultsCount,
  });
};

/**
 * Track file operations
 * 
 * @param operation - File operation type (e.g., 'upload', 'download')
 * @param fileType - Type of file
 * @param fileSize - Size of file in bytes
 * @param toolName - Name of the tool
 */
export const trackFileOperation = (
  operation: string,
  fileType: string,
  fileSize: number,
  toolName: string
) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'file_operation', {
    operation_type: operation,
    file_type: fileType,
    file_size: fileSize,
    tool_name: toolName,
  });
};

/**
 * Track conversion events
 * 
 * @param conversionType - Type of conversion (e.g., 'tool_used', 'feature_discovered')
 * @param toolName - Name of the tool
 * @param value - Conversion value (optional)
 */
export const trackConversion = (
  conversionType: string,
  toolName: string,
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'conversion', {
    conversion_type: conversionType,
    tool_name: toolName,
    value: value,
  });
};

// Enhanced password generation tracking
export const trackPasswordGeneration = (details: {
  length: number;
  strength: string;
  entropy: number;
  characterSets: string[];
  action: 'generated' | 'copied' | 'downloaded';
  toolType: 'password' | 'passphrase' | 'mnemonic';
}) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'password_generation', {
    event_category: 'security_tools',
    event_label: 'password_created',
    value: details.entropy,
    custom_map: {
      password_length: details.length,
      password_strength: details.strength,
      entropy_bits: details.entropy,
      character_sets: details.characterSets.join(','),
      action_type: details.action,
      tool_type: details.toolType
    }
  });
};

// Enhanced text encryption tracking
export const trackTextEncryption = (details: {
  algorithm: string;
  textLength: number;
  action: 'encrypted' | 'decrypted';
  success: boolean;
  processingTime?: number;
}) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'text_encryption', {
    event_category: 'security_tools',
    event_label: 'text_processed',
    value: details.textLength,
    custom_map: {
      encryption_algorithm: details.algorithm,
      text_length: details.textLength,
      action_type: details.action,
      success: details.success,
      processing_time: details.processingTime || 0
    }
  });
};

// Enhanced security headers tracking
export const trackSecurityHeadersAnalysis = (details: {
  url: string;
  securityScore: number;
  missingHeaders: string[];
  totalHeaders: number;
  sslValid: boolean;
  processingTime?: number;
}) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'security_headers_analysis', {
    event_category: 'security_tools',
    event_label: 'headers_analyzed',
    value: details.securityScore,
    custom_map: {
      analyzed_url: details.url,
      security_score: details.securityScore,
      missing_headers: details.missingHeaders.join(','),
      total_headers: details.totalHeaders,
      ssl_valid: details.sslValid,
      processing_time: details.processingTime || 0
    }
  });
};

// Enhanced 2FA tracking
export const trackTwoFactorAuth = (details: {
  action: 'totp_generated' | 'qr_created' | 'backup_codes_generated';
  algorithm: string;
  secretLength: number;
  qrSize?: string;
  backupCodesCount?: number;
}) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'two_factor_auth', {
    event_category: 'security_tools',
    event_label: '2fa_action',
    value: details.secretLength,
    custom_map: {
      action_type: details.action,
      totp_algorithm: details.algorithm,
      secret_length: details.secretLength,
      qr_size: details.qrSize || '',
      backup_codes_count: details.backupCodesCount || 0
    }
  });
};

// Enhanced random data generation tracking
export const trackRandomDataGeneration = (details: {
  dataType: string;
  length: number;
  format: string;
  action: 'generated' | 'copied' | 'downloaded';
  entropy?: number;
}) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'random_data_generation', {
    event_category: 'security_tools',
    event_label: 'data_generated',
    value: details.length,
    custom_map: {
      data_type: details.dataType,
      data_length: details.length,
      data_format: details.format,
      action_type: details.action,
      entropy_bits: details.entropy || 0
    }
  });
};

// Enhanced password analysis tracking
export const trackPasswordAnalysis = (details: {
  passwordLength: number;
  strengthScore: number;
  entropy: number;
  risks: string[];
  recommendations: string[];
  analysisTime: number;
}) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'password_analysis', {
    event_category: 'security_tools',
    event_label: 'password_analyzed',
    value: details.strengthScore,
    custom_map: {
      password_length: details.passwordLength,
      strength_score: details.strengthScore,
      entropy_bits: details.entropy,
      security_risks: details.risks.join(','),
      recommendations_count: details.recommendations.length,
      analysis_time: details.analysisTime
    }
  });
};
