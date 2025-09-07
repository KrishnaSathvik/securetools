import { ToolLayout } from '@/components/layouts/ToolLayout';
import { Shield, Zap, Lock, Users, Heart, Calculator, Clock, FileText } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

/**
 * About page for SecureTools
 * 
 * This page tells the story of SecureTools and builds trust with users.
 * Important for SEO and user engagement.
 */
export const About = () => {
  useSEO({
    title: 'About SecureTools - Professional Security Tools | Free Online Security Utilities',
    description: 'Learn about SecureTools - the professional security tools platform built for developers, security professionals, and privacy-conscious users. Military-grade encryption, local processing, completely free, and runs entirely in your browser.',
    keywords: 'about securetools, security tools, password generator, text encryptor, security headers checker, 2FA generator, random data generator, password analyzer, privacy-focused, free security tools, browser-based security',
    canonical: 'https://www.securetools.dev/about',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'About SecureTools',
      'description': 'Learn about SecureTools - the professional security and utility tools platform built for developers and professionals.',
      'url': 'https://www.securetools.dev/about',
      'mainEntity': {
        '@type': 'Organization',
        'name': 'SecureTools',
        'description': 'Professional security and utility tools platform providing free online utilities that run entirely in your browser.',
        'url': 'https://www.securetools.dev',
        'foundingDate': '2025-01-04',
        'slogan': 'Fast, secure, and always available utility tools'
      }
    }
  });

  return (
    <ToolLayout>
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3 sm:mb-4">
              About SecureTools
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Learn about SecureTools - the professional security tools platform built for developers, security professionals, and privacy-conscious users. Military-grade encryption, local processing, and completely free.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          
          {/* Hero Section */}
          <section className="mb-12 text-center">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-8">
              <img 
                src="/favicon.svg" 
                alt="SecureTools Logo" 
                className="w-16 h-16 mx-auto mb-4"
              />
              <h1 className="text-4xl font-bold text-foreground mb-4">SecureTools</h1>
              <p className="text-xl text-muted-foreground">
                Professional security tools built for the modern web with military-grade encryption
              </p>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              SecureTools was born from a simple idea: developers and security professionals deserve fast, reliable, and 
              privacy-focused security tools that work seamlessly in their browser. We believe that 
              your sensitive data should stay on your device, and your security tools should use military-grade encryption.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <Shield className="w-8 h-8 text-success mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Security First</h3>
                <p className="text-sm text-muted-foreground">
                  All processing happens locally in your browser with military-grade encryption. Your sensitive data never leaves your device.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <Zap className="w-8 h-8 text-warning mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Built with Vite and React for maximum performance and instant results.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <Heart className="w-8 h-8 text-danger mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Professional Love</h3>
                <p className="text-sm text-muted-foreground">
                  Built by security professionals, for security professionals. We understand your security needs.
                </p>
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                SecureTools started as a personal project to solve common security problems. 
                As security professionals, we were frustrated with slow, insecure online tools that required 
                uploading sensitive data to unknown servers.
              </p>
              <p>
                We wanted something different: tools that were fast, secure, and worked entirely 
                in the browser. Tools that respected privacy and didn't require account creation 
                or data uploads. Tools that just worked.
              </p>
              <p>
                So we built SecureTools - a collection of essential security tools that process 
                everything locally in your browser with military-grade encryption. No data leaves your device, no accounts required, 
                and no compromises on speed, security, or functionality.
              </p>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">What Makes Us Different</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">🔒 Privacy by Design</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Unlike other online tools, SecureTools processes all data locally in your browser with military-grade encryption. 
                  Your passwords, encrypted data, and other sensitive information never leaves your device.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>No data uploads to servers</li>
                  <li>No account creation required</li>
                  <li>No tracking of your data</li>
                  <li>Works offline after first load</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">⚡ Performance Focused</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Built with modern web technologies for maximum speed and responsiveness. 
                  Every tool is optimized for performance and user experience.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Instant results and real-time processing</li>
                  <li>Optimized for large datasets</li>
                  <li>Responsive design for all devices</li>
                  <li>Minimal resource usage</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tools Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Tools</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              SecureTools includes six essential security tools, each designed to solve 
              common security problems quickly and securely with military-grade encryption:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Password & Passphrase Generator', desc: 'Generate cryptographically secure passwords and memorable passphrases with entropy analysis' },
                { name: 'Text Encryptor/Decryptor', desc: 'Encrypt and decrypt text with AES-256 encryption and password-based security' },
                { name: 'Security Headers Checker', desc: 'Analyze website security headers, SSL/TLS certificates, and vulnerability assessment' },
                { name: 'Two-Factor Authentication Generator', desc: 'Generate TOTP codes, QR codes for authenticator apps, and backup codes' },
                { name: 'Random Data Generator', desc: 'Generate secure random strings, API keys, tokens, and cryptographic data' },
                { name: 'Password Strength Analyzer', desc: 'Analyze password strength, detect common patterns, and provide security recommendations' }
              ].map((tool, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technology Stack */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Built With Modern Technology</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              SecureTools is built using the latest web technologies to ensure the best 
              performance, security, and user experience:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Frontend</h3>
                <ul className="bullet-list text-muted-foreground">
                  <li><strong>React 18</strong> - Modern UI library</li>
                  <li><strong>TypeScript</strong> - Type-safe development</li>
                  <li><strong>Vite</strong> - Lightning-fast build tool</li>
                  <li><strong>Tailwind CSS</strong> - Utility-first styling</li>
                  <li><strong>shadcn/ui</strong> - Beautiful component library</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Security & Tools</h3>
                <ul className="bullet-list text-muted-foreground">
                  <li><strong>Web Crypto API</strong> - Military-grade cryptographic operations</li>
                  <li><strong>AES-256-GCM</strong> - Advanced encryption standard</li>
                  <li><strong>PBKDF2</strong> - Password-based key derivation</li>
                  <li><strong>Vitest</strong> - Fast unit testing</li>
                  <li><strong>ESLint</strong> - Code quality</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Professional Product */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Professional Product</h2>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <img 
                  src="/favicon.svg" 
                  alt="SecureTools Logo" 
                  className="w-8 h-8 mt-1"
                />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Commercial Software</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    SecureTools is a professional, commercial product designed for developers and security professionals 
                    who need reliable, fast, and secure security tools for their daily work.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    For licensing inquiries, contact us at securetoolsdev@gmail.com<br />
                    Visit us at <a href="https://www.securetools.dev" className="text-primary hover:underline">www.securetools.dev</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Get in Touch</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We'd love to hear from you! Whether you have feedback, suggestions, or just want to say hello, 
              we're always happy to connect with fellow security professionals and developers.
            </p>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">💼 Commercial Licensing</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Interested in commercial licensing or custom development?
              </p>
              <a 
                href="mailto:securetoolsdev@gmail.com" 
                className="text-primary hover:underline text-sm"
              >
                Contact us for licensing
              </a>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6">
                Try SecureTools today and experience the difference that privacy-focused, 
                high-performance security tools with military-grade encryption can make.
              </p>
              <a 
                href="/" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <img 
                  src="/favicon.svg" 
                  alt="SecureTools Logo" 
                  className="w-4 h-4"
                />
                Start Using Tools
              </a>
            </div>
          </section>
        </div>
      </div>
    </ToolLayout>
  );
};