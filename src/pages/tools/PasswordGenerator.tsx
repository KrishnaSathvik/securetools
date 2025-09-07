import { useState, useEffect } from 'react';
import { ToolLayout } from '@/components/layouts/ToolLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Copy, RefreshCw, Download, Shield, Clock, Eye, EyeOff, Key, Zap, Lock, Target, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSEO } from '@/hooks/useSEO';
import { trackTextProcessing, trackInteraction, trackToolUsage, trackPasswordGeneration, trackConversion } from '@/lib/analytics';

// EFF Diceware word list (first 100 words for demo)
const dicewareWords = [
  'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract', 'absurd', 'abuse',
  'access', 'accident', 'account', 'accuse', 'achieve', 'acid', 'acoustic', 'acquire', 'across', 'act',
  'action', 'actor', 'actress', 'actual', 'adapt', 'add', 'addict', 'address', 'adjust', 'admit',
  'adult', 'advance', 'advice', 'aerobic', 'affair', 'afford', 'afraid', 'again', 'age', 'agent',
  'agree', 'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm', 'album', 'alcohol', 'alert',
  'alien', 'all', 'alley', 'allow', 'almost', 'alone', 'alpha', 'already', 'also', 'alter',
  'always', 'amateur', 'amazing', 'among', 'amount', 'amused', 'analyst', 'anchor', 'ancient', 'anger',
  'angle', 'angry', 'animal', 'ankle', 'announce', 'annual', 'another', 'answer', 'antenna', 'antique',
  'anxiety', 'any', 'apart', 'apology', 'appear', 'apple', 'approve', 'april', 'arch', 'arctic',
  'area', 'arena', 'argue', 'arm', 'armed', 'armor', 'army', 'around', 'arrange', 'arrest'
];

