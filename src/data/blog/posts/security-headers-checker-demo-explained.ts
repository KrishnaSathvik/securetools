import type { BlogPost } from '../types';

const SITE = 'https://www.securetools.dev';

export const securityHeadersCheckerDemoExplained: BlogPost = {
  id: 16,
  slug: 'security-headers-checker-demo-explained',
  title: 'What the SecureTools Security Headers Checker Demo Actually Does',
  excerpt:
    'Why browser-based header checks are simulated, what CORS blocks, and how to use the educational demo without mistaking it for a live audit.',
  metaTitle: 'Security Headers Checker Demo Explained | SecureTools',
  metaDescription:
    'Learn what the SecureTools Security Headers Checker demo does, why results are simulated, and how to validate real headers with server-side tools.',
  canonical: `${SITE}/blog/security-headers-checker-demo-explained`,
  category: 'headers',
  author: 'SecureTools Team',
  date: '2026-06-24',
  updated: '2026-06-24',
  readTime: '8 min read',
  tags: ['Security Headers', 'Demo', 'CORS', 'CSP'],
  featured: false,
  relatedToolSlug: '/security-headers-checker',
  relatedTools: ['/security-headers-checker'],
  relatedPosts: [
    'security-headers-web-applications',
    'browser-security-tools-honestly-explained',
    'web-application-security-vulnerabilities',
  ],
  faqs: [
    {
      question: 'Does the SecureTools headers checker scan any URL live?',
      answer:
        'No. Browsers block reading arbitrary sites’ response headers from client-side JavaScript (CORS). The demo generates sample values locally for education.',
    },
    {
      question: 'Why show a security score if it is simulated?',
      answer:
        'The demo score illustrates how header presence might affect a checklist — it is labeled as educational, not a real rating of your production site.',
    },
    {
      question: 'How do I check real headers on my site?',
      answer:
        'Use curl against your own origin, hosting dashboards, CI checks, or a server-side scanner you control — with permission and clear privacy policies.',
    },
    {
      question: 'Is the SSL/TLS panel a real certificate check?',
      answer:
        'No. Certificate details in the demo are simulated examples. Real validation requires connecting to your server with proper tooling.',
    },
    {
      question: 'What headers does the demo teach?',
      answer:
        'Common examples include Content-Security-Policy, Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy.',
    },
    {
      question: 'Can I use this demo to audit a client site without permission?',
      answer:
        'The demo does not perform live remote scans. For any real assessment, obtain authorization and use appropriate server-side methods.',
    },
  ],
  content: `The [Security Headers Checker (Demo)](${SITE}/security-headers-checker) helps you **learn** HTTP security headers — it does **not** perform live remote scanning. This article explains why, and how to use the demo responsibly.

## Quick answer

SecureTools shows **simulated** header examples and an **educational demo score** in your browser. **CORS** prevents reliable client-side reads of arbitrary websites’ response headers. For real validation, use **server-side** checks on infrastructure you control.

## Key takeaways

- Demo ≠ live audit.
- CORS blocks cross-origin header reads from JavaScript.
- SSL/TLS details in the demo are **simulated**.
- Useful for learning CSP, HSTS, and X-Frame-Options.
- Real checks need curl, CI, or scanners you operate.

## Why browsers cannot “scan any URL”

When you type a URL into a browser tool, JavaScript on SecureTools cannot fetch another site’s response headers the way \`curl -I\` can from a server you control. Browsers enforce **same-origin** rules and **CORS** to protect users.

That is why SecureTools labels the tool **Demo only** and generates **sample** header values locally.

## What the demo shows

After you enter a URL as **context**, the demo may display:

- Example **Content-Security-Policy** values and explanations
- **HSTS** (Strict-Transport-Security) concepts
- **X-Frame-Options** / frame control ideas
- An **educational demo score** — not a production grade
- A **simulated** SSL/TLS panel for learning vocabulary

None of this proves your live site’s current configuration.

## What the demo is good for

- Studying what common headers are meant to do
- Building a **checklist** before deploying header changes
- Teaching developers why headers matter
- Practicing vocabulary before server-side validation

## What the demo is not

- Not a penetration test
- Not certificate validation
- Not a substitute for **Mozilla Observatory**, **securityheaders.com** (server-side), or your own CI
- Not proof that a third-party site is “secure”

## How to validate real headers

On infrastructure you own or are authorized to test:

\`\`\`bash
curl -sI https://your-domain.example | grep -iE 'content-security|strict-transport|x-frame|x-content-type'
\`\`\`

Integrate checks into deployment pipelines and review changes in staging first.

## Using the demo safely

1. Open the [Headers Checker (Demo)](${SITE}/security-headers-checker).
2. Read the amber **Demo only** banner and trust panel.
3. Use **Run demo review** knowing output is simulated.
4. Follow recommendations on **your** servers with proper tools.

## Related tools

- [Security Headers Checker (Demo)](${SITE}/security-headers-checker)

## Related reading

- [Security Headers: Protecting Your Web Applications](${SITE}/blog/security-headers-web-applications)
- [Browser Security Tools, Honestly Explained](${SITE}/blog/browser-security-tools-honestly-explained)

## Try the demo

Explore header concepts with the [Security Headers Checker (Demo)](${SITE}/security-headers-checker) — clearly labeled, local, and educational.`,
};
