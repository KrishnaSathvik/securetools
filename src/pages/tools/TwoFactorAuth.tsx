import { useState, useEffect, useCallback } from 'react';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  QrCode, 
  Copy, 
  RefreshCw, 
  Clock, 
  Key,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  AlertTriangle,
  Target,
  Zap
} from 'lucide-react';
import { ToolTrustSection, buildTrustDetailsAccordionSection } from '@/components/ToolTrustSection';
import { ToolDetailsAccordion } from '@/components/ToolDetailsAccordion';
import { useToast } from '@/hooks/use-toast';
import { useSEO } from '@/hooks/useSEO';
import { buildWebApplicationSchema } from '@/lib/seo/structuredData';
import {
  generateTotpSecret,
  generateTotpCode,
  buildOtpAuthUri,
  getTotpTimeRemaining,
  generateBackupCodes,
} from '@/lib/totp';
import QRCode from 'react-qr-code';

interface TOTPCode {
  code: string;
  timeLeft: number;
  period: number;
}

export default function TwoFactorAuth() {
  const [secret, setSecret] = useState('');
  const [issuer, setIssuer] = useState('SecureTools');
  const [account, setAccount] = useState('user@example.com');
  const [totpCode, setTotpCode] = useState<TOTPCode | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [qrCodeData, setQrCodeData] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const { toast } = useToast();

  useSEO({
    title: 'Two-Factor Authentication Generator - TOTP & QR Code Tool | SecureTools',
    description:
      'Generate RFC 6238 TOTP codes, scannable otpauth QR codes, and backup codes locally in your browser.',
    keywords: '2FA generator, TOTP generator, QR code, authenticator app, two factor authentication, backup codes, security',
    canonical: 'https://www.securetools.dev/two-factor-auth',
    structuredData: buildWebApplicationSchema({
      name: 'Two-Factor Authentication Generator',
      description: 'Browser-based RFC 6238 TOTP and QR setup helper.',
      path: '/two-factor-auth',
    }),
  });

  const generateSecret = useCallback(() => {
    setSecret(generateTotpSecret());
  }, []);

  const generateTOTP = useCallback((secretKey: string) => {
    try {
      return generateTotpCode(secretKey);
    } catch {
      return '000000';
    }
  }, []);

  const generateBackupCodesList = useCallback(() => {
    setBackupCodes(generateBackupCodes());
  }, []);

  const generateQRCodeData = useCallback((secretKey: string, issuerName: string, accountName: string) => {
    return buildOtpAuthUri(secretKey, issuerName, accountName);
  }, []);

  // Update TOTP code every second
  useEffect(() => {
    if (!secret) return;

    const updateCode = () => {
      const now = Date.now();
      const period = 30;
      const timeLeft = getTotpTimeRemaining(now);
      
      setTotpCode({
        code: generateTOTP(secret),
        timeLeft,
        period
      });
    };

    updateCode();
    const interval = setInterval(updateCode, 1000);

    return () => clearInterval(interval);
  }, [secret, generateTOTP]);

  // Generate initial secret and backup codes
  useEffect(() => {
    if (!secret) {
      generateSecret();
    }
    if (backupCodes.length === 0) {
      generateBackupCodesList();
    }
  }, [secret, generateSecret, backupCodes.length, generateBackupCodesList]);

  // Update QR code data when secret, issuer, or account changes
  useEffect(() => {
    if (secret) {
      setQrCodeData(generateQRCodeData(secret, issuer, account));
    }
  }, [secret, issuer, account, generateQRCodeData]);

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secret);
    toast({
      title: 'Secret copied',
      description: 'Secret key has been copied to clipboard',
    });
  };

  const handleCopyTOTP = () => {
    if (totpCode) {
      navigator.clipboard.writeText(totpCode.code);
      toast({
        title: 'TOTP code copied',
        description: 'TOTP code has been copied to clipboard',
      });
    }
  };

  const handleCopyBackupCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Backup code copied',
      description: 'Backup code has been copied to clipboard',
    });
  };

  const handleCopyQRData = () => {
    navigator.clipboard.writeText(qrCodeData);
    toast({
      title: 'QR code data copied',
      description: 'QR code data has been copied to clipboard',
    });
  };

  const handleRegenerateSecret = () => {
    generateSecret();
    toast({
      title: 'Secret regenerated',
      description: 'New secret key has been generated',
    });
  };

  const handleRegenerateBackupCodes = () => {
    generateBackupCodesList();
    toast({
      title: 'Backup codes regenerated',
      description: 'New backup codes have been generated',
    });
  };

  const toolTrust = {
    badges: [
      { label: 'TOTP', variant: 'totp' as const },
      { label: 'Local', variant: 'local' as const },
    ],
    callouts: [
      {
        variant: 'info' as const,
        content:
          "This tool helps you set up or test TOTP locally. For production services, register secrets only through your provider's official setup flow.",
      },
      {
        variant: 'warning' as const,
        content: (
          <>
            <strong>Protect your secret:</strong> Anyone with your TOTP secret or QR code can generate your codes.
            Do not share QR codes, screenshots, or backup codes.
          </>
        ),
      },
    ],
    howItWorks:
      'TOTP codes and QR codes are generated locally using RFC 6238-compatible logic. Secrets stay in your browser session unless you copy them elsewhere.',
    limitations:
      'Treat TOTP secrets like passwords. Do not share QR codes or screenshots. Save backup codes offline and use a trusted authenticator app for production accounts.',
    privacyNote: 'Secrets and backup codes are not sent to SecureTools servers.',
  };

  return (
    <ToolLayout
      title="Two-Factor Authentication Generator"
      description="Generate RFC 6238 TOTP codes, scannable otpauth QR codes, and backup codes locally in your browser."
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Setup Configuration */}
        <Card className="tool-workspace">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              2FA Setup Configuration
            </CardTitle>
            <CardDescription>
              Configure your 2FA settings and generate the necessary codes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issuer">Issuer (Service Name)</Label>
                <Input
                  id="issuer"
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  placeholder="MyApp"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account">Account (Email/Username)</Label>
                <Input
                  id="account"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  placeholder="user@example.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="totp" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="totp">TOTP Codes</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
            <TabsTrigger value="backup">Backup Codes</TabsTrigger>
          </TabsList>

          {/* TOTP Codes Tab */}
          <TabsContent value="totp" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Secret Key
                </CardTitle>
                <CardDescription>
                  This secret key is used to generate TOTP codes. Keep it secure and don't share it.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Secret Key (Base32)</Label>
                  <div className="flex gap-2">
                    <Input
                      value={secret}
                      onChange={(e) => setSecret(e.target.value)}
                      type={showSecret ? 'text' : 'password'}
                      className="font-mono"
                      readOnly
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSecret(!showSecret)}
                    >
                      {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopySecret}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRegenerateSecret}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Current TOTP Code
                </CardTitle>
                <CardDescription>
                  This code changes every 30 seconds. Use it to verify your authenticator app setup.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {totpCode && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-mono font-bold text-primary mb-2">
                        {totpCode.code}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Expires in {totpCode.timeLeft} seconds</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${(totpCode.timeLeft / totpCode.period) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button onClick={handleCopyTOTP} className="flex items-center gap-2">
                        <Copy className="h-4 w-4" />
                        Copy Code
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* QR Code Tab */}
          <TabsContent value="qr" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  QR Code for Authenticator Apps
                </CardTitle>
                <CardDescription>
                  Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="surface-warning border">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Treat this QR code and secret like a password.
                  </AlertDescription>
                </Alert>
                {qrCodeData && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="inline-block p-4 bg-white rounded-lg border-2 border-gray-200">
                        <QRCode value={qrCodeData} size={192} level="M" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Scan with Google Authenticator, Authy, or another RFC 6238 app
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>QR Code Data (otpauth:// URL)</Label>
                      <div className="flex gap-2">
                        <Input
                          value={qrCodeData}
                          readOnly
                          className="font-mono text-xs"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCopyQRData}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backup Codes Tab */}
          <TabsContent value="backup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Backup Codes
                </CardTitle>
                <CardDescription>
                  Save these backup codes in a secure place. Each code can only be used once.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="surface-warning border">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Important:</strong> Store backup codes offline. Do not save them in screenshots or shared notes.
                    Each code can only be used once.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 gap-2">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="font-mono text-sm">{code}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyBackupCode(code)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    onClick={handleRegenerateBackupCodes}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Regenerate Backup Codes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <ToolTrustSection {...toolTrust} />

        <ToolDetailsAccordion
          sections={[
            buildTrustDetailsAccordionSection(toolTrust),
            {
              id: 'why-use',
              title: 'Why use this tool',
              content: (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" aria-hidden />
                    <div>
                      <p className="font-medium text-foreground">Learn and test TOTP</p>
                      <p>Generate time-based one-time passwords that change every 30 seconds for setup practice.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" aria-hidden />
                    <div>
                      <p className="font-medium text-foreground">QR setup data</p>
                      <p>Create QR codes and backup codes for authenticator apps like Google Authenticator or Authy.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" aria-hidden />
                    <div>
                      <p className="font-medium text-foreground">RFC 6238 compatible</p>
                      <p>Uses the standard TOTP algorithm for broad authenticator compatibility.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" aria-hidden />
                    <div>
                      <p className="font-medium text-foreground">Backup codes</p>
                      <p>Generate one-time backup codes for testing recovery workflows.</p>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: 'key-features',
              title: 'Key features',
              content: (
                <ul className="space-y-2 list-disc pl-5">
                  <li>TOTP code generation</li>
                  <li>QR code for authenticator apps</li>
                  <li>Backup codes generation</li>
                  <li>RFC 6238 compliant</li>
                  <li>Base32 secret encoding</li>
                  <li>Real-time code updates</li>
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
                    <h4 className="font-semibold text-foreground mb-2">TOTP security</h4>
                    <ul className="space-y-1 list-disc pl-5">
                      <li><strong>RFC 6238 compliant:</strong> Industry standard TOTP</li>
                      <li><strong>30-second time windows:</strong> Codes expire quickly</li>
                      <li><strong>HMAC-SHA1 algorithm:</strong> Standard TOTP construction</li>
                      <li><strong>Base32 encoding:</strong> Safe for QR codes and manual entry</li>
                      <li><strong>6-digit codes:</strong> Balance of security and usability</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Implementation features</h4>
                    <ul className="space-y-1 list-disc pl-5">
                      <li>Web Crypto API for secure randomness</li>
                      <li>QR code generation for easy setup</li>
                      <li>Real-time code updates every 30 seconds</li>
                      <li>Manual secret entry option</li>
                      <li>Compatible with Google Authenticator, Authy</li>
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">TOTP</Badge>
                    <Badge variant="secondary">RFC 6238</Badge>
                    <Badge variant="secondary">HMAC-SHA1</Badge>
                    <Badge variant="secondary">QR Code</Badge>
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
