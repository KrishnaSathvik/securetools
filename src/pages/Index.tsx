import { useState } from 'react';
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, Zap, Shield, Clock } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const tools = [
  {
    name: 'Password & Passphrase Generator',
    path: '/password-generator',
    description: 'Generate cryptographically secure passwords and memorable passphrases with entropy analysis',
    keywords: ['password', 'passphrase', 'diceware', 'entropy', 'security', 'cspng']
  },
  {
    name: 'Text Encryptor/Decryptor',
    path: '/text-encryptor',
    description: 'Encrypt and decrypt text with AES-256 encryption and password-based security',
    keywords: ['encryption', 'decryption', 'aes', 'cipher', 'security', 'cryptography']
  },
  {
    name: 'Security Headers Checker',
    path: '/security-headers-checker',
    description: 'Analyze website security headers, SSL/TLS certificates, and vulnerability assessment',
    keywords: ['security', 'headers', 'ssl', 'tls', 'vulnerability', 'analysis']
  },
  {
    name: 'Two-Factor Authentication Generator',
    path: '/two-factor-auth',
    description: 'Generate TOTP codes, QR codes for authenticator apps, and backup codes',
    keywords: ['2fa', 'totp', 'authenticator', 'qr code', 'security', 'mfa']
  },
  {
    name: 'Random Data Generator',
    path: '/random-data-generator',
    description: 'Generate secure random strings, API keys, tokens, and cryptographic data',
    keywords: ['random', 'generator', 'api key', 'token', 'cryptographic', 'secure']
  },
  {
    name: 'Password Strength Analyzer',
    path: '/password-strength-analyzer',
    description: 'Analyze password strength, detect common patterns, and provide security recommendations',
    keywords: ['password', 'strength', 'analyzer', 'security', 'breach', 'check']
  }
];

const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Lightning Fast',
    description: 'Instant processing with zero server round-trips'
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Privacy First',
    description: 'Your data never leaves your device'
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Always Available',
    description: 'Works offline once loaded'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  useSEO({
    title: 'SecureTools - Professional Security & Privacy Tools',
    description: 'SecureTools - Professional security and privacy tools that run entirely in your browser. Password generator, text encryptor, security headers checker, 2FA generator, random data generator, and password strength analyzer. Fast, secure, and always available.',
    keywords: 'security tools, password generator, text encryptor, security headers, 2FA generator, random data generator, password analyzer, online security tools, free security utilities',
    canonical: 'https://www.securetools.dev',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'SecureTools',
      description: 'Professional security and privacy tools that run entirely in your browser',
      url: 'https://www.securetools.dev',
      applicationCategory: 'Security Tools',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  });

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            SecureTools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Secure your data with professional security and privacy tools that run entirely in your browser. Fast, secure, and always available.
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/30 border-border text-center"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {filteredTools.map((tool) => (
            <div
              key={tool.path}
              className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:border-purple-500/50 transition-colors group"
            >
              <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-2 sm:mb-3">
                {tool.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-3 sm:mb-4 leading-relaxed">
                {tool.description}
              </p>
              <Link
                to={tool.path}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors inline-flex items-center gap-1"
              >
                Try it now →
              </Link>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-12">
            Why SecureTools?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg mb-3 sm:mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{feature.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>


      </main>
    </div>
  );
};

export default Index;
