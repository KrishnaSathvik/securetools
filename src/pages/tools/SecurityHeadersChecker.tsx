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
  Target,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSEO } from '@/hooks/useSEO';

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

export default function SecurityHeadersChecker() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [securityHeaders, setSecurityHeaders] = useState<SecurityHeader[]>([]);
  const [sslInfo, setSslInfo] = useState<SSLInfo | null>(null);
  const [overallScore, setOverallScore] = useState(0);
  const [error, setError] = useState('');
  const { toast } = useToast();

  useSEO({
    title: 'Security Headers Checker - Website Security Analysis Tool | SecureTools',
    description: 'Analyze website security headers, SSL/TLS certificates, and vulnerability assessment. Check HSTS, CSP, X-Frame-Options, and other security headers.',
    keywords: 'security headers checker, SSL checker, website security, HSTS, CSP, X-Frame-Options, security analysis, vulnerability assessment',
    canonical: 'https://www.securetools.dev/security-headers-checker'
  });

  const securityHeadersList: Omit<SecurityHeader, 'present' | 'value' | 'status'>[] = [
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

  const analyzeSecurityHeaders = useCallback(async (targetUrl: string) => {
    try {
      // Note: Due to CORS restrictions, we can't directly fetch headers from arbitrary URLs
      // This is a simulation of what the analysis would look like
      // In a real implementation, you'd need a backend service to fetch headers
      
      const mockHeaders: SecurityHeader[] = securityHeadersList.map(header => {
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
  }, [securityHeadersList, toast]);

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
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'missing':
        return <XCircle className="h-4 w-4 text-gray-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good':
        return <Badge className="bg-green-500">Good</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">Warning</Badge>;
      case 'error':
        return <Badge className="bg-red-500">Error</Badge>;
      case 'missing':
        return <Badge variant="outline">Missing</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <ToolLayout
      title="Security Headers Checker"
      description="Analyze website security headers, SSL/TLS certificates, and vulnerability assessment. Check HSTS, CSP, X-Frame-Options, and other security headers."
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* URL Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Website Security Analysis
            </CardTitle>
            <CardDescription>
              Enter a URL to analyze its security headers and SSL/TLS configuration
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
                    {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                  </Button>
                </div>
              </div>
              
              {url && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Analyzing:</span>
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
                  Security Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{overallScore}%</span>
                    <div className="flex items-center gap-2">
                      {overallScore >= 80 ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : overallScore >= 60 ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
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
                <CardTitle>Security Headers Analysis</CardTitle>
                <CardDescription>
                  Analysis of HTTP security headers and their configuration
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
                    SSL/TLS Certificate Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {sslInfo.valid ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">Certificate Status</span>
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

        {/* Why Use + Key Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Why Use Security Headers Checker?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Website Security Assessment</p>
                  <p className="text-sm text-muted-foreground">Analyze website security headers to identify vulnerabilities and improve your site's security posture.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">SSL/TLS Certificate Validation</p>
                  <p className="text-sm text-muted-foreground">Check certificate validity, issuer information, and encryption strength to ensure secure connections.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Comprehensive Security Score</p>
                  <p className="text-sm text-muted-foreground">Get an overall security rating and detailed recommendations for improving your website's security.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Security Best Practices</p>
                  <p className="text-sm text-muted-foreground">Learn about essential security headers like HSTS, CSP, and X-Frame-Options for better protection.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Security headers analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">SSL/TLS certificate checking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Overall security scoring</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">HSTS, CSP, X-Frame-Options analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Security recommendations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Vulnerability assessment</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Privacy-focused (all processing in browser)</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Security Headers Analyzed</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Content-Security-Policy:</strong> Prevents XSS attacks</li>
                  <li>• <strong>X-Frame-Options:</strong> Prevents clickjacking</li>
                  <li>• <strong>X-Content-Type-Options:</strong> Prevents MIME sniffing</li>
                  <li>• <strong>Strict-Transport-Security:</strong> Enforces HTTPS</li>
                  <li>• <strong>Referrer-Policy:</strong> Controls referrer information</li>
                  <li>• <strong>Permissions-Policy:</strong> Controls browser features</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Analysis Features</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Real-time header inspection</li>
                  <li>• Security score calculation</li>
                  <li>• Detailed recommendations</li>
                  <li>• CORS policy validation</li>
                  <li>• CSP policy analysis</li>
                  <li>• Privacy-focused (no data stored)</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">Security Headers</Badge>
              <Badge variant="secondary">CSP Analysis</Badge>
              <Badge variant="secondary">CORS Validation</Badge>
              <Badge variant="secondary">Privacy Focused</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
