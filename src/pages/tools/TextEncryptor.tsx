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
import { useToast } from '@/hooks/use-toast';
import { useSEO } from '@/hooks/useSEO';
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
    canonical: 'https://www.securetools.dev/text-encryptor'
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

  return (
    <ToolLayout
      title="Text Encryptor/Decryptor"
      description="Encrypt and decrypt text with AES-256 encryption, Base64 encoding, URL encoding, and ROT13 cipher. Secure text encryption tool that runs entirely in your browser."
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Encryption Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Encryption Methods</CardTitle>
            <CardDescription>
              Choose your preferred encryption method. All processing happens locally in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="aes">AES-256</TabsTrigger>
                <TabsTrigger value="base64">Base64</TabsTrigger>
                <TabsTrigger value="url">URL</TabsTrigger>
                <TabsTrigger value="rot13">ROT13</TabsTrigger>
              </TabsList>
              
              <TabsContent value="aes" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter encryption password"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Uses AES-256-GCM encryption with PBKDF2 key derivation
                  </p>
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

        {/* Why Use + Key Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Why Use Text Encryptor?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Secure Data Protection</p>
                  <p className="text-sm text-muted-foreground">Encrypt sensitive text using AES-256-GCM encryption, the same standard used by banks and government agencies.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Multiple Encoding Options</p>
                  <p className="text-sm text-muted-foreground">Handle Base64, URL encoding, and ROT13 cipher for various data representation and obfuscation needs.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Password-Based Security</p>
                  <p className="text-sm text-muted-foreground">Use strong passwords with PBKDF2 key derivation to secure your encrypted data with military-grade protection.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Local Processing</p>
                  <p className="text-sm text-muted-foreground">All encryption happens in your browser - your sensitive data never leaves your device for maximum privacy.</p>
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
                <span className="text-sm">AES-256-GCM encryption</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">PBKDF2 key derivation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Base64 encoding/decoding</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">URL encoding/decoding</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">ROT13 cipher</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Web Crypto API integration</span>
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
              <CheckCircle className="h-5 w-5 text-green-500" />
              Security Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">AES-256 Encryption</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Military-grade encryption standard</li>
                  <li>• 256-bit key length</li>
                  <li>• GCM mode for authenticated encryption</li>
                  <li>• PBKDF2 key derivation (100,000 iterations)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Local Processing</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• All encryption happens in your browser</li>
                  <li>• No data sent to servers</li>
                  <li>• Your text never leaves your device</li>
                  <li>• Uses Web Crypto API for security</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">AES-256-GCM</Badge>
              <Badge variant="secondary">PBKDF2</Badge>
              <Badge variant="secondary">Web Crypto API</Badge>
              <Badge variant="secondary">Local Processing</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}