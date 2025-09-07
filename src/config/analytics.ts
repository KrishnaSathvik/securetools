/**
 * Google Analytics 4 Configuration for SecureTools
 * 
 * This file contains the GA4 configuration and event tracking
 * for security tools usage and user behavior analysis.
 */

// gtag function is declared in src/lib/analytics.ts

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-YQ9REBSGME';

// Security Tool Events
export const SECURITY_EVENTS = {
  // Password Generator Events
  PASSWORD_GENERATED: 'password_generated',
  PASSWORD_COPIED: 'password_copied',
  PASSWORD_DOWNLOADED: 'password_downloaded',
  PASSWORD_STRENGTH_ANALYZED: 'password_strength_analyzed',
  
  // Text Encryptor Events
  TEXT_ENCRYPTED: 'text_encrypted',
  TEXT_DECRYPTED: 'text_decrypted',
  ENCRYPTION_ALGORITHM_CHANGED: 'encryption_algorithm_changed',
  
  // Security Headers Events
  HEADERS_CHECKED: 'headers_checked',
  SECURITY_SCORE_CALCULATED: 'security_score_calculated',
  SECURITY_REPORT_EXPORTED: 'security_report_exported',
  
  // Two-Factor Auth Events
  TOTP_GENERATED: 'totp_generated',
  QR_CODE_GENERATED: 'qr_code_generated',
  BACKUP_CODES_GENERATED: 'backup_codes_generated',
  
  // Random Data Generator Events
  RANDOM_DATA_GENERATED: 'random_data_generated',
  UUID_GENERATED: 'uuid_generated',
  RANDOM_STRING_GENERATED: 'random_string_generated',
  
  // Password Analyzer Events
  PASSWORD_ANALYZED: 'password_analyzed',
  ENTROPY_CALCULATED: 'entropy_calculated',
  SECURITY_RECOMMENDATIONS_VIEWED: 'security_recommendations_viewed',
  
  // General Events
  TOOL_ACCESSED: 'tool_accessed',
  TOOL_SHARED: 'tool_shared',
  SECURITY_ARTICLE_READ: 'security_article_read',
  FAQ_VIEWED: 'faq_viewed',
  COMPARISON_VIEWED: 'comparison_viewed'
};

// Security Tool Categories
export const SECURITY_CATEGORIES = {
  PASSWORD_GENERATOR: 'password_generator',
  TEXT_ENCRYPTOR: 'text_encryptor',
  SECURITY_HEADERS: 'security_headers',
  TWO_FACTOR_AUTH: 'two_factor_auth',
  RANDOM_DATA: 'random_data',
  PASSWORD_ANALYZER: 'password_analyzer'
};

// Security Tool Parameters
export const SECURITY_PARAMETERS = {
  TOOL_NAME: 'tool_name',
  TOOL_CATEGORY: 'tool_category',
  PASSWORD_LENGTH: 'password_length',
  PASSWORD_STRENGTH: 'password_strength',
  ENCRYPTION_ALGORITHM: 'encryption_algorithm',
  SECURITY_SCORE: 'security_score',
  HEADERS_CHECKED: 'headers_checked',
  MISSING_HEADERS: 'missing_headers',
  TOTP_ALGORITHM: 'totp_algorithm',
  RANDOM_DATA_TYPE: 'random_data_type',
  RANDOM_DATA_LENGTH: 'random_data_length',
  ENTROPY_BITS: 'entropy_bits',
  SECURITY_RISKS: 'security_risks',
  ARTICLE_TITLE: 'article_title',
  ARTICLE_CATEGORY: 'article_category',
  FAQ_QUESTION: 'faq_question',
  COMPARISON_TOOL: 'comparison_tool'
};

// Conversion Goals
export const CONVERSION_GOALS = {
  PASSWORD_GENERATED: 'password_generation',
  TEXT_ENCRYPTED: 'text_encryption',
  HEADERS_CHECKED: 'security_headers_check',
  TOTP_GENERATED: 'totp_generation',
  RANDOM_DATA_GENERATED: 'random_data_generation',
  PASSWORD_ANALYZED: 'password_analysis',
  SECURITY_ARTICLE_READ: 'security_content_engagement',
  TOOL_SHARED: 'tool_sharing'
};

// Security-focused custom dimensions
export const CUSTOM_DIMENSIONS = {
  SECURITY_TOOL_USAGE: 'security_tool_usage',
  PASSWORD_SECURITY_LEVEL: 'password_security_level',
  ENCRYPTION_STRENGTH: 'encryption_strength',
  SECURITY_HEADER_SCORE: 'security_header_score',
  USER_SECURITY_KNOWLEDGE: 'user_security_knowledge',
  SECURITY_TOOL_CATEGORY: 'security_tool_category'
};

