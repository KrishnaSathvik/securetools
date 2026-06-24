import { ToolLayout } from '@/components/layouts/ToolLayout';
import { useSEO } from '@/hooks/useSEO';

/**
 * Terms of Service page for SecureTools
 * 
 * This page outlines the terms and conditions for using SecureTools.
 * Essential for AdSense approval and legal compliance.
 */
export const TermsOfService = () => {
  useSEO({
    title: 'Terms of Service - SecureTools Security Tools | Usage Terms & Conditions',
    description: 'Simple, clear, and user-friendly terms for using SecureTools. Free online security tools with local browser processing and transparent usage terms and conditions.',
    keywords: 'terms of service, usage terms, terms and conditions, security tools, free security tools, legal terms, user agreement, browser-based security',
    canonical: 'https://www.securetools.dev/terms',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Terms of Service - SecureTools',
      'description': 'Terms and conditions for using SecureTools security tools.',
      'url': 'https://www.securetools.dev/terms',
      'isPartOf': {
        '@type': 'WebSite',
        'name': 'SecureTools',
        'url': 'https://www.securetools.dev'
      },
      'datePublished': '2025-01-04',
      'dateModified': '2025-01-04'
    }
  });

  return (
    <ToolLayout
      title="Terms of Service"
      description="Simple, clear, and user-friendly terms for using SecureTools security tools."
    >
      <div className="p-6 max-w-4xl mx-auto">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using SecureTools, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              SecureTools provides free online security and utility tools including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li>Password &amp; Passphrase Generator — secure passwords and Diceware passphrases</li>
              <li>Text Encryptor/Decryptor — AES-256-GCM plus Base64, URL, and ROT13 utilities</li>
              <li>Security Headers Checker (demo) — educational header examples, not live remote scanning</li>
              <li>Two-Factor Authentication Generator — RFC 6238 TOTP codes and otpauth QR setup</li>
              <li>Random Data Generator — secure random strings, tokens, and UUIDs</li>
              <li>Password Strength Analyzer — local entropy and pattern analysis (no breach database)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              All tools process data locally in your browser and do not send data to our servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Acceptable Use</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Permitted Uses</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You may use SecureTools for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li>Personal and commercial security and utility projects</li>
              <li>Educational purposes</li>
              <li>Content creation and editing</li>
              <li>Testing and debugging applications</li>
              <li>Financial planning and calculations</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">Prohibited Uses</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You may not use SecureTools for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li>Illegal activities or to process illegal content</li>
              <li>Attempting to reverse engineer or hack our tools</li>
              <li>Overwhelming our servers with excessive requests</li>
              <li>Distributing malware or malicious code</li>
              <li>Violating any applicable laws or regulations</li>
              <li>Generating passwords for malicious purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Privacy and Data</h2>
            <div className="rounded-lg border surface-success p-4 mb-4">
              <h3 className="font-semibold text-success mb-2">🔒 Local Processing</h3>
              <p className="text-success/90 text-sm">
                All data processing happens locally in your browser. We do not collect, store, 
                or have access to your sensitive data.
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Your privacy is important to us. All tool functionality operates entirely within 
              your browser, ensuring your passwords, financial data, and other sensitive information never leaves your device.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Our Rights</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              SecureTools and its original content, features, and functionality are owned by 
              SecureTools and are protected by international copyright, trademark, and other 
              intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">Open Source License</h3>
            <p className="text-muted-foreground leading-relaxed">
              SecureTools is open source and available on GitHub. You may view the code, contribute 
              improvements, or even run your own instance of the tools.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimers</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Service Availability</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              SecureTools is provided "as is" without warranties of any kind. We do not 
              guarantee that the service will be available at all times or free from errors.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">Tool Accuracy</h3>
            <p className="text-muted-foreground leading-relaxed">
              While we strive for accuracy, we cannot guarantee that our tools will always 
              produce correct results. Please verify important security and financial calculations independently.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall SecureTools be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including without limitation, loss of profits, 
              data, use, goodwill, or other intangible losses, resulting from your use of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Advertisements</h2>
            <p className="text-muted-foreground leading-relaxed">
              SecureTools may display advertisements through Google AdSense or other advertising 
              networks. We are not responsible for the content of third-party advertisements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend your access to SecureTools immediately, without prior 
              notice, for any reason whatsoever, including without limitation if you breach these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of 
              any material changes by posting the new terms on this page and updating the 
              "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be interpreted and governed by the laws of the jurisdiction 
              where SecureTools operates, without regard to conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-card border border-border rounded-lg p-4 mt-4">
              <p className="text-foreground">
                <strong>Email:</strong> securetoolsdev@gmail.com
              </p>
            </div>
          </section>

          <div className="rounded-lg border surface-info p-4 mt-8">
            <h3 className="font-semibold text-info mb-2">🤝 User-Friendly Terms</h3>
            <p className="text-info/90 text-sm">
              These terms are designed to be clear and fair to users. We believe in 
              open source, privacy, and supporting the security and utility tools community.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};