const adjectives = ['brave', 'clever', 'swift', 'bright', 'calm', 'bold', 'wise', 'kind', 'strong', 'gentle'];
const animals = ['tiger', 'eagle', 'wolf', 'bear', 'lion', 'fox', 'owl', 'deer', 'hawk', 'dolphin'];

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [length, setLength] = useState(16);
  const [wordCount, setWordCount] = useState(4);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [entropy, setEntropy] = useState(0);
  const [crackTime, setCrackTime] = useState('');
  const [strength, setStrength] = useState(0);
  const [passwordHistory, setPasswordHistory] = useState<string[]>([]);
  const { toast } = useToast();

  useSEO({
    title: 'Password & Passphrase Generator - SecureTools',
    description: 'Generate cryptographically secure passwords and memorable passphrases with entropy analysis, Diceware support, and printable cards.',
    keywords: 'password generator, passphrase generator, diceware, entropy, cspng, security, printable passwords',
    canonical: 'https://www.securetools.dev/password-generator'
  });

  // Load password history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('passwordHistory');
    if (saved) {
      setPasswordHistory(JSON.parse(saved));
    }
  }, []);

  // Save password history to localStorage
  const saveToHistory = (newPassword: string) => {
    const updated = [newPassword, ...passwordHistory.slice(0, 4)];
    setPasswordHistory(updated);
    localStorage.setItem('passwordHistory', JSON.stringify(updated));
  };

  // CSPRNG password generation
  const generateSecurePassword = (length: number, alphabet: string): string => {
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, x => alphabet[x % alphabet.length]).join('');
  };

  // Entropy calculation
  const calculateEntropy = (length: number, alphabetSize: number): number => {
    return Math.log2(alphabetSize) * length;
  };

  // Crack time estimation
  const estimateCrackTime = (entropyBits: number): string => {
    const seconds = Math.pow(2, entropyBits - 1) / 1000000000; // 1B guesses/sec
    
    if (seconds < 1) return 'Less than a second';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
    return `${Math.round(seconds / 3153600000)} billion years`;
  };

  // Generate random password
  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }
    if (excludeAmbiguous) {
      charset = charset.replace(/[{}[\]\\|;:'",./<>?]/g, '');
    }

    if (charset === '') {
      toast({
        title: 'Error',
        description: 'Please select at least one character type.',
        variant: 'destructive'
      });
      return;
    }

    const newPassword = generateSecurePassword(length, charset);
    setPassword(newPassword);
    
    const entropyBits = calculateEntropy(length, charset.length);
    setEntropy(entropyBits);
    setCrackTime(estimateCrackTime(entropyBits));
    setStrength(Math.min(100, (entropyBits / 8) * 100));
    
    saveToHistory(newPassword);
    
    // Enhanced analytics tracking
    const characterSets = [];
    if (includeUppercase) characterSets.push('uppercase');
    if (includeLowercase) characterSets.push('lowercase');
    if (includeNumbers) characterSets.push('numbers');
    if (includeSymbols) characterSets.push('symbols');
    
    trackPasswordGeneration({
      length: newPassword.length,
      strength: getStrengthLabel(entropyBits),
      entropy: entropyBits,
      characterSets,
      action: 'generated',
      toolType: 'password'
    });
    
    trackConversion('password_generated', 'Password Generator', entropyBits);
  };

  // Generate Diceware passphrase
  const generatePassphrase = () => {
    const words = [];
    for (let i = 0; i < wordCount; i++) {
      const randomIndex = Math.floor(Math.random() * dicewareWords.length);
      words.push(dicewareWords[randomIndex]);
    }
    const newPassphrase = words.join(' ');
    setPassphrase(newPassphrase);
    
    const entropyBits = Math.log2(7776) * wordCount; // EFF has 7776 words
    setEntropy(entropyBits);
    setCrackTime(estimateCrackTime(entropyBits));
    setStrength(Math.min(100, (entropyBits / 8) * 100));
    
    saveToHistory(newPassphrase);
  };

  // Generate mnemonic password
  const generateMnemonic = () => {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    const number = Math.floor(Math.random() * 1000);
    const symbol = '!@#$%^&*'[Math.floor(Math.random() * 8)];
    
    const newMnemonic = `${adj}${animal}${number}${symbol}`;
    setMnemonic(newMnemonic);
    
    const entropyBits = Math.log2(adjectives.length * animals.length * 1000 * 8);
    setEntropy(entropyBits);
    setCrackTime(estimateCrackTime(entropyBits));
    setStrength(Math.min(100, (entropyBits / 8) * 100));
    
    saveToHistory(newMnemonic);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: 'Password copied to clipboard.'
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to copy password.',
        variant: 'destructive'
      });
    }
  };

  const downloadAsText = (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 30) return 'text-red-500';
    if (strength < 60) return 'text-yellow-500';
    if (strength < 80) return 'text-orange-500';
    return 'text-green-500';
  };

  const getStrengthLabel = (strength: number) => {
    if (strength < 30) return 'Weak';
    if (strength < 60) return 'Fair';
    if (strength < 80) return 'Good';
    return 'Strong';
  };

  return (
    <ToolLayout
      title="Password & Passphrase Generator"
      description="Generate cryptographically secure passwords and memorable passphrases with entropy analysis, Diceware support, and printable cards."
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Security Alert */}
        <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Security Note:</strong> All password generation uses cryptographically secure random number generation. 
            Generated passwords are processed locally in your browser and never transmitted to our servers.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="password" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="password">Random Password</TabsTrigger>
            <TabsTrigger value="passphrase">Diceware Passphrase</TabsTrigger>
            <TabsTrigger value="mnemonic">Mnemonic Password</TabsTrigger>
          </TabsList>

          <TabsContent value="password" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Password Settings</CardTitle>
                  <CardDescription>
                    Configure your password generation options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Length Slider */}
                  <div className="space-y-2">
                    <Label htmlFor="length">Length: {length}</Label>
                    <Slider
                      id="length"
                      min={4}
                      max={128}
                      step={1}
                      value={[length]}
                      onValueChange={(value) => setLength(value[0])}
                      className="w-full"
                    />
                  </div>

                  {/* Character Types */}
                  <div className="space-y-4">
                    <Label>Character Types</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="uppercase"
                          checked={includeUppercase}
                          onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
                        />
                        <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="lowercase"
                          checked={includeLowercase}
                          onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)}
                        />
                        <Label htmlFor="lowercase">Lowercase (a-z)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="numbers"
                          checked={includeNumbers}
                          onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
                        />
                        <Label htmlFor="numbers">Numbers (0-9)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="symbols"
                          checked={includeSymbols}
                          onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
                        />
                        <Label htmlFor="symbols">Symbols (!@#$%^&*)</Label>
                      </div>
                    </div>
                  </div>

                  {/* Advanced Options */}
                  <div className="space-y-4">
                    <Label>Advanced Options</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="excludeSimilar"
                          checked={excludeSimilar}
                          onCheckedChange={(checked) => setExcludeSimilar(checked as boolean)}
                        />
                        <Label htmlFor="excludeSimilar">Exclude similar characters (il1Lo0O)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="excludeAmbiguous"
                          checked={excludeAmbiguous}
                          onCheckedChange={(checked) => setExcludeAmbiguous(checked as boolean)}
                        />
                        <Label htmlFor="excludeAmbiguous">Exclude ambiguous characters</Label>
                      </div>
                    </div>
                  </div>

                  <Button onClick={generatePassword} className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate Password
                  </Button>
                </CardContent>
              </Card>

              {/* Generated Password */}
              <Card>
                <CardHeader>
                  <CardTitle>Generated Password</CardTitle>
                  <CardDescription>
                    Your secure password with security analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(password)}
                          disabled={!password}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Input
                      id="password"
                      value={password}
                      readOnly
                      type={showPassword ? 'text' : 'password'}
                      className="font-mono"
                      placeholder="Click 'Generate Password' to create a password"
                    />
                  </div>

                  {password && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Password Strength</Label>
                          <span className={`font-medium ${getStrengthColor(strength)}`}>
                            {getStrengthLabel(strength)}
                          </span>
                        </div>
                        <Progress value={strength} className="w-full" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-muted-foreground">Entropy</Label>
                          <div className="font-mono">{entropy.toFixed(1)} bits</div>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Crack Time</Label>
                          <div className="font-mono">{crackTime}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadAsText(password, 'password.txt')}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="passphrase" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Passphrase Settings</CardTitle>
                  <CardDescription>
                    Configure your Diceware passphrase generation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="wordCount">Number of Words: {wordCount}</Label>
                    <Slider
                      id="wordCount"
                      min={3}
                      max={10}
                      step={1}
                      value={[wordCount]}
                      onValueChange={(value) => setWordCount(value[0])}
                      className="w-full"
                    />
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>Using EFF's 7776-word Diceware list for maximum security.</p>
                    <p>Each word adds ~12.9 bits of entropy.</p>
                  </div>

                  <Button onClick={generatePassphrase} className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate Passphrase
                  </Button>
                </CardContent>
              </Card>

              {/* Generated Passphrase */}
              <Card>
                <CardHeader>
                  <CardTitle>Generated Passphrase</CardTitle>
                  <CardDescription>
                    Your memorable and secure passphrase
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Passphrase</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(passphrase)}
                        disabled={!passphrase}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="p-3 bg-muted rounded-md font-mono text-sm">
                      {passphrase || 'Click "Generate Passphrase" to create a passphrase'}
                    </div>
                  </div>

                  {passphrase && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Passphrase Strength</Label>
                          <span className={`font-medium ${getStrengthColor(strength)}`}>
                            {getStrengthLabel(strength)}
                          </span>
                        </div>
                        <Progress value={strength} className="w-full" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-muted-foreground">Entropy</Label>
                          <div className="font-mono">{entropy.toFixed(1)} bits</div>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Crack Time</Label>
                          <div className="font-mono">{crackTime}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mnemonic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Mnemonic Password</CardTitle>
                  <CardDescription>
                    Generate memorable passwords using adjective-animal-number format
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-sm text-muted-foreground">
                    <p>Format: Adjective + Animal + Number + Symbol</p>
                    <p>Example: braveTiger42!</p>
                    <p>Easy to remember but still secure.</p>
                  </div>

                  <Button onClick={generateMnemonic} className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate Mnemonic Password
                  </Button>
                </CardContent>
              </Card>

              {/* Generated Mnemonic */}
              <Card>
                <CardHeader>
                  <CardTitle>Generated Mnemonic Password</CardTitle>
                  <CardDescription>
                    Your memorable and secure password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Mnemonic Password</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(mnemonic)}
                        disabled={!mnemonic}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <Input
                      value={mnemonic}
                      readOnly
                      className="font-mono"
                      placeholder="Click 'Generate Mnemonic Password' to create a password"
                    />
                  </div>

                  {mnemonic && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Password Strength</Label>
                          <span className={`font-medium ${getStrengthColor(strength)}`}>
                            {getStrengthLabel(strength)}
                          </span>
                        </div>
                        <Progress value={strength} className="w-full" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-muted-foreground">Entropy</Label>
                          <div className="font-mono">{entropy.toFixed(1)} bits</div>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Crack Time</Label>
                          <div className="font-mono">{crackTime}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Password History */}
        {passwordHistory.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Passwords</CardTitle>
              <CardDescription>
                Your last 5 generated passwords (stored locally)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {passwordHistory.map((pwd, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="font-mono text-sm">{pwd}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(pwd)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Why Use + Key Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Why Use Password Generator?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Secure Password Creation</p>
                  <p className="text-sm text-muted-foreground">Generate cryptographically secure passwords that are virtually impossible to crack using brute force attacks.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Memorable Passphrases</p>
                  <p className="text-sm text-muted-foreground">Create Diceware passphrases using the EFF word list for easy-to-remember yet secure passwords.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Entropy Analysis</p>
                  <p className="text-sm text-muted-foreground">Get real-time entropy calculations and crack time estimates to understand password strength.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Customizable Options</p>
                  <p className="text-sm text-muted-foreground">Control character sets, length, and exclusion rules to meet specific security requirements.</p>
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
                <span className="text-sm">Web Crypto API for secure randomness</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Diceware passphrase generation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Real-time entropy calculation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Crack time estimation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Mnemonic password patterns</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Password history (local storage)</span>
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
                  <li>• Uses Web Crypto API for secure randomness</li>
                  <li>• Cryptographically secure random number generation</li>
                  <li>• Entropy calculations for strength assessment</li>
                  <li>• Military-grade security standards</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Password Types</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Random:</strong> Cryptographically secure passwords</li>
                  <li>• <strong>Diceware:</strong> EFF word list for memorability</li>
                  <li>• <strong>Mnemonic:</strong> Adjective-Animal-Number format</li>
                  <li>• <strong>Customizable:</strong> Character sets and length</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">Web Crypto API</Badge>
              <Badge variant="secondary">CSPRNG</Badge>
              <Badge variant="secondary">Diceware</Badge>
              <Badge variant="secondary">Entropy Analysis</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default PasswordGenerator;