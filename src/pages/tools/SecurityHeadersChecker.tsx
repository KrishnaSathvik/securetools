import { useState, useCallback } from 'react';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ExternalLink, 
  Search,
  Copy,
  RefreshCw,
  Globe,
  Lock,
  Eye,
  AlertCircle,
  Zap
} from 'lucide-react';
import { ToolTrustSection, buildTrustDetailsAccordionSection } from '@/components/ToolTrustSection';
import { ToolDetailsAccordion } from '@/components/ToolDetailsAccordion';
import { useToast } from '@/hooks/use-toast';
import { useSEO } from '@/hooks/useSEO';
import { buildWebApplicationSchema } from '@/lib/seo/structuredData';

interface SecurityHeader {
  name: string;
  present: boolean;
  value?: string;
  status: 'good' | 'warning' | 'error' | 'missing';
  description: string;
  recommendation?: string;
}

interface SSLInfo {
  valid: boolean;
  issuer?: string;
  subject?: string;
  validFrom?: string;
  validTo?: string;
  protocol?: string;
  cipher?: string;
}

const SECURITY_HEADERS_LIST: Omit<SecurityHeader, 'present' | 'value' | 'status'>[] = [
    {
      name: 'Strict-Transport-Security (HSTS)',
      description: 'Forces HTTPS connections and prevents protocol downgrade attacks',
      recommendation: 'Set max-age to at least 31536000 (1 year)'
    },
    {
      name: 'Content-Security-Policy (CSP)',
      description: 'Prevents XSS attacks by controlling resource loading',
      recommendation: 'Implement a strict CSP policy with nonce or hash-based sources'
    },
    {
      name: 'X-Frame-Options',
      description: 'Prevents clickjacking attacks by controlling iframe embedding',
      recommendation: 'Set to DENY or SAMEORIGIN'
    },
    {
      name: 'X-Content-Type-Options',
      description: 'Prevents MIME type sniffing attacks',
      recommendation: 'Set to nosniff'
    },
    {
      name: 'Referrer-Policy',
      description: 'Controls referrer information sent with requests',
      recommendation: 'Set to strict-origin-when-cross-origin or stricter'
    },
    {
      name: 'Permissions-Policy',
      description: 'Controls browser features and APIs',
      recommendation: 'Restrict unnecessary features like camera, microphone, etc.'
    },
    {
      name: 'X-XSS-Protection',
      description: 'Enables XSS filtering in older browsers',
      recommendation: 'Set to 1; mode=block (deprecated, use CSP instead)'
    },
    {
      name: 'Expect-CT',
      description: 'Enforces Certificate Transparency',
      recommendation: 'Set max-age and enforce (deprecated, use Expect-Staple)'
    }
  ];

