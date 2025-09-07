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
import { useToast } from '@/hooks/use-toast';
import { useSEO } from '@/hooks/useSEO';

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
    canonical: 'https://www.securetools.dev/random-data-generator'
  });

  // Character sets
  const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    similar: 'il1Lo0O', // Characters that look similar
    ambiguous: '{}[]()/\\\'"`~,;.<>' // Ambiguous characters
  };

  // Generate random string
  const generateRandomString = useCallback((options: GenerationOptions, length: number): string => {
    let charset = '';
    
    if (options.customChars) {
      charset = options.customChars;
    } else {
      if (options.includeUppercase) charset += charSets.uppercase;
      if (options.includeLowercase) charset += charSets.lowercase;
      if (options.includeNumbers) charset += charSets.numbers;
      if (options.includeSymbols) charset += charSets.symbols;
      
      if (options.excludeSimilar) {
        charset = charset.split('').filter(char => !charSets.similar.includes(char)).join('');
      }
      
      if (options.excludeAmbiguous) {
        charset = charset.split('').filter(char => !charSets.ambiguous.includes(char)).join('');
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
      let results: string[] = [];
      
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

  return (
    <ToolLayout
      title="Random Data Generator"
      description="Generate secure random strings, API keys, tokens, UUIDs, and cryptographic data. Cryptographically secure random data generator that runs entirely in your browser."
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Generation Options */}
        <Card>
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

        {/* Why Use + Key Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Why Use Random Data Generator?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Cryptographically Secure Data</p>
                  <p className="text-sm text-muted-foreground">Generate truly random strings, UUIDs, and cryptographic data using Web Crypto API for maximum security.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Multiple Data Types</p>
                  <p className="text-sm text-muted-foreground">Generate random strings, UUIDs, bytes, integers, and floats for various development and security needs.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">API Keys & Tokens</p>
                  <p className="text-sm text-muted-foreground">Create secure API keys, authentication tokens, and session IDs for your applications and services.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Customizable Options</p>
                  <p className="text-sm text-muted-foreground">Control character sets, length, and filtering options to generate data that meets your specific requirements.</p>
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
                <span className="text-sm">Web Crypto API integration</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Random strings generation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">UUID v4 generation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Random bytes (hex format)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Random integers and floats</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Custom character filtering</span>
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
                <h4 className="font-semibold mb-3">Cryptographic Security</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Web Crypto API:</strong> Cryptographically secure randomness</li>
                  <li>• <strong>CSPRNG:</strong> Cryptographically secure pseudo-random number generator</li>
                  <li>• <strong>Hardware entropy:</strong> Uses system entropy sources</li>
                  <li>• <strong>Unpredictable output:</strong> Suitable for security applications</li>
                  <li>• <strong>No patterns:</strong> Truly random data generation</li>
                  <li>• <strong>Military-grade:</strong> Meets security standards</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Data Types Generated</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>UUIDs:</strong> Universally unique identifiers (v4)</li>
                  <li>• <strong>Random strings:</strong> Customizable length and character sets</li>
                  <li>• <strong>Random bytes:</strong> Hex-encoded binary data</li>
                  <li>• <strong>Random numbers:</strong> Integers and floating-point values</li>
                  <li>• <strong>API keys:</strong> Secure token generation</li>
                  <li>• <strong>Passwords:</strong> High-entropy random passwords</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">Web Crypto API</Badge>
              <Badge variant="secondary">CSPRNG</Badge>
              <Badge variant="secondary">UUID v4</Badge>
              <Badge variant="secondary">Privacy Focused</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
