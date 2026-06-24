import { ToolLayout } from '@/components/layouts/ToolLayout';
import { useSEO } from '@/hooks/useSEO';

/**
 * Privacy Policy page for SecureTools
 * 
 * This page outlines our privacy practices and data handling policies.
 * Essential for AdSense approval and user trust.
 */
export const PrivacyPolicy = () => {
  useSEO({
    title: 'Privacy Policy - SecureTools Security Tools | Data Protection & Privacy',
    description: 'Learn how SecureTools protects your privacy and handles your data. All processing happens locally in your browser. No data collection, no tracking, complete privacy.',
    keywords: 'privacy policy, data protection, privacy-focused, no tracking, local processing, browser-based security tools, GDPR compliant, user privacy, local browser encryption',
    canonical: 'https://www.securetools.dev/privacy',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Privacy Policy - SecureTools',
      'description': 'Privacy policy outlining how SecureTools protects user data and privacy.',
      'url': 'https://www.securetools.dev/privacy',
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
      title="Privacy Policy"
      description="Learn how SecureTools protects your privacy and handles your data. All processing happens locally in your browser."
    >
      <div className="p-6 max-w-4xl mx-auto">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Commitment to Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              SecureTools is committed to protecting your privacy. We believe that your sensitive data should remain 
              private and secure. This privacy policy explains how we collect, use, and protect your 
              information when you use our security tools with local browser processing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Data Processing Philosophy</h2>
            <div className="rounded-lg border surface-success p-4 mb-4">
              <h3 className="font-semibold text-success mb-2">🔒 Local Processing</h3>
              <p className="text-success/90 text-sm">
                All data processing happens locally in your browser. Your sensitive data never leaves your device 
                and is never sent to our servers.
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Unlike many online tools, SecureTools processes all data locally in your browser. 
              This means your passwords, financial information, text content, and other sensitive 
              data never leaves your device.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Analytics Data</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use Google Analytics to understand how our tools are used. This includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li>Pages visited and time spent on each page</li>
              <li>Device type and browser information</li>
              <li>General geographic location (country/region level)</li>
              <li>Referral sources (how you found our site)</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">No Personal Data Collection</h3>
            <p className="text-muted-foreground leading-relaxed">
              We do not collect, store, or process any personal data through our tools. 
              All tool functionality operates entirely within your browser.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Cookies and Local Storage</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Essential Cookies</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies only for essential functionality:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li><strong>Theme preference:</strong> Remember your dark/light mode choice</li>
              <li><strong>Analytics:</strong> Google Analytics cookies for usage statistics</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">Local Storage</h3>
            <p className="text-muted-foreground leading-relaxed">
              Some tools may use browser local storage to remember your preferences 
              (like password generator settings or financial calculator options). This data stays on your device only.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Services</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Google Analytics</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use Google Analytics to understand tool usage and improve our services. 
              Google Analytics may set cookies and collect data according to their privacy policy.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">Google AdSense</h3>
            <p className="text-muted-foreground leading-relaxed">
              We may display advertisements through Google AdSense. AdSense may use cookies 
              to serve relevant ads based on your browsing history.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Since all data processing happens locally in your browser, your data is as secure 
              as your device. We recommend:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Keeping your browser updated</li>
              <li>Using secure, private networks when possible</li>
              <li>Clearing browser data if using shared devices</li>
              <li>Using strong, unique passwords for your accounts</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              SecureTools is not intended for children under 13. We do not collect personal information from children under 13.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any 
              changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this privacy policy, please contact us at:
            </p>
            <div className="bg-card border border-border rounded-lg p-4 mt-4">
              <p className="text-foreground">
                <strong>Email:</strong> securetoolsdev@gmail.com
              </p>
            </div>
          </section>

          <div className="rounded-lg border surface-info p-4 mt-8">
            <h3 className="font-semibold text-info mb-2">💡 Privacy-First Design</h3>
            <p className="text-info/90 text-sm">
              SecureTools was designed with privacy in mind. Your sensitive data never leaves your device, 
              ensuring maximum security and privacy for all your security and utility work.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};