export default function SecurityHeadersChecker() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [securityHeaders, setSecurityHeaders] = useState<SecurityHeader[]>([]);
  const [sslInfo, setSslInfo] = useState<SSLInfo | null>(null);
  const [overallScore, setOverallScore] = useState(0);
  const [error, setError] = useState('');
  const { toast } = useToast();

  useSEO({
    title: 'Security Headers Checker (Demo) | SecureTools',
    description:
      'Educational demo that explains common HTTP security headers. Does not perform live remote scanning from the browser.',
    keywords: 'security headers, HSTS, CSP, X-Frame-Options, educational demo, browser security',
    canonical: 'https://www.securetools.dev/security-headers-checker',
    structuredData: buildWebApplicationSchema({
      name: 'Security Headers Checker (Demo)',
      description: 'Educational security headers review demo.',
      path: '/security-headers-checker',
    }),
  });

  const analyzeSecurityHeaders = useCallback(async (targetUrl: string) => {
    try {
      // Note: Due to CORS restrictions, we can't directly fetch headers from arbitrary URLs
      // This is a simulation of what the analysis would look like
      // In a real implementation, you'd need a backend service to fetch headers
      
      const mockHeaders: SecurityHeader[] = SECURITY_HEADERS_LIST.map(header => {
        const random = Math.random();
        let status: 'good' | 'warning' | 'error' | 'missing';
        let present = false;
        let value = '';

        if (random > 0.7) {
          status = 'good';
          present = true;
          value = getMockHeaderValue(header.name);
        } else if (random > 0.4) {
          status = 'warning';
          present = true;
          value = getMockHeaderValue(header.name, true);
        } else if (random > 0.2) {
          status = 'error';
          present = true;
          value = getMockHeaderValue(header.name, false);
        } else {
          status = 'missing';
          present = false;
        }

        return {
          ...header,
          present,
          value,
          status
        };
      });

      setSecurityHeaders(mockHeaders);
      
      // Calculate overall score
      const score = Math.round((mockHeaders.filter(h => h.status === 'good').length / mockHeaders.length) * 100);
      setOverallScore(score);

      // Mock SSL info
      setSslInfo({
        valid: Math.random() > 0.3,
        issuer: 'Let\'s Encrypt Authority X3',
        subject: 'CN=example.com',
        validFrom: '2024-01-01',
        validTo: '2024-12-31',
        protocol: 'TLS 1.3',
        cipher: 'TLS_AES_256_GCM_SHA384'
      });

      toast({
        title: 'Analysis complete',
        description: `Security analysis completed for ${targetUrl}`,
      });

    } catch (err) {
      setError('Failed to analyze security headers: ' + (err as Error).message);
    }
  }, [toast]);

  const getMockHeaderValue = (headerName: string, isWarning = false): string => {
    const values: Record<string, { good: string; warning: string }> = {
      'Strict-Transport-Security (HSTS)': {
        good: 'max-age=31536000; includeSubDomains; preload',
        warning: 'max-age=86400'
      },
      'Content-Security-Policy (CSP)': {
        good: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
        warning: "default-src *; script-src 'unsafe-inline' 'unsafe-eval'"
      },
      'X-Frame-Options': {
        good: 'DENY',
        warning: 'SAMEORIGIN'
      },
      'X-Content-Type-Options': {
        good: 'nosniff',
        warning: 'nosniff'
      },
      'Referrer-Policy': {
        good: 'strict-origin-when-cross-origin',
        warning: 'origin'
      },
      'Permissions-Policy': {
        good: 'camera=(), microphone=(), geolocation=()',
        warning: 'camera=*'
      },
      'X-XSS-Protection': {
        good: '1; mode=block',
        warning: '1'
      },
      'Expect-CT': {
        good: 'max-age=86400, enforce',
        warning: 'max-age=86400'
      }
    };

    return values[headerName]?.[isWarning ? 'warning' : 'good'] || 'Not set';
  };

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('Please enter a URL to analyze');
      return;
    }

    // Basic URL validation
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setSecurityHeaders([]);
    setSslInfo(null);
    setOverallScore(0);

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await analyzeSecurityHeaders(url);
    setIsAnalyzing(false);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'URL copied',
      description: 'URL has been copied to clipboard',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'missing':
        return <XCircle className="h-4 w-4 text-gray-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good':
        return <Badge className="bg-success">Good</Badge>;
      case 'warning':
        return <Badge className="bg-warning">Warning</Badge>;
      case 'error':
        return <Badge className="bg-destructive">Error</Badge>;
      case 'missing':
        return <Badge variant="outline">Missing</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const toolTrust = {
    badges: [
      { label: 'Demo', variant: 'demo' as const },
      { label: 'Local', variant: 'local' as const },
    ],
    callouts: [
      {
        variant: 'warning' as const,
        content: (
          <>
            <strong>Demo only:</strong> Browsers block reading response headers from other sites (CORS).
            Results here are simulated for education — not a live scan of the URL you enter.
          </>
        ),
      },
    ],
    howItWorks:
      'This educational demo generates sample header values locally to teach what common HTTP security headers do and how they are typically configured.',
    limitations:
      'Browsers block reading response headers from arbitrary websites (CORS). Results are simulated — not fetched from the URL you enter. Real header validation requires server-side scanning or infrastructure you control.',
    privacyNote:
      'The URL you type is used only as demo context in your browser. No scan request is sent to SecureTools servers.',
  };

  return (
    <ToolLayout
      title="Security Headers Checker (Demo)"
      description="Learn what common HTTP security headers do. This browser demo does not fetch live headers from arbitrary websites."
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* URL Input */}
        <Card className="tool-workspace">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 flex-wrap">
              <Globe className="h-5 w-5" aria-hidden />
              Simulated Header Review
            </CardTitle>
            <CardDescription>
              Enter any URL to run an educational demo — sample header values are generated locally, not fetched from the site.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1"
                  />
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !url.trim()}
                    className="flex items-center gap-2"
                  >
                    {isAnalyzing ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                    {isAnalyzing ? 'Running demo...' : 'Run demo review'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Example only — results are simulated in your browser.
                </p>
              </div>
              
              {url && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Demo context for:</span>
                  <code className="bg-muted px-2 py-1 rounded">{url}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyUrl}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {securityHeaders.length > 0 && (
          <div className="space-y-6">
            {/* Overall Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Educational demo score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{overallScore}%</span>
                    <div className="flex items-center gap-2">
                      {overallScore >= 80 ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : overallScore >= 60 ? (
                        <AlertTriangle className="h-5 w-5 text-warning" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                      <span className="text-sm text-muted-foreground">
                        {overallScore >= 80 ? 'Good' : overallScore >= 60 ? 'Needs Improvement' : 'Poor'}
                      </span>
                    </div>
                  </div>
                  <Progress value={overallScore} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Security Headers */}
            <Card>
              <CardHeader>
                <CardTitle>Sample Security Headers (Simulated)</CardTitle>
                <CardDescription>
                  Example header values generated locally for learning — not read from the live site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityHeaders.map((header, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(header.status)}
                          <h4 className="font-semibold">{header.name}</h4>
                        </div>
                        {getStatusBadge(header.status)}
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {header.description}
                      </p>
                      
                      {header.present && header.value && (
                        <div className="bg-muted p-3 rounded">
                          <code className="text-sm break-all">{header.value}</code>
                        </div>
                      )}
                      
                      {header.recommendation && (
                        <div className="text-sm">
                          <strong>Recommendation:</strong> {header.recommendation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SSL/TLS Information */}
            {sslInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Simulated SSL/TLS Information (Demo)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {sslInfo.valid ? (
                          <CheckCircle className="h-4 w-4 text-success" />
                        ) : (
                          <XCircle className="h-4 w-4 text-destructive" />
                        )}
                        <span className="font-medium">Certificate Status (simulated)</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {sslInfo.valid ? 'Valid' : 'Invalid or Expired'}
                      </p>
                    </div>
                    
                    {sslInfo.issuer && (
                      <div className="space-y-2">
                        <span className="font-medium">Issuer</span>
                        <p className="text-sm text-muted-foreground">{sslInfo.issuer}</p>
                      </div>
                    )}
                    
                    {sslInfo.protocol && (
                      <div className="space-y-2">
                        <span className="font-medium">Protocol</span>
                        <p className="text-sm text-muted-foreground">{sslInfo.protocol}</p>
                      </div>
                    )}
                    
                    {sslInfo.cipher && (
                      <div className="space-y-2">
                        <span className="font-medium">Cipher Suite</span>
                        <p className="text-sm text-muted-foreground">{sslInfo.cipher}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* What this demo is / is not */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                What this demo is good for
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Learning common headers</p>
                  <p className="text-sm text-muted-foreground">See what headers like CSP, HSTS, and X-Frame-Options are meant to do.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Understanding CSP / HSTS / X-Frame-Options</p>
                  <p className="text-sm text-muted-foreground">Review sample values and recommendations in plain language.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Preparing a checklist</p>
                  <p className="text-sm text-muted-foreground">Use the demo as a study aid before validating headers on your own server or CI pipeline.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-destructive" />
                What this demo is not
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Not a live security audit</p>
                  <p className="text-sm text-muted-foreground">Browsers cannot reliably read arbitrary sites&apos; response headers from client-side JavaScript.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Not certificate validation</p>
                  <p className="text-sm text-muted-foreground">SSL/TLS details shown here are simulated examples, not live certificate checks.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Not a replacement for server-side scanning</p>
                  <p className="text-sm text-muted-foreground">Use your hosting provider, security scanner, or controlled proxy for real validation.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ToolTrustSection {...toolTrust} />

        <ToolDetailsAccordion
          title="Learn more about this demo"
          sections={[
            buildTrustDetailsAccordionSection(toolTrust),
            {
              id: 'demo-features',
              title: 'Demo features',
              content: (
                <ul className="space-y-2 list-disc pl-5">
                  <li>Simulated security header examples</li>
                  <li>Educational demo score (not a live rating)</li>
                  <li>HSTS, CSP, X-Frame-Options explanations</li>
                  <li>Sample SSL/TLS panel labeled as simulated</li>
                  <li>Privacy-focused — all processing in browser</li>
                </ul>
              ),
            },
            {
              id: 'security-info',
              title: 'Security information',
              content: (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Security headers analyzed</h4>
                    <ul className="space-y-1 list-disc pl-5">
                      <li><strong>Content-Security-Policy:</strong> Helps mitigate XSS</li>
                      <li><strong>X-Frame-Options:</strong> Helps prevent clickjacking</li>
                      <li><strong>X-Content-Type-Options:</strong> Helps prevent MIME sniffing</li>
                      <li><strong>Strict-Transport-Security:</strong> Enforces HTTPS</li>
                      <li><strong>Referrer-Policy:</strong> Controls referrer information</li>
                      <li><strong>Permissions-Policy:</strong> Controls browser features</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">What this demo covers</h4>
                    <ul className="space-y-1 list-disc pl-5">
                      <li>Sample header presence and values</li>
                      <li>Educational security score (simulated)</li>
                      <li>Explanations and recommendations</li>
                      <li>No data sent to SecureTools servers</li>
                      <li>Not a substitute for server-side scanning</li>
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Educational Demo</Badge>
                    <Badge variant="secondary">Security Headers</Badge>
                    <Badge variant="secondary">Local Only</Badge>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </ToolLayout>
  );
}