// Security-focused custom metrics
export const CUSTOM_METRICS = {
  PASSWORD_ENTROPY: 'password_entropy',
  SECURITY_SCORE: 'security_score',
  ENCRYPTION_TIME: 'encryption_time',
  HEADERS_ANALYZED: 'headers_analyzed',
  SECURITY_RISKS_IDENTIFIED: 'security_risks_identified',
  SECURITY_IMPROVEMENTS_MADE: 'security_improvements_made'
};

// Security tool usage tracking
export const trackSecurityToolUsage = (toolName, category, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', SECURITY_EVENTS.TOOL_ACCESSED, {
      event_category: 'security_tools',
      event_label: toolName,
      custom_map: {
        [SECURITY_PARAMETERS.TOOL_NAME]: toolName,
        [SECURITY_PARAMETERS.TOOL_CATEGORY]: category,
        ...parameters
      }
    });
  }
};

// Password generation tracking
export const trackPasswordGeneration = (length, strength, entropy) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', SECURITY_EVENTS.PASSWORD_GENERATED, {
      event_category: 'password_generator',
      event_label: 'password_created',
      value: entropy,
      custom_map: {
        [SECURITY_PARAMETERS.PASSWORD_LENGTH]: length,
        [SECURITY_PARAMETERS.PASSWORD_STRENGTH]: strength,
        [SECURITY_PARAMETERS.ENTROPY_BITS]: entropy
      }
    });
  }
};

// Security headers checking tracking
export const trackSecurityHeadersCheck = (url, score, missingHeaders) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', SECURITY_EVENTS.HEADERS_CHECKED, {
      event_category: 'security_headers',
      event_label: 'headers_analyzed',
      value: score,
      custom_map: {
        [SECURITY_PARAMETERS.SECURITY_SCORE]: score,
        [SECURITY_PARAMETERS.HEADERS_CHECKED]: url,
        [SECURITY_PARAMETERS.MISSING_HEADERS]: missingHeaders.join(',')
      }
    });
  }
};

// Text encryption tracking
export const trackTextEncryption = (algorithm, textLength) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', SECURITY_EVENTS.TEXT_ENCRYPTED, {
      event_category: 'text_encryptor',
      event_label: 'text_encrypted',
      value: textLength,
      custom_map: {
        [SECURITY_PARAMETERS.ENCRYPTION_ALGORITHM]: algorithm,
        [SECURITY_PARAMETERS.RANDOM_DATA_LENGTH]: textLength
      }
    });
  }
};

// Security article reading tracking
export const trackSecurityArticleRead = (title, category, readTime) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', SECURITY_EVENTS.SECURITY_ARTICLE_READ, {
      event_category: 'security_content',
      event_label: 'article_read',
      value: readTime,
      custom_map: {
        [SECURITY_PARAMETERS.ARTICLE_TITLE]: title,
        [SECURITY_PARAMETERS.ARTICLE_CATEGORY]: category
      }
    });
  }
};

// Security tool sharing tracking
export const trackSecurityToolShare = (toolName, method) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', SECURITY_EVENTS.TOOL_SHARED, {
      event_category: 'security_tools',
      event_label: 'tool_shared',
      custom_map: {
        [SECURITY_PARAMETERS.TOOL_NAME]: toolName,
        [SECURITY_PARAMETERS.RANDOM_DATA_TYPE]: method
      }
    });
  }
};

// Initialize Google Analytics 4
export const initializeGA4 = () => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      // Security-focused configuration
      custom_map: CUSTOM_DIMENSIONS,
      send_page_view: true,
      anonymize_ip: true, // Privacy-focused
      allow_google_signals: false, // Disable for privacy
      allow_ad_personalization_signals: false // Disable for privacy
    });
    
    console.log('🔒 Google Analytics 4 initialized for SecureTools');
  }
};

// Security-focused page view tracking
export const trackPageView = (pageTitle, pagePath) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: pageTitle,
      page_location: window.location.href,
      page_path: pagePath
    });
  }
};

// Helper functions for analytics
export const getGoogleAnalyticsId = () => GA_MEASUREMENT_ID;
export const isAnalyticsConfigured = () => GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX';

// Export all tracking functions
export default {
  GA_MEASUREMENT_ID,
  SECURITY_EVENTS,
  SECURITY_CATEGORIES,
  SECURITY_PARAMETERS,
  CONVERSION_GOALS,
  CUSTOM_DIMENSIONS,
  CUSTOM_METRICS,
  trackSecurityToolUsage,
  trackPasswordGeneration,
  trackSecurityHeadersCheck,
  trackTextEncryption,
  trackSecurityArticleRead,
  trackSecurityToolShare,
  initializeGA4,
  trackPageView
};