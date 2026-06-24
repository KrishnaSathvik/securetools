import { useState, useCallback } from 'react';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { Button } from '@/components/ui/button';
import { TextArea } from '@/components/ui/TextArea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Copy, Lock, Unlock, Eye, EyeOff, AlertCircle, CheckCircle, Target, Zap } from 'lucide-react';
import { ToolTrustSection, buildTrustDetailsAccordionSection } from '@/components/ToolTrustSection';
import { ToolDetailsAccordion } from '@/components/ToolDetailsAccordion';
import { useToast } from '@/hooks/use-toast';
import { useSEO } from '@/hooks/useSEO';
import { buildWebApplicationSchema } from '@/lib/seo/structuredData';
import { trackTextProcessing, trackInteraction, trackTextEncryption, trackConversion } from '@/lib/analytics';

/**
 * Text Encryptor/Decryptor Tool
 * 
 * Features:
 * - AES-256 encryption/decryption
 * - Password-based encryption
 * - Base64 encoding/decoding
 * - URL encoding/decoding
 * - ROT13 cipher
 * - File encryption support
 * - Multiple encryption modes
 */
export default function TextEncryptor() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('aes');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  useSEO({
    title: 'Text Encryptor/Decryptor - AES-256 Encryption Tool | SecureTools',
    description: 'Encrypt and decrypt text with AES-256 encryption, Base64 encoding, URL encoding, and ROT13 cipher. Secure text encryption tool that runs entirely in your browser.',
    keywords: 'text encryptor, text decryptor, AES encryption, Base64 encoding, URL encoding, ROT13 cipher, cryptography, security tools',
    canonical: 'https://www.securetools.dev/text-encryptor',
    structuredData: buildWebApplicationSchema({
      name: 'Text Encryptor/Decryptor',
      description: 'Browser-based AES-256-GCM encryption and encoding utilities.',
      path: '/text-encryptor',
    }),
  });

  // AES-256 Encryption/Decryption
  const encryptAES = useCallback(async (text: string, password: string) => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      
      // Generate a random IV
      const iv = crypto.getRandomValues(new Uint8Array(12));
      
      // Derive key from password
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      );
      
      const key = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: iv,
          iterations: 100000,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      );
      
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        data
      );
      
      // Combine IV and encrypted data
      const combined = new Uint8Array(iv.length + encrypted.byteLength);
      combined.set(iv);
      combined.set(new Uint8Array(encrypted), iv.length);
      
      return btoa(String.fromCharCode(...combined));
    } catch (err) {
      throw new Error('Encryption failed: ' + (err as Error).message);
    }
  }, []);

  const decryptAES = useCallback(async (encryptedText: string, password: string) => {
    try {
      const decoder = new TextDecoder();
      const combined = Uint8Array.from(atob(encryptedText), c => c.charCodeAt(0));
      
      // Extract IV and encrypted data
      const iv = combined.slice(0, 12);
      const encrypted = combined.slice(12);
      
      // Derive key from password
      const encoder = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      );
      
      const key = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: iv,
          iterations: 100000,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      );
      
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        encrypted
      );
      
      return decoder.decode(decrypted);
    } catch (err) {
      throw new Error('Decryption failed: ' + (err as Error).message);
    }
  }, []);

  // Base64 Encoding/Decoding
  const encodeBase64 = useCallback((text: string) => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (err) {
      throw new Error('Base64 encoding failed');
    }
  }, []);

  const decodeBase64 = useCallback((text: string) => {
    try {
      return decodeURIComponent(escape(atob(text)));
    } catch (err) {
      throw new Error('Base64 decoding failed');
    }
  }, []);

  // URL Encoding/Decoding
  const encodeURL = useCallback((text: string) => {
    return encodeURIComponent(text);
  }, []);

  const decodeURL = useCallback((text: string) => {
    try {
      return decodeURIComponent(text);
    } catch (err) {
      throw new Error('URL decoding failed');
    }
  }, []);

  // ROT13 Cipher
  const rot13 = useCallback((text: string) => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
    });
  }, []);

  const handleEncrypt = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to encrypt');
      return;
    }

    if (activeTab === 'aes' && !password.trim()) {
      setError('Please enter a password for AES encryption');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      let result = '';
      
      switch (activeTab) {
        case 'aes':
          result = await encryptAES(inputText, password);
          break;
        case 'base64':
          result = encodeBase64(inputText);
          break;
        case 'url':
          result = encodeURL(inputText);
          break;
        case 'rot13':
          result = rot13(inputText);
          break;
        default:
          throw new Error('Invalid encryption method');
      }
      
      setOutputText(result);
      
      // Enhanced analytics tracking
      const startTime = Date.now();
      trackTextEncryption({
        algorithm: activeTab.toUpperCase(),
        textLength: inputText.length,
        action: 'encrypted',
        success: true,
        processingTime: Date.now() - startTime
      });
      
      trackConversion('text_encrypted', 'Text Encryptor', inputText.length);
      
      toast({
        title: 'Encryption successful',
        description: 'Text has been encrypted successfully',
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecrypt = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to decrypt');
      return;
    }

    if (activeTab === 'aes' && !password.trim()) {
      setError('Please enter a password for AES decryption');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      let result = '';
      
      switch (activeTab) {
        case 'aes':
          result = await decryptAES(inputText, password);
          break;
        case 'base64':
          result = decodeBase64(inputText);
          break;
        case 'url':
          result = decodeURL(inputText);
          break;
        case 'rot13':
          result = rot13(inputText);
          break;
        default:
          throw new Error('Invalid decryption method');
      }
      
      setOutputText(result);
      toast({
        title: 'Decryption successful',
        description: 'Text has been decrypted successfully',
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: 'Copied to clipboard',
      description: 'Output text has been copied to clipboard',
    });
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setPassword('');
    setError('');
  };

  const toolTrust = {
    badges: [
      { label: 'AES-GCM', variant: 'aes-gcm' as const },
      { label: 'Local', variant: 'local' as const },
    ],
    howItWorks:
      'Encryption and encoding run entirely in your browser. AES-256-GCM uses your passphrase with PBKDF2 key derivation.',
    limitations:
      'Security depends on passphrase strength. Losing the passphrase means losing access. Never send encrypted text and the passphrase together through the same channel.',
    privacyNote: 'Your text and passphrase are not uploaded to SecureTools servers.',
  };

  return (
    <ToolLayout
      title="Text Encryptor/Decryptor"
      description="Encrypt and decrypt text with AES-256 encryption, Base64 encoding, URL encoding, and ROT13 cipher. Secure text encryption tool that runs entirely in your browser."
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Encryption Methods */}
        <Card className="tool-workspace">
          <CardHeader>
            <CardTitle>Encryption Methods</CardTitle>
            <CardDescription>
              Choose your preferred method. All processing happens locally in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto gap-1">
                <TabsTrigger value="aes" className="text-xs sm:text-sm">AES-GCM encryption</TabsTrigger>
                <TabsTrigger value="base64" className="text-xs sm:text-sm">Base64 encoding</TabsTrigger>
                <TabsTrigger value="url" className="text-xs sm:text-sm">URL encoding</TabsTrigger>
                <TabsTrigger value="rot13" className="text-xs sm:text-sm">ROT13 transform</TabsTrigger>
              </TabsList>

              <p className="text-sm text-muted-foreground mt-4 mb-2 rounded-md border border-border/60 bg-muted/30 px-3 py-2">
                {activeTab === 'aes' && 'AES-GCM encrypts text using your passphrase.'}
                {activeTab === 'base64' && 'Base64 is encoding, not encryption.'}
                {activeTab === 'url' && 'URL encoding is for safe transmission in URLs — not encryption.'}
                {activeTab === 'rot13' && 'ROT13 is a simple text transformation, not security.'}
              </p>
              
              <TabsContent value="aes" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Passphrase</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter encryption passphrase"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide passphrase' : 'Show passphrase'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Uses AES-256-GCM encryption with PBKDF2 key derivation.
                  </p>
                  <Alert className="surface-warning border">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      If you forget the passphrase, SecureTools cannot recover the encrypted text.
                    </AlertDescription>
                  </Alert>
                </div>
              </TabsContent>
              
              <TabsContent value="base64" className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Base64 encoding is not encryption - it's just encoding. Use AES-256 for actual encryption.
                  </AlertDescription>
                </Alert>
              </TabsContent>
              
              <TabsContent value="url" className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    URL encoding is not encryption - it's just encoding. Use AES-256 for actual encryption.
                  </AlertDescription>
                </Alert>
              </TabsContent>
              
              <TabsContent value="rot13" className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    ROT13 is not encryption - it's a simple substitution cipher. Use AES-256 for actual encryption.
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Input/Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Unlock className="h-5 w-5" />
                Input Text
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TextArea
                value={inputText}
                onValueChange={setInputText}
                placeholder="Enter text to encrypt or decrypt..."
                className="min-h-[200px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Output Text
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TextArea
                value={outputText}
                onValueChange={setOutputText}
                placeholder="Encrypted or decrypted text will appear here..."
                className="min-h-[200px]"
                readOnly
              />
            </CardContent>
          </Card>
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleEncrypt}
            disabled={isProcessing || !inputText.trim()}
            className="flex items-center gap-2"
          >
            <Lock className="h-4 w-4" />
            {isProcessing ? 'Encrypting...' : 'Encrypt'}
          </Button>
          
          <Button
            onClick={handleDecrypt}
            disabled={isProcessing || !inputText.trim()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Unlock className="h-4 w-4" />
            {isProcessing ? 'Decrypting...' : 'Decrypt'}
          </Button>
          
          <Button
            onClick={handleCopy}
            disabled={!outputText.trim()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy Output
          </Button>
          
          <Button
            onClick={handleClear}
            variant="outline"
            className="flex items-center gap-2"
          >
            Clear All
          </Button>
        </div>

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
                      <p className="font-medium text-foreground">Authenticated encryption</p>
                      <p>AES-GCM is a widely used authenticated encryption mode for protecting text with a passphrase.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" aria-hidden />
                    <div>
                      <p className="font-medium text-foreground">Encoding utilities</p>
                      <p>Base64 and URL encoding for data representation — distinct from encryption.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" aria-hidden />
                    <div>
                      <p className="font-medium text-foreground">Passphrase-based keys</p>
                      <p>PBKDF2 key derivation from your passphrase. Strength depends on passphrase quality.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" aria-hidden />
                    <div>
                      <p className="font-medium text-foreground">Local processing</p>
                      <p>All operations happen in your browser — sensitive text is not uploaded.</p>
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
                  <li>AES-256-GCM encryption</li>
                  <li>PBKDF2 key derivation</li>
                  <li>Base64 encoding/decoding</li>
                  <li>URL encoding/decoding</li>
                  <li>ROT13 text transformation</li>
                  <li>Web Crypto API integration</li>
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
                    <h4 className="font-semibold text-foreground mb-2">AES-256 encryption</h4>
                    <ul className="space-y-1 list-disc pl-5">
                      <li>Industry-standard AES-256-GCM encryption</li>
                      <li>256-bit key length</li>
                      <li>GCM mode for authenticated encryption</li>
                      <li>PBKDF2 key derivation (100,000 iterations)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Local processing</h4>
                    <ul className="space-y-1 list-disc pl-5">
                      <li>All encryption happens in your browser</li>
                      <li>No data sent to servers</li>
                      <li>Your text never leaves your device</li>
                      <li>Uses Web Crypto API for security</li>
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">AES-256-GCM</Badge>
                    <Badge variant="secondary">PBKDF2</Badge>
                    <Badge variant="secondary">Web Crypto API</Badge>
                    <Badge variant="secondary">Local Processing</Badge>
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