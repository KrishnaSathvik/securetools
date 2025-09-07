import { ToolLayout } from '@/components/layouts/ToolLayout';
import { CheckCircle, XCircle, Star, Zap, Shield, DollarSign, Users, Code2, Lock, Calculator, Clock } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

/**
 * Tool Comparisons page for SecureTools
 * 
 * This page compares SecureTools with other popular security and utility tool websites.
 * Helps users understand the advantages of choosing SecureTools.
 */
export const Comparisons = () => {
  useSEO({
    title: 'SecureTools vs Other Security Tools | Feature Comparison & Reviews',
    description: 'Compare SecureTools with other popular security tool websites. See why users choose SecureTools for privacy, speed, and comprehensive security tools with military-grade encryption.',
    keywords: 'security tools comparison, password generator comparison, text encryptor comparison, 2FA generator comparison, security headers checker comparison, tool reviews, security utilities comparison',
    canonical: 'https://www.securetools.dev/comparisons',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'SecureTools vs Other Security Tools',
      'description': 'Comprehensive comparison of SecureTools with other popular security tool websites.',
      'url': 'https://www.securetools.dev/comparisons',
      'isPartOf': {
        '@type': 'WebSite',
        'name': 'SecureTools',
        'url': 'https://www.securetools.dev'
      },
      'datePublished': '2025-01-04',
      'dateModified': '2025-01-04'
    }
  });

  const competitors = [
    {
      name: 'LastPass.com',
      url: 'https://lastpass.com',
      description: 'Popular password manager with generator',
      features: {
        passwordGenerator: true,
        textEncryptor: false,
        securityHeadersChecker: false,
        twoFactorAuth: false,
        randomDataGenerator: false,
        passwordStrengthAnalyzer: false
      },
      pros: ['Strong password generation', 'Password storage', 'Browser integration', 'Mobile apps'],
      cons: ['Requires subscription', 'Data stored on servers', 'Complex setup', 'No offline mode', 'Single tool focus'],
      rating: 4.0
    },
    {
      name: '1Password.com',
      url: 'https://1password.com',
      description: 'Premium password manager with security features',
      features: {
        passwordGenerator: true,
        textEncryptor: false,
        securityHeadersChecker: false,
        twoFactorAuth: true,
        randomDataGenerator: false,
        passwordStrengthAnalyzer: true
      },
      pros: ['Strong security features', '2FA support', 'Password strength analysis', 'Good UI'],
      cons: ['Expensive subscription', 'Data stored on servers', 'Complex setup', 'No offline mode', 'Limited free features'],
      rating: 4.2
    },
    {
      name: 'Authy.com',
      url: 'https://authy.com',
      description: 'Two-factor authentication app',
      features: {
        passwordGenerator: false,
        textEncryptor: false,
        securityHeadersChecker: false,
        twoFactorAuth: true,
        randomDataGenerator: false,
        passwordStrengthAnalyzer: false
      },
      pros: ['Good 2FA features', 'Mobile app', 'Backup codes', 'Free to use'],
      cons: ['Single tool focus', 'Requires internet', 'Data sent to servers', 'No offline mode', 'Limited features'],
      rating: 3.8
    },
    {
      name: 'SecurityHeaders.com',
      url: 'https://securityheaders.com',
      description: 'Website security headers checker',
      features: {
        passwordGenerator: false,
        textEncryptor: false,
        securityHeadersChecker: true,
        twoFactorAuth: false,
        randomDataGenerator: false,
        passwordStrengthAnalyzer: false
      },
      pros: ['Good security analysis', 'Free to use', 'Detailed reports', 'SSL checking'],
      cons: ['Single tool only', 'Requires internet', 'Data sent to servers', 'No offline mode', 'Limited features'],
      rating: 3.7
    },
    {
      name: 'RandomKeygen.com',
      url: 'https://randomkeygen.com',
      description: 'Random data and key generator',
      features: {
        passwordGenerator: true,
        textEncryptor: false,
        securityHeadersChecker: false,
        twoFactorAuth: false,
        randomDataGenerator: true,
        passwordStrengthAnalyzer: false
      },
      pros: ['Good random generation', 'Multiple formats', 'Free to use', 'Simple interface'],
      cons: ['Limited features', 'Data sent to servers', 'Requires internet', 'No offline mode', 'Basic security'],
      rating: 3.3
    }
  ];

  const securetoolsFeatures = {
    passwordGenerator: true,
    textEncryptor: true,
    securityHeadersChecker: true,
    twoFactorAuth: true,
    randomDataGenerator: true,
    passwordStrengthAnalyzer: true
  };

  const comparisonFeatures = [
    {
      name: 'Privacy & Security',
      description: 'All processing happens locally in your browser with military-grade encryption',
      securetools: '✅ Complete privacy',
      competitors: '❌ Data sent to servers'
    },
    {
      name: 'Tool Selection',
      description: 'Comprehensive collection of security tools',
      securetools: '✅ 6 security tools',
      competitors: '❌ Limited selection'
    },
    {
      name: 'Performance',
      description: 'Fast, responsive tools with modern technology',
      securetools: '✅ Lightning fast',
      competitors: '❌ Varies by site'
    },
    {
      name: 'User Experience',
      description: 'Consistent, modern interface across all tools',
      securetools: '✅ Unified design',
      competitors: '❌ Inconsistent UI'
    },
    {
      name: 'Cryptographic Security',
      description: 'Uses Web Crypto API with AES-256-GCM encryption',
      securetools: '✅ Military-grade encryption',
      competitors: '❌ Basic security'
    },
    {
      name: 'Mobile Friendly',
      description: 'Works perfectly on all devices',
      securetools: '✅ Fully responsive',
      competitors: '❌ Varies by site'
    },
    {
      name: 'Offline Support',
      description: 'Works without internet connection',
      securetools: '✅ Works offline',
      competitors: '❌ Requires internet'
    },
    {
      name: 'No Registration',
      description: 'Use all tools without creating an account',
      securetools: '✅ No account needed',
      competitors: '❌ Some require registration'
    }
  ];

  return (
    <ToolLayout
      title="SecureTools vs Competitors"
      description="Compare SecureTools with other popular security tool websites. See why SecureTools is the best choice for privacy-focused, comprehensive security tools with military-grade encryption."
    >
      <div className="p-6 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Why Choose SecureTools?</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the key advantages that make SecureTools the preferred choice for 
            users who value privacy, security, and comprehensive security functionality with military-grade encryption.
          </p>
        </div>

        {/* Key Advantages */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Key Advantages</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Shield className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Security First</h3>
              <p className="text-sm text-muted-foreground">All processing happens locally in your browser with military-grade encryption. Your sensitive data never leaves your device.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Code2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">6 Security Tools</h3>
              <p className="text-sm text-muted-foreground">Complete collection of security tools in one place. No need to visit multiple sites.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Zap className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Built with modern technology for maximum performance and responsiveness.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Users className="w-12 h-12 text-info mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">No Registration</h3>
              <p className="text-sm text-muted-foreground">Use all tools immediately without creating an account or providing personal information.</p>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Feature Comparison</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                    <th className="text-left p-4 font-semibold text-foreground">SecureTools</th>
                    <th className="text-left p-4 font-semibold text-foreground">Competitors</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-card' : 'bg-secondary/50'}>
                      <td className="p-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{feature.name}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-green-500 text-lg font-bold">✓</span>
                          <span className="text-success font-semibold">{feature.securetools.replace('✅ ', '')}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 text-lg font-bold">✗</span>
                          <span className="text-muted-foreground">{feature.competitors.replace('❌ ', '')}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Competitor Analysis */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Competitor Analysis</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitors.map((competitor, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">{competitor.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <span className="text-sm text-muted-foreground">{competitor.rating}/5</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{competitor.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Available Tools:</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(competitor.features).map(([tool, available]) => (
                      <span
                        key={tool}
                        className={`px-2 py-1 rounded text-xs ${
                          available
                            ? 'bg-success/10 text-success border border-success/20'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {tool.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Pros:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {competitor.pros.map((pro, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-success" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Cons:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {competitor.cons.map((con, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <XCircle className="w-3 h-3 text-danger" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={competitor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  Visit {competitor.name} →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose SecureTools */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Why Choose SecureTools?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">The Complete Solution</h3>
              <p className="text-muted-foreground mb-4">
                Instead of visiting multiple websites for different security tools, SecureTools provides 
                everything you need in one place. All tools share the same interface, making 
                your security workflow more efficient and consistent.
              </p>
              <ul className="bullet-list text-muted-foreground">
                <li>No need to remember multiple URLs</li>
                <li>Consistent user experience across all tools</li>
                <li>Single source of truth for security needs</li>
                <li>Regular updates and new features</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Privacy & Security</h3>
              <p className="text-muted-foreground mb-4">
                Unlike other tools that send your data to their servers, SecureTools processes 
                everything locally in your browser with military-grade encryption. This means your passwords, encrypted data, and other 
                sensitive information never leaves your device, ensuring maximum privacy and security.
              </p>
              <ul className="bullet-list text-muted-foreground">
                <li>No data collection or tracking</li>
                <li>Works completely offline</li>
                <li>No account creation required</li>
                <li>Your sensitive data stays on your device</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Experience the Difference?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Try SecureTools today and see why thousands of users choose us for their 
              daily security needs. Fast, secure, and privacy-focused tools with military-grade encryption that just work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Code2 className="w-4 h-4" />
                Try SecureTools Now
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
              >
                <Users className="w-4 h-4" />
                Learn More About Us
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Questions? Contact us at <a href="mailto:securetoolsdev@gmail.com" className="text-primary hover:underline">securetoolsdev@gmail.com</a><br />
              Visit us at <a href="https://www.securetools.dev" className="text-primary hover:underline">www.securetools.dev</a>
            </p>
          </div>
        </section>
      </div>
    </ToolLayout>
  );
};