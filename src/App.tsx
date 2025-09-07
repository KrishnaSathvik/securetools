import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useAnalytics } from "@/hooks/useAnalytics";
import { errorReporter } from "@/lib/errorReporting";
import { performanceMonitor } from "@/lib/performance";
import { trackWebVitals } from "@/lib/analytics";
import { trackEnhancedWebVitals } from "@/lib/performance";
import React, { Suspense, lazy } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { About } from "./pages/About";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { FAQ } from "./pages/FAQ";
import { Blog } from "./pages/Blog";
import { Comparisons } from "./pages/Comparisons";

// Lazy load tool pages for code splitting
const PasswordGeneratorPage = lazy(() => import("./pages/tools/PasswordGenerator"));
const TextEncryptorPage = lazy(() => import("./pages/tools/TextEncryptor"));
const SecurityHeadersCheckerPage = lazy(() => import("./pages/tools/SecurityHeadersChecker"));
const TwoFactorAuthPage = lazy(() => import("./pages/tools/TwoFactorAuth"));
const RandomDataGeneratorPage = lazy(() => import("./pages/tools/RandomDataGenerator"));
const PasswordStrengthAnalyzerPage = lazy(() => import("./pages/tools/PasswordStrengthAnalyzer"));

const queryClient = new QueryClient();

// Loading component for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <p className="text-muted-foreground">Loading tool...</p>
    </div>
  </div>
);

const AppContent = () => {
  useAnalytics(); // Initialize Google Analytics

  // Initialize performance monitoring
  React.useEffect(() => {
    performanceMonitor.init();
    
    // Initialize enhanced Core Web Vitals tracking
    trackEnhancedWebVitals();
    
    // Track Web Vitals after page load
    const timer = setTimeout(() => {
      const vitals = performanceMonitor.getWebVitals();
      trackWebVitals(vitals);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route 
          path="/password-generator" 
          element={
            <Suspense fallback={<PageLoader />}>
              <PasswordGeneratorPage />
            </Suspense>
          } 
        />
        <Route 
          path="/text-encryptor" 
          element={
            <Suspense fallback={<PageLoader />}>
              <TextEncryptorPage />
            </Suspense>
          } 
        />
        <Route 
          path="/security-headers-checker" 
          element={
            <Suspense fallback={<PageLoader />}>
              <SecurityHeadersCheckerPage />
            </Suspense>
          } 
        />
        <Route 
          path="/two-factor-auth" 
          element={
            <Suspense fallback={<PageLoader />}>
              <TwoFactorAuthPage />
            </Suspense>
          } 
        />
        <Route 
          path="/random-data-generator" 
          element={
            <Suspense fallback={<PageLoader />}>
              <RandomDataGeneratorPage />
            </Suspense>
          } 
        />
        <Route 
          path="/password-strength-analyzer" 
          element={
            <Suspense fallback={<PageLoader />}>
              <PasswordStrengthAnalyzerPage />
            </Suspense>
          } 
        />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/comparisons" element={<Comparisons />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="securetools-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
