import { passwordSecurityGuide } from './posts/password-security-guide';
import { understandingEncryption } from './posts/understanding-encryption';
import { twoFactorAuthenticationGuide } from './posts/two-factor-authentication-guide';
import { privacyProtectionDataMinimization } from './posts/privacy-protection-data-minimization';
import { secureDevelopmentBestPractices } from './posts/secure-development-best-practices';
import { webApplicationSecurityVulnerabilities } from './posts/web-application-security-vulnerabilities';
import { apiSecurityAuthentication } from './posts/api-security-authentication';
import { securityTestingAutomated } from './posts/security-testing-automated';
import { incidentResponseManagement } from './posts/incident-response-management';
import { securityHeadersWebApplications } from './posts/security-headers-web-applications';
import { secureCodingDefensiveProgramming } from './posts/secure-coding-defensive-programming';
import { securityMonitoringThreatDetection } from './posts/security-monitoring-threat-detection';
import { passwordStrengthAnalysisWithoutBreachDatabase } from './posts/password-strength-analysis-without-breach-database';
import { generateApiKeysAndRandomTokensBrowser } from './posts/generate-api-keys-and-random-tokens-browser';
import { whatSecuretoolsTextEncryptorDoes } from './posts/what-securetools-text-encryptor-does';
import { securityHeadersCheckerDemoExplained } from './posts/security-headers-checker-demo-explained';
import { totpSecretsQrCodesSafetyGuide } from './posts/totp-secrets-qr-codes-safety-guide';
import { browserSecurityToolsHonestlyExplained } from './posts/browser-security-tools-honestly-explained';
import type { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  passwordSecurityGuide,
  understandingEncryption,
  twoFactorAuthenticationGuide,
  privacyProtectionDataMinimization,
  secureDevelopmentBestPractices,
  webApplicationSecurityVulnerabilities,
  apiSecurityAuthentication,
  securityTestingAutomated,
  incidentResponseManagement,
  securityHeadersWebApplications,
  secureCodingDefensiveProgramming,
  securityMonitoringThreatDetection,
  passwordStrengthAnalysisWithoutBreachDatabase,
  generateApiKeysAndRandomTokensBrowser,
  whatSecuretoolsTextEncryptorDoes,
  securityHeadersCheckerDemoExplained,
  totpSecretsQrCodesSafetyGuide,
  browserSecurityToolsHonestlyExplained,
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostSlugs(): string[] {
  return blogPosts.filter((post) => !post.noindex).map((post) => post.slug);
}

export function getIndexableBlogPosts(): BlogPost[] {
  return blogPosts.filter((post) => !post.noindex);
}
