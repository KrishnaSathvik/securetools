import { ToolLayout } from '@/components/layouts/ToolLayout';
import { useSEO } from '@/hooks/useSEO';
import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Shield, Zap, Code2, Users, Lock, Calculator, Clock } from 'lucide-react';

/**
 * FAQ page for SecureTools
 * 
 * This page answers common questions about SecureTools.
 * Important for SEO and user support.
 */
export const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  // FAQ data for structured data
  const faqData = [
    {
      question: "What is SecureTools?",
      answer: "SecureTools is a collection of free, privacy-focused security tools that run entirely in your browser. Our tools include password generator, text encryptor, security headers checker (educational demo), 2FA generator, random data generator, and password strength analyzer — all with local browser processing."
    },
    {
      question: "Are the tools really free?",
      answer: "Yes! All SecureTools are completely free to use. There are no hidden costs, subscriptions, or premium features. We believe security and utility tools should be accessible to everyone."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely! All processing happens locally in your browser. We don't store, transmit, or collect any of your sensitive data. Your passwords, financial information, and other data never leaves your device, ensuring complete privacy and security."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account required! You can use all SecureTools immediately without any registration. Just visit the tool you need and start using it right away."
    },
    {
      question: "Can I use these tools offline?",
      answer: "Yes! Once you load the page, all tools work offline. You can bookmark the tools and use them even without an internet connection."
    },
    {
      question: "Are there any usage limits?",
      answer: "No usage limits! You can use our tools as much as you need, whenever you need them. Generate as many passwords, calculate as many financial scenarios, or process as much data as you want without any restrictions."
    }
  ];

  useSEO({
    title: 'Frequently Asked Questions - SecureTools Security Tools',
    description: 'Find answers to common questions about SecureTools security tools. Learn about our free online security tools, encryption, privacy, and how to get started.',
    keywords: 'SecureTools FAQ, security tools questions, password generator FAQ, text encryptor help, 2FA generator help, security tools support',
    canonical: 'https://www.securetools.dev/faq',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqData.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    }
  });

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "General Questions",
      icon: HelpCircle,
      color: "text-info",
      items: [
        {
          question: "What is SecureTools?",
          answer: "SecureTools is a collection of free, privacy-focused security tools that run entirely in your browser. It includes password generator, text encryptor, security headers checker (educational demo), 2FA generator, random data generator, and password strength analyzer. All data processing happens locally on your device."
        },
        {
          question: "Is SecureTools really free?",
          answer: "Yes, SecureTools is completely free to use. There are no hidden costs, subscription fees, or premium tiers. All tools are available to everyone at no charge."
        },
        {
          question: "Do I need to create an account?",
          answer: "No account creation is required. You can use all SecureTools immediately without signing up or providing any personal information."
        },
        {
          question: "What browsers are supported?",
          answer: "SecureTools works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version of your preferred browser for the best experience."
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      color: "text-success",
      items: [
        {
          question: "Is my data safe with SecureTools?",
          answer: "All processing happens locally in your browser. Your passwords, encrypted data, and other sensitive information never leaves your device and is never sent to our servers. This ensures maximum privacy, but you should still use trusted devices and browsers."
        },
        {
          question: "Do you store any of my data?",
          answer: "No, we don't store any of your data. Everything is processed locally in your browser, and we have no access to your passwords, financial information, or any other data you process with our tools."
        },
        {
          question: "Do you use cookies?",
          answer: "We only use essential cookies for functionality (like remembering your theme preference) and analytics (to understand how our tools are used). We don't use tracking cookies or collect personal information."
        },
        {
          question: "Can I use SecureTools offline?",
          answer: "Yes! Once you load SecureTools in your browser, you can use it offline. All tools work without an internet connection after the initial page load."
        }
      ]
    },
    {
      title: "Security Features",
      icon: Lock,
      color: "text-primary",
      items: [
        {
          question: "How secure is the password generator?",
          answer: "Our password generator uses the Web Crypto API for cryptographically secure random number generation. It provides entropy calculations to show password strength. All generation happens locally in your browser."
        },
        {
          question: "How secure is the text encryptor?",
          answer: "Our text encryptor uses AES-256-GCM encryption with PBKDF2 key derivation — industry-standard browser-based encryption. Security depends on your passphrase strength. All encryption happens locally in your browser."
        },
        {
          question: "How does the security headers checker work?",
          answer: "The security headers checker is an educational demo. Browsers block reading response headers from arbitrary sites (CORS), so results are simulated locally to teach common headers like HSTS, CSP, and X-Frame-Options. It is not a live security audit — real validation requires server-side scanning."
        },
        {
          question: "How does the 2FA generator work?",
          answer: "Our 2FA generator creates TOTP (Time-based One-Time Password) codes using the Web Crypto API. It generates QR codes for authenticator apps and backup codes, following RFC 6238 standards for maximum compatibility."
        }
      ]
    },
    {
      title: "Performance & Features",
      icon: Zap,
      color: "text-warning",
      items: [
        {
          question: "How fast are the tools?",
          answer: "SecureTools are extremely fast because they run locally in your browser. There's no network latency, and processing happens instantly as you type or make changes."
        },
        {
          question: "What file sizes are supported?",
          answer: "File size limits depend on your browser's memory capacity. For most tools, you can process data up to 10MB without issues. Larger datasets may require more memory but are generally supported."
        },
        {
          question: "How secure is the random data generator?",
          answer: "Our random data generator uses the Web Crypto API for cryptographically secure random number generation. It is useful for test data, placeholders, and development samples. For production secrets, use your infrastructure's approved secret-management process."
        },
        {
          question: "Are there keyboard shortcuts?",
          answer: "Yes! SecureTools includes keyboard shortcuts for common actions. Many tools have their own shortcuts for quick access and improved productivity."
        }
      ]
    },
    {
      title: "Technical Details",
      icon: Code2,
      color: "text-primary",
      items: [
        {
          question: "What technologies does SecureTools use?",
          answer: "SecureTools is built with React 18, TypeScript, Vite, and Tailwind CSS. We use the Web Crypto API, AES-256-GCM for text encryption, and PBKDF2 for key derivation. All security features use industry-standard cryptographic methods."
        },
        {
          question: "Is SecureTools open source?",
          answer: "Yes! SecureTools is open source and available on GitHub. You can view the code, contribute improvements, or even run your own instance of the tools."
        },
        {
          question: "Can I contribute to SecureTools?",
          answer: "Absolutely! We welcome contributions from the community. You can submit pull requests, report bugs, or suggest new features on our GitHub repository."
        },
        {
          question: "How accurate are the tools?",
          answer: "Our security tools are highly accurate and use industry-standard cryptographic algorithms. However, we recommend verifying critical security results independently, especially for important security decisions."
        }
      ]
    },
    {
      title: "Troubleshooting",
      icon: Users,
      color: "text-destructive",
      items: [
        {
          question: "Why is a tool not working?",
          answer: "Try refreshing the page and clearing your browser cache. If the problem persists, check that you're using a supported browser and that JavaScript is enabled. You can also report the issue on GitHub."
        },
        {
          question: "The page is loading slowly. What should I do?",
          answer: "Slow loading is usually due to a poor internet connection or browser issues. Try refreshing the page, clearing your browser cache, or using a different browser. SecureTools should load quickly on most connections."
        },
        {
          question: "Can I use SecureTools on mobile devices?",
          answer: "Yes! SecureTools is fully responsive and works on mobile devices. However, some features may be limited on smaller screens, and we recommend using a desktop browser for the best experience."
        },
        {
          question: "How do I report a bug or suggest a feature?",
          answer: "You can report bugs or suggest features by opening an issue on our GitHub repository or emailing us. Please provide as much detail as possible, including your browser version and steps to reproduce any issues."
        }
      ]
    }
  ];

  return (
    <ToolLayout
      title="Frequently Asked Questions"
      description="Find answers to common questions about SecureTools. Learn about privacy, features, limitations, and how to get the most out of our security tools."
    >
      <div className="p-6 max-w-4xl mx-auto">

        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <category.icon className={`w-6 h-6 ${category.color}`} />
                <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
              </div>
              
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 100 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div key={itemIndex} className="border border-border rounded-lg">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-secondary/50 transition-colors"
                      >
                        <span className="font-semibold text-foreground">{item.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? We're here to help!
          </p>
          <div className="flex justify-center">
            <a 
              href="mailto:securetoolsdev@gmail.com" 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Code2 className="w-4 h-4" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};