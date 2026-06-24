import { useState, useCallback } from 'react';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TextArea } from '@/components/ui/TextArea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Shuffle, 
  Copy, 
  RefreshCw, 
  Key,
  Hash,
  Code,
  Lock,
  Shield,
  CheckCircle,
  AlertCircle,
  Download,
  Target,
  Zap
} from 'lucide-react';
import { ToolTrustSection, buildTrustDetailsAccordionSection } from '@/components/ToolTrustSection';
import { ToolDetailsAccordion } from '@/components/ToolDetailsAccordion';
import { useToast } from '@/hooks/use-toast';
import { useSEO } from '@/hooks/useSEO';
import { buildWebApplicationSchema } from '@/lib/seo/structuredData';

interface GenerationOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
  excludeAmbiguous: boolean;
  customChars: string;
}

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  similar: 'il1Lo0O',
  ambiguous: '{}[]()/\\\'"`~,;.<>',
};

export default function RandomDataGenerator() {
  const [output, setOutput] = useState('');
  const [count, setCount] = useState(1);
  const [activeTab, setActiveTab] = useState('strings');
  const [options, setOptions] = useState<GenerationOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false,
    excludeSimilar: false,
    excludeAmbiguous: false,
    customChars: ''
  });
  const { toast } = useToast();

  useSEO({
    title: 'Random Data Generator - Secure Random Strings & Tokens | SecureTools',
    description: 'Generate secure random strings, API keys, tokens, UUIDs, and cryptographic data. Cryptographically secure random data generator that runs entirely in your browser.',
    keywords: 'random data generator, secure random strings, API key generator, token generator, UUID generator, cryptographic random, security tools',
    canonical: 'https://www.securetools.dev/random-data-generator',
    structuredData: buildWebApplicationSchema({
      name: 'Random Data Generator',
      description: 'Generate secure random strings, tokens, and UUIDs in your browser.',
      path: '/random-data-generator',
    }),
  });

  // Generate random string
  const generateRandomString = useCallback((options: GenerationOptions, length: number): string => {
    let charset = '';
    
    if (options.customChars) {
      charset = options.customChars;
    } else {
      if (options.includeUppercase) charset += CHAR_SETS.uppercase;
      if (options.includeLowercase) charset += CHAR_SETS.lowercase;
      if (options.includeNumbers) charset += CHAR_SETS.numbers;
      if (options.includeSymbols) charset += CHAR_SETS.symbols;
      
      if (options.excludeSimilar) {
        charset = charset.split('').filter(char => !CHAR_SETS.similar.includes(char)).join('');
      }
      
      if (options.excludeAmbiguous) {
        charset = charset.split('').filter(char => !CHAR_SETS.ambiguous.includes(char)).join('');
      }
    }

    if (charset.length === 0) {
      throw new Error('No character set available. Please enable at least one character type or provide custom characters.');
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    return Array.from(array, x => charset[x % charset.length]).join('');
  }, []);

  // Generate UUID v4
  const generateUUID = useCallback((): string => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    
    // Set version (4) and variant bits
    array[6] = (array[6] & 0x0f) | 0x40;
    array[8] = (array[8] & 0x3f) | 0x80;
    
    const hex = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    return [
      hex.slice(0, 8),
      hex.slice(8, 12),
      hex.slice(12, 16),
      hex.slice(16, 20),
      hex.slice(20, 32)
    ].join('-');
  }, []);

  // Generate random bytes (hex)
  const generateRandomBytes = useCallback((length: number): string => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }, []);

  // Generate random integer
  const generateRandomInt = useCallback((min: number, max: number): number => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return min + (array[0] % (max - min + 1));
  }, []);

  // Generate random float
  const generateRandomFloat = useCallback((min: number, max: number, decimals: number = 2): number => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const random = array[0] / 0xffffffff;
    const value = min + random * (max - min);
    return parseFloat(value.toFixed(decimals));
  }, []);

  const handleGenerate = () => {
    try {
      const results: string[] = [];
      
      switch (activeTab) {
        case 'strings':
          for (let i = 0; i < count; i++) {
            results.push(generateRandomString(options, options.length));
          }
          break;
          
        case 'uuids':
          for (let i = 0; i < count; i++) {
            results.push(generateUUID());
          }
          break;
          
        case 'bytes':
          for (let i = 0; i < count; i++) {
            results.push(generateRandomBytes(options.length));
          }
          break;
          
        case 'numbers':
          for (let i = 0; i < count; i++) {
            const min = 1;
            const max = 1000000;
            results.push(generateRandomInt(min, max).toString());
          }
          break;
          
        case 'floats':
          for (let i = 0; i < count; i++) {
            const min = 0;
            const max = 100;
            results.push(generateRandomFloat(min, max, 2).toString());
          }
          break;
          
        default:
          throw new Error('Invalid generation type');
      }
      
      setOutput(results.join('\n'));
      toast({
        title: 'Generation successful',
        description: `${count} ${activeTab} generated successfully`,
      });
    } catch (error) {
      toast({
        title: 'Generation failed',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: 'Copied to clipboard',
      description: 'Generated data has been copied to clipboard',
    });
  };

  const handleClear = () => {
    setOutput('');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `random-${activeTab}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Download started',
      description: 'Random data has been downloaded',
    });
  };

  const toolTrust = {
    badges: [
      { label: 'CSPRNG', variant: 'csprng' as const },
      { label: 'Local', variant: 'local' as const },
      { label: 'Dev/Test', variant: 'dev-test' as const },
    ],
    callouts: [
      {
        variant: 'warning' as const,
        content: (
          <>
            <strong>Use responsibly:</strong> Generated values suit testing, placeholders, and development workflows.
            For production secrets, use your infrastructure&apos;s approved secret-management process.
          </>
        ),
      },
    ],
    howItWorks:
      'Random strings, UUIDs, bytes, and numbers are generated locally using the Web Crypto API for cryptographically secure randomness.',
    limitations:
      'Do not treat generated tokens as a replacement for production secret management. Avoid using random test data as real user data or live credentials.',
    privacyNote: 'Generated values are not sent to SecureTools servers.',
  };

  return (
    <ToolLayout
      title="Random Data Generator"
      description="Generate token-like random strings for development, testing, examples, and placeholders. CSPRNG-backed random data in your browser."
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Generation Options */}
        <Card className="tool-workspace">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shuffle className="h-5 w-5" />
              Generation Options
            </CardTitle>
            <CardDescription>
              Configure the parameters for random data generation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="strings">Strings</TabsTrigger>
                <TabsTrigger value="uuids">UUIDs</TabsTrigger>
                <TabsTrigger value="bytes">Bytes</TabsTrigger>
                <TabsTrigger value="numbers">Numbers</TabsTrigger>
                <TabsTrigger value="floats">Floats</TabsTrigger>
              </TabsList>
              
              <TabsContent value="strings" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Length: {options.length}</Label>
                    <Slider
                      value={[options.length]}
                      onValueChange={([value]) => setOptions(prev => ({ ...prev, length: value }))}
                      min={1}
                      max={1000}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="uppercase"
                        checked={options.includeUppercase}
                        onCheckedChange={(checked) => setOptions(prev => ({ ...prev, includeUppercase: checked }))}
                      />
                      <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="lowercase"
                        checked={options.includeLowercase}
                        onCheckedChange={(checked) => setOptions(prev => ({ ...prev, includeLowercase: checked }))}
                      />
                      <Label htmlFor="lowercase">Lowercase (a-z)</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="numbers"
                        checked={options.includeNumbers}
                        onCheckedChange={(checked) => setOptions(prev => ({ ...prev, includeNumbers: checked }))}
                      />
                      <Label htmlFor="numbers">Numbers (0-9)</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="symbols"
                        checked={options.includeSymbols}
                        onCheckedChange={(checked) => setOptions(prev => ({ ...prev, includeSymbols: checked }))}
                      />
                      <Label htmlFor="symbols">Symbols (!@#$...)</Label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="excludeSimilar"
                        checked={options.excludeSimilar}
                        onCheckedChange={(checked) => setOptions(prev => ({ ...prev, excludeSimilar: checked }))}
                      />
                      <Label htmlFor="excludeSimilar">Exclude similar chars (il1Lo0O)</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="excludeAmbiguous"
                        checked={options.excludeAmbiguous}
                        onCheckedChange={(checked) => setOptions(prev => ({ ...prev, excludeAmbiguous: checked }))}
                      />
                      <Label htmlFor="excludeAmbiguous">Exclude ambiguous chars</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="customChars">Custom Characters (optional)</Label>
                    <Input
                      id="customChars"
                      value={options.customChars}
                      onChange={(e) => setOptions(prev => ({ ...prev, customChars: e.target.value }))}
                      placeholder="Enter custom characters to use instead of presets"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="uuids" className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    UUIDs are generated using cryptographically secure random values and follow the UUID v4 standard.
                  </AlertDescription>
                </Alert>
              </TabsContent>
              
              <TabsContent value="bytes" className="space-y-4">
                <div className="space-y-2">
                  <Label>Byte Length: {options.length}</Label>
                  <Slider
                    value={[options.length]}
                    onValueChange={([value]) => setOptions(prev => ({ ...prev, length: value }))}
                    min={1}
                    max={1000}
                    step={1}
                    className="w-full"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="numbers" className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Random integers are generated between 1 and 1,000,000 using cryptographically secure random values.
                  </AlertDescription>
                </Alert>
              </TabsContent>
              
              <TabsContent value="floats" className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Random floats are generated between 0 and 100 with 2 decimal places using cryptographically secure random values.
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="count">Count</Label>
                <Input
                  id="count"
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                  min={1}
                  max={1000}
                  className="w-20"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Generated Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              value={output}
              onValueChange={setOutput}
              placeholder="Generated random data will appear here..."
              className="min-h-[200px] font-mono text-sm"
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleGenerate}
            className="flex items-center gap-2"
          >
            <Shuffle className="h-4 w-4" />
            Generate
          </Button>
          
          <Button
            onClick={handleCopy}
            disabled={!output.trim()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          
          <Button
            onClick={handleDownload}
            disabled={!output.trim()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
          
          <Button
            onClick={handleClear}
            variant="outline"
            className="flex items-center gap-2"
          >
            Clear
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
                      <p className="font-medium text-foreground">CSPRNG-backed output</p>
                      <p>Generate random strings, UUIDs, and bytes using Web Crypto API randomness.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" aria-hidden />
                    <div>
                      <p className="font-medium text-foreground">Multiple data types</p>
                      <p>Strings, UUIDs, bytes, integers, and floats for development workflows.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" aria-hidden />
                    <div>
                      <p className="font-medium text-foreground">Token-like strings</p>
                      <p>Generate token-like random strings for development, testing, examples, and placeholders.</p>
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
                  <li>Web Crypto API integration</li>
                  <li>Random strings generation</li>
                  <li>UUID v4 generation</li>
                  <li>Random bytes (hex format)</li>
                  <li>Random integers and floats</li>
                  <li>Custom character filtering</li>
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
                    <h4 className="font-semibold text-foreground mb-2">Cryptographic security</h4>
                    <ul className="space-y-1 list-disc pl-5">
                      <li><strong>Web Crypto API:</strong> Cryptographically secure randomness</li>
                      <li><strong>CSPRNG:</strong> Browser-backed secure random generation</li>
                      <li><strong>Unpredictable output:</strong> Suitable for dev/test samples when used responsibly</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Data types generated</h4>
                    <ul className="space-y-1 list-disc pl-5">
                      <li><strong>UUIDs:</strong> Universally unique identifiers (v4)</li>
                      <li><strong>Random strings:</strong> Customizable length and character sets</li>
                      <li><strong>Token-like strings:</strong> For examples and placeholders — not production secret management</li>
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Web Crypto API</Badge>
                    <Badge variant="secondary">CSPRNG</Badge>
                    <Badge variant="secondary">UUID v4</Badge>
                    <Badge variant="secondary">Dev/Test</Badge>
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
