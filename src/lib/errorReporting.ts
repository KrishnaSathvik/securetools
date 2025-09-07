/**
 * Error Reporting Service
 * 
 * A lightweight error reporting system that can be easily replaced with Sentry later.
 * Currently logs errors to console and can send to a custom endpoint.
 */

interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  userId?: string;
  context?: Record<string, any>;
}

class ErrorReporter {
  private isProduction = import.meta.env.PROD;
  private endpoint = ''; // Disabled - using Google Analytics for error tracking

  /**
   * Report an error
   */
  reportError(error: Error, context?: Record<string, any>) {
    const errorReport: ErrorReport = {
      message: error.message,
      stack: error.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      context
    };

    // Log to console in development
    if (!this.isProduction) {
      console.error('Error Report:', errorReport);
    }

    // Send to error reporting service in production
    if (this.isProduction) {
      this.sendErrorReport(errorReport);
    }
  }

  /**
   * Send error report to external service
   */
  private async sendErrorReport(errorReport: ErrorReport) {
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
        body: JSON.stringify(errorReport),
      });
    } catch (err) {
      console.error('Failed to send error report:', err);
    }
  }

  /**
   * Set up global error handlers
   */
  setupGlobalErrorHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError(new Error(event.reason), {
        type: 'unhandledrejection',
        reason: event.reason
      });
    });

    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      this.reportError(event.error || new Error(event.message), {
        type: 'uncaught',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });
  }
}

// Create singleton instance
export const errorReporter = new ErrorReporter();

// Initialize global error handlers
errorReporter.setupGlobalErrorHandlers();

/**
 * React Error Boundary Hook
 */
export const useErrorReporting = () => {
  const reportError = (error: Error, context?: Record<string, any>) => {
    errorReporter.reportError(error, context);
  };

  return { reportError };
};
