import { useState, useCallback, useEffect } from 'react';
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
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Lock,
  AlertCircle,
  Clock,
  Zap,
  Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSEO } from '@/hooks/useSEO';
import { trackPasswordAnalysis, trackConversion } from '@/lib/analytics';

interface PasswordAnalysis {
  score: number;
  strength: 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong' | 'Very Strong';
  entropy: number;
  crackTime: string;
  issues: string[];
  suggestions: string[];
  characterCount: {
    length: number;
    uppercase: number;
    lowercase: number;
    numbers: number;
    symbols: number;
  };
  patterns: {
    hasSequential: boolean;
    hasRepeated: boolean;
    hasCommonPattern: boolean;
    hasKeyboardPattern: boolean;
  };
}

export default function PasswordStrengthAnalyzer() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState<PasswordAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: 'Password Strength Analyzer - Security Analysis Tool | SecureTools',
    description: 'Analyze password strength, detect common patterns, and provide security recommendations. Comprehensive password security analysis tool that runs entirely in your browser.',
    keywords: 'password strength analyzer, password security, password checker, entropy analysis, crack time, password recommendations, security tools',
    canonical: 'https://www.securetools.dev/password-strength-analyzer'
  });

  // Common weak passwords and patterns
  const commonPasswords = [
    'password', '123456', '123456789', 'qwerty', 'abc123', 'password123',
    'admin', 'letmein', 'welcome', 'monkey', '1234567890', 'password1',
    'qwerty123', 'dragon', 'master', 'hello', 'freedom', 'whatever'
  ];

  const keyboardPatterns = [
    'qwerty', 'asdfgh', 'zxcvbn', '123456', '654321',
    'qwertyuiop', 'asdfghjkl', 'zxcvbnm'
  ];

  // Calculate password entropy
  const calculateEntropy = useCallback((password: string): number => {
    let charsetSize = 0;
    
    if (/[a-z]/.test(password)) charsetSize += 26;
    if (/[A-Z]/.test(password)) charsetSize += 26;
    if (/[0-9]/.test(password)) charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32; // Common symbols
    
    return Math.log2(Math.pow(charsetSize, password.length));
  }, []);

  // Estimate crack time
  const estimateCrackTime = useCallback((entropy: number): string => {
    const guessesPerSecond = 1000000000; // 1 billion guesses per second
    const seconds = Math.pow(2, entropy) / guessesPerSecond;
    
    if (seconds < 1) return 'Less than a second';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
    return `${Math.round(seconds / 3153600000)} centuries`;
  }, []);

  // Check for common patterns
  const checkPatterns = useCallback((password: string) => {
    const lowerPassword = password.toLowerCase();
    
    return {
      hasSequential: /(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/.test(lowerPassword),
      hasRepeated: /(.)\1{2,}/.test(password),
      hasCommonPattern: commonPasswords.some(common => lowerPassword.includes(common)),
      hasKeyboardPattern: keyboardPatterns.some(pattern => lowerPassword.includes(pattern))
    };
  }, []);

  // Analyze password strength
  const analyzePassword = useCallback((password: string): PasswordAnalysis => {
    const length = password.length;
    const uppercase = (password.match(/[A-Z]/g) || []).length;
    const lowercase = (password.match(/[a-z]/g) || []).length;
    const numbers = (password.match(/[0-9]/g) || []).length;
    const symbols = (password.match(/[^a-zA-Z0-9]/g) || []).length;
    
    const entropy = calculateEntropy(password);
    const crackTime = estimateCrackTime(entropy);
    const patterns = checkPatterns(password);
    
    // Calculate score (0-100)
    let score = 0;
    const issues: string[] = [];
    const suggestions: string[] = [];
    
    // Length scoring
    if (length < 8) {
      score += 10;
      issues.push('Password is too short (less than 8 characters)');
      suggestions.push('Use at least 8 characters');
    } else if (length < 12) {
      score += 20;
      suggestions.push('Consider using 12+ characters for better security');
    } else if (length < 16) {
      score += 30;
    } else {
      score += 40;
    }
    
    // Character variety scoring
    if (uppercase > 0) score += 10;
    else suggestions.push('Add uppercase letters (A-Z)');
    
    if (lowercase > 0) score += 10;
    else suggestions.push('Add lowercase letters (a-z)');
    
    if (numbers > 0) score += 10;
    else suggestions.push('Add numbers (0-9)');
    
    if (symbols > 0) score += 10;
    else suggestions.push('Add symbols (!@#$%^&*)');
    
    // Pattern penalties
    if (patterns.hasSequential) {
      score -= 15;
      issues.push('Contains sequential characters');
      suggestions.push('Avoid sequential patterns like 123 or abc');
    }
    
    if (patterns.hasRepeated) {
      score -= 10;
      issues.push('Contains repeated characters');
      suggestions.push('Avoid repeated characters like aaa or 111');
    }
    
    if (patterns.hasCommonPattern) {
      score -= 20;
      issues.push('Contains common password patterns');
      suggestions.push('Avoid common words and patterns');
    }
    
    if (patterns.hasKeyboardPattern) {
      score -= 15;
      issues.push('Contains keyboard patterns');
      suggestions.push('Avoid keyboard patterns like qwerty');
    }
    
    // Entropy bonus
    if (entropy > 50) score += 10;
    else if (entropy < 30) {
      score -= 10;
      issues.push('Low entropy (predictable)');
      suggestions.push('Use more random character combinations');
    }
    
    // Ensure score is between 0 and 100
    score = Math.max(0, Math.min(100, score));
    
    // Determine strength level
    let strength: PasswordAnalysis['strength'];
    if (score < 20) strength = 'Very Weak';
    else if (score < 40) strength = 'Weak';
    else if (score < 60) strength = 'Fair';
    else if (score < 80) strength = 'Good';
    else if (score < 95) strength = 'Strong';
    else strength = 'Very Strong';
    
    return {
      score,
      strength,
      entropy,
      crackTime,
      issues,
      suggestions,
      characterCount: {
        length,
        uppercase,
        lowercase,
        numbers,
        symbols
      },
      patterns
    };
  }, [calculateEntropy, estimateCrackTime, checkPatterns]);

  // Analyze password when it changes
  useEffect(() => {
    if (password.trim()) {
      setIsAnalyzing(true);
      // Simulate analysis delay for better UX
      const timer = setTimeout(() => {
        const startTime = Date.now();
        const analysisResult = analyzePassword(password);
        setAnalysis(analysisResult);
        setIsAnalyzing(false);
        
        // Enhanced analytics tracking
        const risks = [];
        if (analysisResult.hasCommonPassword) risks.push('common_password');
        if (analysisResult.hasKeyboardPattern) risks.push('keyboard_pattern');
        if (analysisResult.score < 50) risks.push('low_strength');
        
        const recommendations = [];
        if (password.length < 8) recommendations.push('increase_length');
        if (analysisResult.uppercase === 0) recommendations.push('add_uppercase');
        if (analysisResult.lowercase === 0) recommendations.push('add_lowercase');
        if (analysisResult.numbers === 0) recommendations.push('add_numbers');
        if (analysisResult.symbols === 0) recommendations.push('add_symbols');
        
        trackPasswordAnalysis({
          passwordLength: password.length,
          strengthScore: analysisResult.score,
          entropy: analysisResult.entropy,
          risks,
          recommendations,
          analysisTime: Date.now() - startTime
        });
        
        trackConversion('password_analyzed', 'Password Strength Analyzer', analysisResult.score);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setAnalysis(null);
    }
  }, [password, analyzePassword]);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: 'Password copied',
      description: 'Password has been copied to clipboard',
    });
  };

  const handleClear = () => {
    setPassword('');
    setAnalysis(null);
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'Very Weak': return 'text-red-500';
      case 'Weak': return 'text-red-400';
      case 'Fair': return 'text-yellow-500';
      case 'Good': return 'text-blue-500';
      case 'Strong': return 'text-green-500';
      case 'Very Strong': return 'text-green-600';
      default: return 'text-gray-500';
    }
  };

  const getStrengthBadgeColor = (strength: string) => {
    switch (strength) {
      case 'Very Weak': return 'bg-red-500';
      case 'Weak': return 'bg-red-400';
      case 'Fair': return 'bg-yellow-500';
      case 'Good': return 'bg-blue-500';
      case 'Strong': return 'bg-green-500';
      case 'Very Strong': return 'bg-green-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <ToolLayout
      title="Password Strength Analyzer"
      description="Analyze password strength, detect common patterns, and provide security recommendations. Comprehensive password security analysis tool that runs entirely in your browser."
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Password Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Password Analysis
            </CardTitle>
            <CardDescription>
              Enter a password to analyze its strength and security characteristics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex gap-2">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password to analyze..."
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyPassword}
                    disabled={!password.trim()}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Overall Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Password Strength
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold">{analysis.score}/100</span>
                      <Badge className={getStrengthBadgeColor(analysis.strength)}>
                        {analysis.strength}
                      </Badge>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Crack time: {analysis.crackTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4" />
                        <span>Entropy: {analysis.entropy.toFixed(1)} bits</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={analysis.score} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="details" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="issues">Issues</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              </TabsList>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Character Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{analysis.characterCount.length}</div>
                        <div className="text-sm text-muted-foreground">Length</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{analysis.characterCount.uppercase}</div>
                        <div className="text-sm text-muted-foreground">Uppercase</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{analysis.characterCount.lowercase}</div>
                        <div className="text-sm text-muted-foreground">Lowercase</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{analysis.characterCount.numbers}</div>
                        <div className="text-sm text-muted-foreground">Numbers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{analysis.characterCount.symbols}</div>
                        <div className="text-sm text-muted-foreground">Symbols</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pattern Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        {analysis.patterns.hasSequential ? (
                          <XCircle className="h-4 w-4 text-red-500" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        <span>Sequential characters</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {analysis.patterns.hasRepeated ? (
                          <XCircle className="h-4 w-4 text-red-500" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        <span>Repeated characters</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {analysis.patterns.hasCommonPattern ? (
                          <XCircle className="h-4 w-4 text-red-500" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        <span>Common patterns</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {analysis.patterns.hasKeyboardPattern ? (
                          <XCircle className="h-4 w-4 text-red-500" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        <span>Keyboard patterns</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Issues Tab */}
              <TabsContent value="issues" className="space-y-6">
                {analysis.issues.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        Security Issues
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.issues.map((issue, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Issues Found</h3>
                      <p className="text-muted-foreground">
                        Your password doesn't have any obvious security issues.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Suggestions Tab */}
              <TabsContent value="suggestions" className="space-y-6">
                {analysis.suggestions.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Excellent Password</h3>
                      <p className="text-muted-foreground">
                        Your password follows security best practices.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Why Use + Key Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Why Use Password Strength Analyzer?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Comprehensive Security Analysis</p>
                  <p className="text-sm text-muted-foreground">Analyze password strength with entropy calculations, crack time estimates, and pattern detection for complete security assessment.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Real-time Feedback</p>
                  <p className="text-sm text-muted-foreground">Get instant analysis and recommendations as you type, helping you create stronger passwords in real-time.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Pattern Detection</p>
                  <p className="text-sm text-muted-foreground">Identify common patterns, sequential characters, and weak password structures that could be exploited by attackers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Educational Insights</p>
                  <p className="text-sm text-muted-foreground">Learn about password security best practices and understand why certain passwords are stronger than others.</p>
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
                <span className="text-sm">Entropy calculation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Crack time estimation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Pattern detection</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Character analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Security recommendations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Real-time analysis</span>
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
                <h4 className="font-semibold mb-3">Entropy Analysis</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Character set analysis:</strong> Calculates possible character combinations</li>
                  <li>• <strong>Entropy calculation:</strong> Bits of entropy for strength assessment</li>
                  <li>• <strong>Crack time estimation:</strong> Time to brute force the password</li>
                  <li>• <strong>Pattern detection:</strong> Identifies common weak patterns</li>
                  <li>• <strong>Dictionary checking:</strong> Warns about common passwords</li>
                  <li>• <strong>Length analysis:</strong> Minimum recommended lengths</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Security Checks</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Character variety:</strong> Uppercase, lowercase, numbers, symbols</li>
                  <li>• <strong>Pattern analysis:</strong> Sequential, repeated, keyboard patterns</li>
                  <li>• <strong>Common password detection:</strong> Known weak passwords</li>
                  <li>• <strong>Personal info check:</strong> Warns about personal data</li>
                  <li>• <strong>Length requirements:</strong> Minimum 8-12 characters</li>
                  <li>• <strong>Privacy-focused:</strong> All analysis in browser</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">Entropy Analysis</Badge>
              <Badge variant="secondary">Pattern Detection</Badge>
              <Badge variant="secondary">Crack Time</Badge>
              <Badge variant="secondary">Privacy Focused</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
