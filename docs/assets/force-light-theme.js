// Force light theme for SecureTools Documentation
(function() {
  'use strict';
  
  // Force light theme immediately
  function forceLightTheme() {
    // Override theme detection
    document.documentElement.dataset.theme = 'light';
    document.documentElement.className = 'light';
    
    // Override localStorage
    localStorage.setItem('tsd-theme', 'light');
    
    // Override any theme switching
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      if (key === 'tsd-theme') {
        value = 'light';
      }
      return originalSetItem.call(this, key, value);
    };
    
    // Force light theme with aggressive CSS
    const style = document.createElement('style');
    style.id = 'force-light-theme';
    style.textContent = `
      /* Force light theme everywhere */
      :root, html, body, * {
        --light-color-background: #ffffff !important;
        --light-color-background-secondary: #f8fafc !important;
        --light-color-text: #1e293b !important;
        --light-color-text-aside: #64748b !important;
        --light-color-accent: #dc2626 !important;
        --light-color-link: #dc2626 !important;
        --light-color-border: #e2e8f0 !important;
        
        --dark-color-background: #ffffff !important;
        --dark-color-background-secondary: #f8fafc !important;
        --dark-color-text: #1e293b !important;
        --dark-color-text-aside: #64748b !important;
        --dark-color-accent: #dc2626 !important;
        --dark-color-link: #dc2626 !important;
        --dark-color-border: #e2e8f0 !important;
        
        --tsd-color-background: #ffffff !important;
        --tsd-color-background-secondary: #f8fafc !important;
        --tsd-color-foreground: #1e293b !important;
        --tsd-color-foreground-secondary: #64748b !important;
        --tsd-color-border: #e2e8f0 !important;
        --tsd-color-accent: #dc2626 !important;
        --tsd-color-accent-foreground: #ffffff !important;
      }
      
      /* Force light theme on all elements */
      html, body, .container, .container-main, .col-content,
      .tsd-page-content, .tsd-panel, .tsd-navigation, .tsd-page-title,
      .tsd-typography, .tsd-comment, .tsd-signature, .tsd-breadcrumb,
      .tsd-page-toolbar, .tsd-navigation a, .tsd-panel h3,
      p, h1, h2, h3, h4, h5, h6, li, span, div, a {
        background-color: #ffffff !important;
        color: #1e293b !important;
      }
      
      /* Specific overrides for TypeDoc elements */
      .tsd-navigation {
        background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%) !important;
      }
      
      .tsd-panel {
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%) !important;
      }
      
      .tsd-page-toolbar {
        background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%) !important;
      }
      
      .tsd-page-title {
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%) !important;
      }
      
      code, pre {
        background-color: rgba(220, 38, 38, 0.1) !important;
        color: #dc2626 !important;
      }
      
      #tsd-search {
        background: #f8fafc !important;
        color: #1e293b !important;
      }
      
      #tsd-search input {
        background: transparent !important;
        color: #1e293b !important;
      }
      
      #tsd-search input::placeholder {
        color: #64748b !important;
      }
    `;
    
    // Remove any existing force-light-theme style
    const existingStyle = document.getElementById('force-light-theme');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // Add the new style
    document.head.appendChild(style);
  }
  
  // Run immediately
  forceLightTheme();
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceLightTheme);
  }
  
  // Run on window load
  window.addEventListener('load', forceLightTheme);
  
  // Run periodically to catch any theme changes
  setInterval(forceLightTheme, 1000);
})();