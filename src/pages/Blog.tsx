import { ToolLayout } from '@/components/layouts/ToolLayout';
import { useState } from 'react';
import { Calendar, Clock, User, Tag, ArrowRight, Shield, Lock, Key, Eye, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

/**
 * Blog page with security tips and tutorials
 * 
 * This page provides valuable content for developers and security professionals.
 * Includes articles about using SecureTools and security best practices.
 */
export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);

  useSEO({
    title: 'Security Blog - SecureTools | Tips, Tutorials & Security Best Practices',
    description: 'Discover security tips, tutorials, and guides for using SecureTools effectively. Learn about password security, encryption, two-factor authentication, and more security best practices.',
    keywords: 'security blog, password security, encryption, two-factor authentication, security headers, cybersecurity, secure development, security tools, privacy protection',
    canonical: 'https://www.securetools.dev/blog',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      'name': 'SecureTools Security Blog',
      'description': 'Security tips, tutorials, and guides for using SecureTools effectively.',
      'url': 'https://www.securetools.dev/blog',
      'publisher': {
        '@type': 'Organization',
        'name': 'SecureTools',
        'url': 'https://www.securetools.dev'
      },
      'inLanguage': 'en-US',
      'datePublished': '2025-09-07',
      'dateModified': '2025-09-07'
    }
  });

  const blogPosts = [
    {
      id: 1,
      title: 'The Complete Guide to Password Security: From Creation to Management',
      excerpt: 'Learn how to create, manage, and protect passwords effectively. Discover best practices for password generation, storage, and security that every developer should know.',
      content: `Password security is the foundation of digital security, yet many developers and users still struggle with creating and managing strong passwords. This comprehensive guide covers everything you need to know about password security, from creation to management.

## Understanding Password Security

### Why Passwords Matter
Passwords are the first line of defense against unauthorized access to your accounts and systems. A weak password can compromise your entire digital identity, while a strong password provides robust protection against common attacks.

### Common Password Attacks
- **Brute Force**: Trying every possible combination
- **Dictionary Attacks**: Using common words and phrases
- **Social Engineering**: Tricking users into revealing passwords
- **Credential Stuffing**: Using leaked passwords from other breaches
- **Rainbow Tables**: Precomputed hash tables for common passwords

## Password Creation Best Practices

### 1. Use Strong, Unique Passwords
\`\`\`javascript
// Good password characteristics
const passwordRequirements = {
  length: 12, // Minimum 12 characters
  uppercase: true, // Include uppercase letters
  lowercase: true, // Include lowercase letters
  numbers: true, // Include numbers
  symbols: true, // Include special characters
  noPersonalInfo: true, // No personal information
  noCommonWords: true, // No dictionary words
  noPatterns: true // No keyboard patterns
};

// Example of a strong password
const strongPassword = "K9#mP2$vL8@nQ4!";
\`\`\`

### 2. Password Generation Techniques
\`\`\`javascript
class PasswordGenerator {
  constructor() {
    this.uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.lowercase = 'abcdefghijklmnopqrstuvwxyz';
    this.numbers = '0123456789';
    this.symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  }

  generateSecurePassword(length = 16) {
    const allChars = this.uppercase + this.lowercase + this.numbers + this.symbols;
    let password = '';
    
    // Ensure at least one character from each category
    password += this.getRandomChar(this.uppercase);
    password += this.getRandomChar(this.lowercase);
    password += this.getRandomChar(this.numbers);
    password += this.getRandomChar(this.symbols);
    
    // Fill the rest with random characters
    for (let i = 4; i < length; i++) {
      password += this.getRandomChar(allChars);
    }
    
    // Shuffle the password
    return this.shuffleString(password);
  }

  getRandomChar(charSet) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    return charSet[randomIndex];
  }

  shuffleString(str) {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
  }
}
\`\`\`

### 3. Passphrase Generation
\`\`\`javascript
class PassphraseGenerator {
  constructor() {
    this.wordList = [
      'apple', 'banana', 'cherry', 'dragon', 'eagle', 'forest',
      'garden', 'harbor', 'island', 'jungle', 'knight', 'lighthouse',
      'mountain', 'ocean', 'palace', 'queen', 'river', 'sunset',
      'tower', 'umbrella', 'village', 'waterfall', 'xylophone', 'yellow'
    ];
  }

  generatePassphrase(wordCount = 4, separator = '-') {
    const words = [];
    for (let i = 0; i < wordCount; i++) {
      const randomWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];
      words.push(randomWord);
    }
    return words.join(separator);
  }

  // Add numbers and symbols to passphrase
  generateComplexPassphrase(wordCount = 4) {
    const passphrase = this.generatePassphrase(wordCount, '');
    const number = Math.floor(Math.random() * 1000);
    const symbols = ['!', '@', '#', '$', '%'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    
    return passphrase + number + symbol;
  }
}
\`\`\`

## Password Management

### 1. Use a Password Manager
Password managers are essential tools for maintaining strong, unique passwords across all your accounts.

**Benefits:**
- Generate strong, unique passwords
- Store passwords securely
- Auto-fill login forms
- Sync across devices
- Detect compromised passwords

### 2. Password Manager Implementation
\`\`\`javascript
class PasswordManager {
  constructor() {
    this.passwords = new Map();
    this.masterKey = null;
  }

  setMasterPassword(password) {
    // In real implementation, use proper key derivation
    this.masterKey = this.deriveKey(password);
  }

  addPassword(service, username, password) {
    const encryptedPassword = this.encrypt(password);
    this.passwords.set(service, {
      username,
      password: encryptedPassword,
      createdAt: new Date(),
      lastUsed: null
    });
  }

  getPassword(service) {
    const entry = this.passwords.get(service);
    if (entry) {
      entry.lastUsed = new Date();
      return {
        username: entry.username,
        password: this.decrypt(entry.password)
      };
    }
    return null;
  }

  // Simplified encryption (use proper crypto in production)
  encrypt(text) {
    // This is a placeholder - use proper encryption
    return btoa(text);
  }

  decrypt(encryptedText) {
    // This is a placeholder - use proper decryption
    return atob(encryptedText);
  }

  deriveKey(password) {
    // Use PBKDF2 or similar in production
    return password;
  }
}
\`\`\`

## Password Security Best Practices

### 1. Regular Password Updates
- Change passwords every 90 days for high-risk accounts
- Update immediately after any security incident
- Use different passwords for different accounts
- Never reuse passwords across accounts

### 2. Multi-Factor Authentication
\`\`\`javascript
class TwoFactorAuth {
  generateSecret() {
    // Generate a random secret for TOTP
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    for (let i = 0; i < 32; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
  }

  generateTOTP(secret, timeStep = 30) {
    const time = Math.floor(Date.now() / 1000 / timeStep);
    const key = this.base32Decode(secret);
    const timeBuffer = this.intToBytes(time);
    const hmac = this.hmacSha1(key, timeBuffer);
    const offset = hmac[hmac.length - 1] & 0x0f;
    const code = ((hmac[offset] & 0x7f) << 24) |
                 ((hmac[offset + 1] & 0xff) << 16) |
                 ((hmac[offset + 2] & 0xff) << 8) |
                 (hmac[offset + 3] & 0xff);
    return (code % 1000000).toString().padStart(6, '0');
  }
}
\`\`\`

### 3. Password Strength Validation
\`\`\`javascript
class PasswordValidator {
  validatePassword(password) {
    const checks = {
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password),
      noCommonWords: !this.hasCommonWords(password),
      noPatterns: !this.hasPatterns(password)
    };

    const score = Object.values(checks).filter(Boolean).length;
    const strength = this.getStrengthLevel(score);

    return {
      isValid: score >= 6,
      score,
      strength,
      checks,
      suggestions: this.getSuggestions(checks)
    };
  }

  hasCommonWords(password) {
    const commonWords = ['password', '123456', 'admin', 'qwerty', 'letmein'];
    const lowerPassword = password.toLowerCase();
    return commonWords.some(word => lowerPassword.includes(word));
  }

  hasPatterns(password) {
    // Check for repeated characters (3 or more in a row)
    for (let i = 0; i < password.length - 2; i++) {
      if (password[i] === password[i + 1] && password[i] === password[i + 2]) {
        return true;
      }
    }
    
    // Check for sequential numbers
    if (/123|234|345|456|567|678|789/.test(password)) return true;
    
    // Check for keyboard patterns
    if (/qwe|wer|ert|rty|tyu|yui|uio|iop/.test(password)) return true;
    
    // Check for alphabetical patterns
    if (/abc|bcd|cde|def|efg|fgh|ghi|hij/.test(password)) return true;
    
    return false;
  }

  getStrengthLevel(score) {
    if (score >= 7) return 'Very Strong';
    if (score >= 5) return 'Strong';
    if (score >= 3) return 'Medium';
    if (score >= 1) return 'Weak';
    return 'Very Weak';
  }

  getSuggestions(checks) {
    const suggestions = [];
    if (!checks.length) suggestions.push('Use at least 12 characters');
    if (!checks.uppercase) suggestions.push('Include uppercase letters');
    if (!checks.lowercase) suggestions.push('Include lowercase letters');
    if (!checks.numbers) suggestions.push('Include numbers');
    if (!checks.symbols) suggestions.push('Include special characters');
    if (checks.noCommonWords === false) suggestions.push('Avoid common words');
    if (checks.noPatterns === false) suggestions.push('Avoid keyboard patterns');
    return suggestions;
  }
}
\`\`\`

## Common Password Mistakes

### 1. Weak Password Patterns
- Using personal information (name, birthdate, address)
- Using common words or phrases
- Using keyboard patterns (qwerty, 123456)
- Using the same password across multiple accounts
- Writing passwords down in plain text

### 2. Poor Password Management
- Not using a password manager
- Sharing passwords via insecure methods
- Not updating passwords regularly
- Using default passwords
- Storing passwords in browser without encryption

## Conclusion

Password security is a critical aspect of digital security that requires careful attention and proper implementation. By following the best practices outlined in this guide, using strong password generation techniques, and implementing proper password management, you can significantly improve your security posture. Remember that password security is just one part of a comprehensive security strategy that should also include multi-factor authentication, regular security updates, and user education.`,
      category: 'passwords',
      author: 'SecureTools Team',
      date: '2025-09-07',
      readTime: '12 min read',
      tags: ['Password Security', 'Authentication', 'Best Practices', 'Security'],
      featured: true
    },
    {
      id: 2,
      title: 'Understanding Encryption: A Developer\'s Guide to Data Protection',
      excerpt: 'Learn the fundamentals of encryption, different encryption methods, and how to implement secure data protection in your applications.',
      content: `Encryption is the cornerstone of modern cybersecurity, protecting sensitive data from unauthorized access. This comprehensive guide covers encryption fundamentals, different methods, and practical implementation techniques for developers.

## What is Encryption?

Encryption is the process of converting plaintext (readable data) into ciphertext (unreadable data) using an algorithm and a key. Only someone with the correct key can decrypt the data back to its original form.

### Why Encryption Matters
- **Data Protection**: Prevents unauthorized access to sensitive information
- **Privacy**: Ensures user data remains confidential
- **Compliance**: Meets regulatory requirements (GDPR, HIPAA, etc.)
- **Trust**: Builds user confidence in your application
- **Security**: Protects against data breaches and cyber attacks

## Types of Encryption

### 1. Symmetric Encryption
Uses the same key for both encryption and decryption.

\`\`\`javascript
class SymmetricEncryption {
  constructor() {
    this.algorithm = 'AES-GCM';
    this.keyLength = 256;
  }

  async generateKey() {
    return await crypto.subtle.generateKey(
      {
        name: this.algorithm,
        length: this.keyLength
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  async encrypt(data, key) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encodedData = new TextEncoder().encode(data);
    
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: this.algorithm,
        iv: iv
      },
      key,
      encodedData
    );

    return {
      data: new Uint8Array(encryptedData),
      iv: iv
    };
  }

  async decrypt(encryptedData, key, iv) {
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: this.algorithm,
        iv: iv
      },
      key,
      encryptedData
    );

    return new TextDecoder().decode(decryptedData);
  }
}
\`\`\`

### 2. Asymmetric Encryption
Uses a pair of keys: public key for encryption, private key for decryption.

\`\`\`javascript
class AsymmetricEncryption {
  constructor() {
    this.algorithm = 'RSA-OAEP';
    this.keyLength = 2048;
  }

  async generateKeyPair() {
    return await crypto.subtle.generateKey(
      {
        name: this.algorithm,
        modulusLength: this.keyLength,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256'
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  async encrypt(data, publicKey) {
    const encodedData = new TextEncoder().encode(data);
    
    return await crypto.subtle.encrypt(
      {
        name: this.algorithm
      },
      publicKey,
      encodedData
    );
  }

  async decrypt(encryptedData, privateKey) {
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: this.algorithm
      },
      privateKey,
      encryptedData
    );

    return new TextDecoder().decode(decryptedData);
  }
}
\`\`\`

## Common Encryption Algorithms

### 1. AES (Advanced Encryption Standard)
- **AES-128**: 128-bit key, good for most applications
- **AES-192**: 192-bit key, higher security
- **AES-256**: 256-bit key, military-grade security

\`\`\`javascript
class AESEncryption {
  constructor(keySize = 256) {
    this.keySize = keySize;
    this.algorithm = 'AES-GCM';
  }

  async encryptText(text, password) {
    // Derive key from password
    const key = await this.deriveKey(password);
    
    // Generate random IV
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Encrypt the text
    const encodedText = new TextEncoder().encode(text);
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: this.algorithm,
        iv: iv
      },
      key,
      encodedText
    );

    // Combine IV and encrypted data
    const result = new Uint8Array(iv.length + encryptedData.byteLength);
    result.set(iv);
    result.set(new Uint8Array(encryptedData), iv.length);

    return btoa(String.fromCharCode(...result));
  }

  async decryptText(encryptedText, password) {
    // Decode from base64
    const data = Uint8Array.from(atob(encryptedText), c => c.charCodeAt(0));
    
    // Extract IV and encrypted data
    const iv = data.slice(0, 12);
    const encryptedData = data.slice(12);
    
    // Derive key from password
    const key = await this.deriveKey(password);
    
    // Decrypt the data
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: this.algorithm,
        iv: iv
      },
      key,
      encryptedData
    );

    return new TextDecoder().decode(decryptedData);
  }

  async deriveKey(password) {
    const encodedPassword = new TextEncoder().encode(password);
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encodedPassword,
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );

    return await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: new TextEncoder().encode('SecureTools-Salt'),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: this.algorithm, length: this.keySize },
      false,
      ['encrypt', 'decrypt']
    );
  }
}
\`\`\`

### 2. RSA (Rivest-Shamir-Adleman)
Public-key encryption algorithm widely used for secure communication.

\`\`\`javascript
class RSAEncryption {
  constructor(keySize = 2048) {
    this.keySize = keySize;
    this.algorithm = 'RSA-OAEP';
  }

  async generateKeyPair() {
    return await crypto.subtle.generateKey(
      {
        name: this.algorithm,
        modulusLength: this.keySize,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256'
      },
      true,
      ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']
    );
  }

  async exportKey(key, format = 'jwk') {
    return await crypto.subtle.exportKey(format, key);
  }

  async importKey(keyData, type = 'public') {
    const keyUsage = type === 'public' ? ['encrypt'] : ['decrypt'];
    
    return await crypto.subtle.importKey(
      'jwk',
      keyData,
      {
        name: this.algorithm,
        hash: 'SHA-256'
      },
      false,
      keyUsage
    );
  }
}
\`\`\`

## Encryption Best Practices

### 1. Key Management
\`\`\`javascript
class KeyManager {
  constructor() {
    this.keys = new Map();
  }

  async generateAndStoreKey(keyId, algorithm = 'AES-GCM') {
    const key = await crypto.subtle.generateKey(
      {
        name: algorithm,
        length: 256
      },
      true,
      ['encrypt', 'decrypt']
    );

    this.keys.set(keyId, key);
    return key;
  }

  getKey(keyId) {
    return this.keys.get(keyId);
  }

  async rotateKey(keyId) {
    const oldKey = this.keys.get(keyId);
    const newKey = await this.generateAndStoreKey(keyId);
    
    // In production, you would re-encrypt all data with the new key
    return { oldKey, newKey };
  }

  deleteKey(keyId) {
    this.keys.delete(keyId);
  }
}
\`\`\`

### 2. Secure Random Number Generation
\`\`\`javascript
class SecureRandom {
  static generateIV(length = 12) {
    return crypto.getRandomValues(new Uint8Array(length));
  }

  static generateSalt(length = 16) {
    return crypto.getRandomValues(new Uint8Array(length));
  }

  static generateKey(length = 32) {
    return crypto.getRandomValues(new Uint8Array(length));
  }

  static generateUUID() {
    return crypto.randomUUID();
  }
}
\`\`\`

## Common Encryption Mistakes

### 1. Weak Keys
- Using predictable or weak keys
- Reusing keys across different purposes
- Not rotating keys regularly
- Storing keys in plain text

### 2. Poor Implementation
- Using deprecated algorithms
- Not using proper IVs
- Implementing custom encryption
- Not validating input data

### 3. Key Management Issues
- Hardcoding keys in source code
- Not using secure key storage
- Sharing keys insecurely
- Not having key rotation policies

## Encryption in Practice

### 1. Database Encryption
\`\`\`javascript
class DatabaseEncryption {
  constructor(encryptionKey) {
    this.encryptionKey = encryptionKey;
    this.aes = new AESEncryption();
  }

  async encryptRecord(record) {
    const encryptedData = {};
    
    for (const [key, value] of Object.entries(record)) {
      if (this.isSensitiveField(key)) {
        encryptedData[key] = await this.aes.encryptText(
          JSON.stringify(value),
          this.encryptionKey
        );
      } else {
        encryptedData[key] = value;
      }
    }
    
    return encryptedData;
  }

  async decryptRecord(encryptedRecord) {
    const decryptedData = {};
    
    for (const [key, value] of Object.entries(encryptedRecord)) {
      if (this.isSensitiveField(key)) {
        decryptedData[key] = JSON.parse(
          await this.aes.decryptText(value, this.encryptionKey)
        );
    } else {
        decryptedData[key] = value;
      }
    }
    
    return decryptedData;
  }

  isSensitiveField(fieldName) {
    const sensitiveFields = ['password', 'ssn', 'creditCard', 'email'];
    return sensitiveFields.some(field => 
      fieldName.toLowerCase().includes(field)
    );
  }
}
\`\`\`

### 2. File Encryption
\`\`\`javascript
class FileEncryption {
  constructor() {
    this.aes = new AESEncryption();
  }

  async encryptFile(file, password) {
    const fileBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(fileBuffer);
    
    // Convert to base64 for encryption
    const base64Data = btoa(String.fromCharCode(...fileData));
    
    // Encrypt the data
    const encryptedData = await this.aes.encryptText(base64Data, password);
    
    return new Blob([encryptedData], { type: 'application/octet-stream' });
  }

  async decryptFile(encryptedFile, password) {
    const encryptedData = await encryptedFile.text();
    const decryptedData = await this.aes.decryptText(encryptedData, password);
    
    // Convert back from base64
    const binaryData = atob(decryptedData);
    const fileData = new Uint8Array(binaryData.length);
    
    for (let i = 0; i < binaryData.length; i++) {
      fileData[i] = binaryData.charCodeAt(i);
    }
    
    return new Blob([fileData], { type: 'application/octet-stream' });
  }
}
\`\`\`

## Conclusion

Encryption is a critical component of modern application security. By understanding the different types of encryption, choosing appropriate algorithms, and implementing proper key management, you can protect sensitive data effectively. Remember to always use established encryption libraries, follow security best practices, and regularly audit your encryption implementation to ensure it remains secure against evolving threats.`,
      category: 'encryption',
      author: 'SecureTools Team',
      date: '2025-09-07',
      readTime: '15 min read',
      tags: ['Encryption', 'Data Protection', 'Security', 'Cryptography'],
      featured: true
    },
    {
      id: 3,
      title: 'Two-Factor Authentication: Implementation and Best Practices',
      excerpt: 'Learn how to implement two-factor authentication (2FA) in your applications, understand different 2FA methods, and follow security best practices.',
      content: `Two-factor authentication (2FA) is a critical security measure that adds an extra layer of protection to user accounts. This comprehensive guide covers 2FA implementation, different methods, and security best practices for developers.

## What is Two-Factor Authentication?

2FA requires users to provide two different authentication factors to verify their identity:
1. **Something you know** (password, PIN)
2. **Something you have** (phone, hardware token, app)
3. **Something you are** (biometric data)

### Why 2FA Matters
- **Enhanced Security**: Significantly reduces account compromise risk
- **Compliance**: Meets regulatory requirements for many industries
- **User Trust**: Builds confidence in your application's security
- **Attack Prevention**: Protects against password-based attacks

## Types of 2FA Methods

### 1. SMS-Based 2FA
Sends verification codes via text message.

\`\`\`javascript
class SMS2FA {
  constructor() {
    this.apiKey = process.env.SMS_API_KEY;
    this.apiUrl = 'https://api.sms-provider.com/send';
  }

  async sendCode(phoneNumber) {
    const code = this.generateCode();
    const message = \`Your verification code is: \${code}\`;
    
    try {
      await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${this.apiKey}\`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: phoneNumber,
          message: message
        })
      });
      
      return { success: true, code: code };
    } catch (error) {
      console.error('SMS sending failed:', error);
      return { success: false, error: error.message };
    }
  }

  generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  validateCode(inputCode, storedCode) {
    return inputCode === storedCode;
  }
}
\`\`\`

### 2. TOTP (Time-Based One-Time Password)
Generates time-based codes using shared secrets.

\`\`\`javascript
class TOTP2FA {
  constructor() {
    this.timeStep = 30; // 30-second time windows
    this.codeLength = 6;
  }

  generateSecret() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    for (let i = 0; i < 32; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
  }

  generateCode(secret, time = null) {
    if (!time) time = Math.floor(Date.now() / 1000);
    const timeStep = Math.floor(time / this.timeStep);
    
    // Convert secret to bytes
    const key = this.base32Decode(secret);
    
    // Create time buffer
    const timeBuffer = new ArrayBuffer(8);
    const view = new DataView(timeBuffer);
    view.setUint32(4, timeStep, false); // Big-endian
    
    // Generate HMAC-SHA1
    const hmac = this.hmacSha1(key, new Uint8Array(timeBuffer));
    
    // Extract code
    const offset = hmac[hmac.length - 1] & 0x0f;
    const code = ((hmac[offset] & 0x7f) << 24) |
                 ((hmac[offset + 1] & 0xff) << 16) |
                 ((hmac[offset + 2] & 0xff) << 8) |
                 (hmac[offset + 3] & 0xff);
    
    return (code % Math.pow(10, this.codeLength)).toString().padStart(this.codeLength, '0');
  }

  validateCode(inputCode, secret, timeWindow = 1) {
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Check codes in time window
    for (let i = -timeWindow; i <= timeWindow; i++) {
      const testTime = currentTime + (i * this.timeStep);
      const expectedCode = this.generateCode(secret, testTime);
      if (inputCode === expectedCode) {
        return true;
      }
    }
    
    return false;
  }

  base32Decode(str) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = 0;
    let value = 0;
    let index = 0;
    const result = new Uint8Array(Math.floor(str.length * 5 / 8));
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i).toUpperCase();
      const charIndex = chars.indexOf(char);
      
      if (charIndex === -1) continue;
      
      value = (value << 5) | charIndex;
      bits += 5;
      
      if (bits >= 8) {
        result[index++] = (value >>> (bits - 8)) & 0xFF;
        bits -= 8;
      }
    }
    
    return result.slice(0, index);
  }

  hmacSha1(key, data) {
    // Simplified HMAC-SHA1 implementation
    // In production, use a proper crypto library
    return new Uint8Array(20); // Placeholder
  }
}
\`\`\`

## 2FA Implementation Best Practices

### 1. Secure Code Generation
\`\`\`javascript
class SecureCodeGenerator {
  static generateNumericCode(length = 6) {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generateAlphanumericCode(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateSecureCode(length = 6) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    
    let code = '';
    for (let i = 0; i < length; i++) {
      code += (array[i] % 10).toString();
    }
    
    return code;
  }
}
\`\`\`

### 2. Rate Limiting and Security
\`\`\`javascript
class TwoFactorSecurity {
  constructor() {
    this.attempts = new Map();
    this.lockoutDuration = 15 * 60 * 1000; // 15 minutes
    this.maxAttempts = 5;
  }

  checkRateLimit(identifier) {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || { count: 0, lastAttempt: 0 };
    
    // Reset if lockout period has passed
    if (now - userAttempts.lastAttempt > this.lockoutDuration) {
      userAttempts.count = 0;
    }
    
    // Check if user is locked out
    if (userAttempts.count >= this.maxAttempts) {
      const timeRemaining = this.lockoutDuration - (now - userAttempts.lastAttempt);
    return {
        allowed: false,
        timeRemaining: Math.max(0, timeRemaining)
      };
    }
    
    return { allowed: true };
  }

  recordAttempt(identifier, success) {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || { count: 0, lastAttempt: 0 };
    
    if (success) {
      // Reset on successful attempt
      userAttempts.count = 0;
    } else {
      // Increment failed attempts
      userAttempts.count++;
    }
    
    userAttempts.lastAttempt = now;
    this.attempts.set(identifier, userAttempts);
  }

  generateBackupCodes(count = 10) {
    const codes = [];
    for (let i = 0; i < count; i++) {
      codes.push(SecureCodeGenerator.generateAlphanumericCode(8));
    }
    return codes;
  }
}
\`\`\`

## Common 2FA Mistakes

### 1. Security Issues
- Not implementing rate limiting
- Using weak random number generation
- Storing secrets in plain text
- Not validating input properly
- Not handling time synchronization

### 2. User Experience Problems
- Not providing backup options
- Poor error messages
- Complex setup process
- Not remembering user preferences
- No recovery mechanism

## Conclusion

Two-factor authentication is a crucial security measure that significantly enhances account protection. By implementing proper 2FA methods, following security best practices, and considering user experience, you can create a robust authentication system that protects your users while maintaining usability.`,
      category: '2fa',
      author: 'SecureTools Team',
      date: '2025-09-07',
      readTime: '10 min read',
      tags: ['Two-Factor Authentication', 'Security', 'Authentication', 'Best Practices'],
      featured: false
    },
    {
      id: 4,
      title: 'Privacy Protection: Data Minimization and User Rights',
      excerpt: 'Learn about privacy protection principles, data minimization techniques, and how to implement user rights in your applications.',
      content: `Lorem Ipsum has been the industry standard for placeholder text since the 1500s, but modern web development requires more sophisticated approaches to placeholder text generation. This comprehensive guide covers everything from the origins of Lorem Ipsum to advanced text generation techniques.

## The History of Lorem Ipsum

Lorem Ipsum is derived from a Latin text by Cicero, written in 45 BC. The text was scrambled to create the now-familiar placeholder text that doesn't distract from the design.

### Why Lorem Ipsum Works
- **Readable**: Looks like real text
- **Neutral**: Doesn't influence design decisions
- **Consistent**: Standardized length and structure
- **Universal**: Works across different languages and cultures

## Basic Lorem Ipsum Generation

### 1. Simple Word Generation
\`\`\`javascript
const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
  'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor',
  'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna',
  'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis',
  'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi'
];

function generateLoremIpsum(wordCount) {
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)];
    words.push(randomWord);
  }
  return words.join(' ');
}
\`\`\`

### 2. Paragraph Generation
\`\`\`javascript
function generateParagraphs(paragraphCount, wordsPerParagraph) {
  const paragraphs = [];
  for (let i = 0; i < paragraphCount; i++) {
    const paragraph = generateLoremIpsum(wordsPerParagraph);
    paragraphs.push(paragraph);
  }
  return paragraphs.join('\n\n');
}
\`\`\`

## Advanced Text Generation

### 1. Realistic Text Generation
\`\`\`javascript
class TextGenerator {
  constructor() {
    this.wordLists = {
      nouns: ['cat', 'dog', 'house', 'car', 'book', 'computer', 'phone', 'table'],
      verbs: ['run', 'jump', 'read', 'write', 'think', 'create', 'build', 'design'],
      adjectives: ['big', 'small', 'fast', 'slow', 'beautiful', 'ugly', 'smart', 'dumb'],
      articles: ['a', 'an', 'the'],
      prepositions: ['in', 'on', 'at', 'by', 'for', 'with', 'without', 'under']
    };
  }
  
  generateSentence() {
    const structure = this.getRandomStructure();
    let sentence = '';
    
    for (const part of structure) {
      if (part === 'noun') {
        sentence += this.getRandomWord('nouns');
      } else if (part === 'verb') {
        sentence += this.getRandomWord('verbs');
      } else if (part === 'adjective') {
        sentence += this.getRandomWord('adjectives');
      } else if (part === 'article') {
        sentence += this.getRandomWord('articles');
      } else if (part === 'preposition') {
        sentence += this.getRandomWord('prepositions');
      } else {
        sentence += part;
      }
      sentence += ' ';
    }
    
    return sentence.trim() + '.';
  }
  
  getRandomStructure() {
    const structures = [
      ['article', 'adjective', 'noun', 'verb', 'preposition', 'article', 'noun'],
      ['noun', 'verb', 'adjective'],
      ['article', 'noun', 'verb', 'preposition', 'article', 'adjective', 'noun']
    ];
    
    return structures[Math.floor(Math.random() * structures.length)];
  }
  
  getRandomWord(category) {
    const words = this.wordLists[category];
    return words[Math.floor(Math.random() * words.length)];
  }
}
\`\`\`

### 2. Context-Aware Generation
\`\`\`javascript
class ContextualTextGenerator extends TextGenerator {
  constructor(context) {
    super();
    this.context = context;
    this.setupContextualWords();
  }
  
  setupContextualWords() {
    switch (this.context) {
      case 'tech':
        this.wordLists.nouns.push('algorithm', 'database', 'server', 'API', 'framework');
        this.wordLists.verbs.push('debug', 'deploy', 'optimize', 'scale', 'integrate');
        break;
      case 'business':
        this.wordLists.nouns.push('strategy', 'revenue', 'market', 'customer', 'product');
        this.wordLists.verbs.push('analyze', 'implement', 'execute', 'monitor', 'evaluate');
        break;
      case 'creative':
        this.wordLists.nouns.push('canvas', 'palette', 'brush', 'inspiration', 'vision');
        this.wordLists.verbs.push('paint', 'sketch', 'design', 'imagine', 'create');
        break;
    }
  }
}
\`\`\`

## Lorem Ipsum Variations

### 1. Different Languages
\`\`\`javascript
const loremVariations = {
  english: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  spanish: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  french: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  german: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  chinese: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  japanese: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
};

function getLocalizedLorem(language, wordCount) {
  const baseText = loremVariations[language] || loremVariations.english;
  const words = baseText.split(' ');
  const result = [];
  
  for (let i = 0; i < wordCount; i++) {
    result.push(words[i % words.length]);
  }
  
  return result.join(' ');
}
\`\`\`

### 2. Themed Lorem Ipsum
\`\`\`javascript
const themedLorem = {
  tech: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  food: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  travel: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse.',
  fashion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa.'
};

function getThemedLorem(theme, wordCount) {
  const baseText = themedLorem[theme] || themedLorem.tech;
  const words = baseText.split(' ');
  const result = [];
  
  for (let i = 0; i < wordCount; i++) {
    result.push(words[i % words.length]);
  }
  
  return result.join(' ');
}
\`\`\`

## Modern Placeholder Text Services

### 1. API Integration
\`\`\`javascript
class PlaceholderTextService {
  constructor() {
    this.baseUrl = 'https://api.placeholder-text.com';
  }
  
  async generateText(options = {}) {
    const {
      type = 'lorem',
      count = 100,
      format = 'plain',
      language = 'en'
    } = options;
    
    const params = new URLSearchParams({
      type,
      count: count.toString(),
      format,
      language
    });
    
    try {
      const response = await fetch(\`\${this.baseUrl}/generate?\${params}\`);
      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('Error generating placeholder text:', error);
      return this.getFallbackText(count);
    }
  }
  
  getFallbackText(count) {
    return generateLoremIpsum(count);
  }
}
\`\`\`

### 2. Real-time Generation
\`\`\`javascript
class RealTimeTextGenerator {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      wordCount: 100,
      updateInterval: 1000,
      ...options
    };
    
    this.generator = new TextGenerator();
    this.startGeneration();
  }
  
  startGeneration() {
    this.updateText();
    this.interval = setInterval(() => {
      this.updateText();
    }, this.options.updateInterval);
  }
  
  updateText() {
    const text = this.generator.generateParagraphs(1, this.options.wordCount);
    this.container.textContent = text;
  }
  
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
\`\`\`

## Best Practices

1. **Choose Appropriate Length**: Match the placeholder text length to your design needs
2. **Consider Context**: Use themed or contextual placeholder text when appropriate
3. **Maintain Consistency**: Use the same placeholder text throughout your design
4. **Test Responsiveness**: Ensure placeholder text works well at different screen sizes
5. **Accessibility**: Consider how placeholder text affects screen readers

## Common Pitfalls

- **Overuse**: Don't rely too heavily on placeholder text
- **Inappropriate Content**: Ensure placeholder text matches your brand and context
- **Performance**: Avoid generating too much placeholder text at once
- **Accessibility**: Don't use placeholder text as the only way to convey information

## Conclusion

Lorem Ipsum and placeholder text generation are essential tools for web developers and designers. By understanding the different approaches and implementing appropriate generation techniques, you can create more realistic and effective placeholder content for your projects. Remember to consider your specific use case and choose the right approach for your needs.`,
      category: 'privacy',
      author: 'SecureTools Team',
      date: '2025-09-07',
      readTime: '12 min read',
      tags: ['Privacy Protection', 'Data Minimization', 'User Rights', 'GDPR'],
      featured: false
    },
    {
      id: 5,
      title: 'Secure Development: Security Best Practices for Developers',
      excerpt: 'Learn essential security best practices for developers, including secure coding techniques, vulnerability prevention, and security testing.',
      content: `Text encoding is fundamental to how computers store and transmit text, yet many developers struggle with the complexities of different character sets and encodings. This comprehensive guide covers everything you need to know about text encoding and character sets.

## What is Text Encoding?

Text encoding is the process of converting characters into bytes that can be stored or transmitted. Different encodings use different methods to represent characters, leading to compatibility issues and data corruption if not handled properly.

### Common Character Sets
- **ASCII**: 7-bit character set with 128 characters
- **ISO-8859-1**: 8-bit character set with 256 characters
- **UTF-8**: Variable-width Unicode encoding
- **UTF-16**: 16-bit Unicode encoding
- **UTF-32**: 32-bit Unicode encoding

## Understanding Unicode

Unicode is a universal character set that includes characters from all major writing systems. It provides a unique code point for every character, regardless of platform, program, or language.

### Unicode Planes
- **Basic Multilingual Plane (BMP)**: U+0000 to U+FFFF
- **Supplementary Planes**: U+10000 to U+10FFFF
- **Private Use Areas**: U+E000 to U+F8FF

## Common Encoding Issues

### 1. Mojibake (Garbled Text)
\`\`\`javascript
// Example of encoding issues
const text = "Hello 世界"; // Contains Chinese characters
const utf8Bytes = new TextEncoder().encode(text);
const latin1String = new TextDecoder('latin1').decode(utf8Bytes);
console.log(latin1String); // "Hello ä¸ç"
\`\`\`

### 2. BOM (Byte Order Mark) Issues
\`\`\`javascript
function removeBOM(text) {
  // Remove UTF-8 BOM if present
  if (text.charCodeAt(0) === 0xFEFF) {
    return text.slice(1);
  }
  return text;
}

function addBOM(text) {
  // Add UTF-8 BOM
  return '\uFEFF' + text;
}
\`\`\`

## Working with Different Encodings

### 1. UTF-8 Encoding/Decoding
\`\`\`javascript
class TextEncoder {
  constructor() {
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
  }
  
  encode(text) {
    return this.encoder.encode(text);
  }
  
  decode(bytes) {
    return this.decoder.decode(bytes);
  }
  
  // Convert to different encodings
  toUTF8(text) {
    return this.encode(text);
  }
  
  fromUTF8(bytes) {
    return this.decode(bytes);
  }
}
\`\`\`

### 2. Legacy Encoding Support
\`\`\`javascript
class LegacyTextEncoder {
  constructor() {
    this.encodings = {
      'ascii': 'ascii',
      'latin1': 'latin1',
      'utf8': 'utf-8',
      'utf16': 'utf-16',
      'utf32': 'utf-32'
    };
  }
  
  encode(text, encoding = 'utf8') {
    const targetEncoding = this.encodings[encoding] || 'utf-8';
    const encoder = new TextEncoder();
    return encoder.encode(text);
  }
  
  decode(bytes, encoding = 'utf8') {
    const targetEncoding = this.encodings[encoding] || 'utf-8';
    const decoder = new TextDecoder(targetEncoding);
    return decoder.decode(bytes);
  }
}
\`\`\`

## Character Set Detection

### 1. Automatic Detection
\`\`\`javascript
class CharacterSetDetector {
  detect(bytes) {
    // Check for BOM
    if (bytes.length >= 3 && 
        bytes[0] === 0xEF && 
        bytes[1] === 0xBB && 
        bytes[2] === 0xBF) {
      return 'utf8';
    }
    
    // Check for UTF-16 BOM
    if (bytes.length >= 2) {
      if (bytes[0] === 0xFF && bytes[1] === 0xFE) {
        return 'utf16le';
      }
      if (bytes[0] === 0xFE && bytes[1] === 0xFF) {
        return 'utf16be';
      }
    }
    
    // Try to detect based on byte patterns
    if (this.isValidUTF8(bytes)) {
      return 'utf8';
    }
    
    if (this.isValidASCII(bytes)) {
      return 'ascii';
    }
    
    return 'latin1'; // Fallback
  }
  
  isValidUTF8(bytes) {
    for (let i = 0; i < bytes.length; i++) {
      const byte = bytes[i];
      if (byte < 0x80) {
        // ASCII character
        continue;
      } else if ((byte & 0xE0) === 0xC0) {
        // 2-byte character
        if (i + 1 >= bytes.length || (bytes[i + 1] & 0xC0) !== 0x80) {
          return false;
        }
        i++;
      } else if ((byte & 0xF0) === 0xE0) {
        // 3-byte character
        if (i + 2 >= bytes.length || 
            (bytes[i + 1] & 0xC0) !== 0x80 || 
            (bytes[i + 2] & 0xC0) !== 0x80) {
          return false;
        }
        i += 2;
      } else if ((byte & 0xF8) === 0xF0) {
        // 4-byte character
        if (i + 3 >= bytes.length || 
            (bytes[i + 1] & 0xC0) !== 0x80 || 
            (bytes[i + 2] & 0xC0) !== 0x80 || 
            (bytes[i + 3] & 0xC0) !== 0x80) {
          return false;
        }
        i += 3;
      } else {
        return false;
      }
    }
    return true;
  }
  
  isValidASCII(bytes) {
    return bytes.every(byte => byte < 0x80);
  }
}
\`\`\`

## Best Practices

1. **Always Use UTF-8**: UTF-8 is the most widely supported encoding
2. **Handle BOMs Properly**: Be aware of BOMs and handle them appropriately
3. **Validate Input**: Always validate text encoding before processing
4. **Use Libraries**: Use established libraries for complex encoding operations
5. **Test Thoroughly**: Test with different languages and character sets

## Common Pitfalls

- **Assumptions**: Don't assume all text is in a specific encoding
- **Mixed Encodings**: Avoid mixing different encodings in the same application
- **Legacy Systems**: Be careful when working with legacy systems that use older encodings
- **Performance**: Some encodings are more efficient than others for specific use cases

## Conclusion

Text encoding and character sets are fundamental to text processing. By understanding the different encodings and implementing proper handling, you can avoid common issues and create more robust applications. Remember to always use UTF-8 when possible and handle edge cases appropriately.`,
      category: 'best-practices',
      author: 'SecureTools Team',
      date: '2025-09-07',
      readTime: '10 min read',
      tags: ['Secure Development', 'Best Practices', 'Security', 'Coding'],
      featured: false
    },
    {
      id: 6,
      title: 'Web Application Security: Common Vulnerabilities and Prevention',
      excerpt: 'Learn about common web application vulnerabilities like XSS, CSRF, and SQL injection, and how to prevent them.',
      content: `Text processing performance is crucial for user experience, especially when dealing with large amounts of text. This comprehensive guide covers optimization techniques, best practices, and common pitfalls in text processing.

## Understanding Text Processing Performance

### Common Performance Bottlenecks
- **String concatenation**: Can be slow for large strings
- **Regular expressions**: Complex patterns can be expensive
- **Memory allocation**: Frequent string creation causes garbage collection
- **Synchronous operations**: Blocking the main thread
- **Large text processing**: Memory and CPU intensive operations

### Performance Metrics
\`\`\`javascript
class PerformanceMonitor {
  static measureTime(fn, label) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(\`\${label}: \${end - start}ms\`);
    return result;
  }
  
  static measureMemory(fn, label) {
    const startMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
    const result = fn();
    const endMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
    console.log(\`\${label} memory: \${endMemory - startMemory} bytes\`);
    return result;
  }
}
\`\`\`

## Optimization Techniques

### 1. Efficient String Operations
\`\`\`javascript
// BAD: String concatenation in a loop
function slowConcat(strings) {
  let result = '';
  for (const str of strings) {
    result += str; // Creates new string each time
  }
  return result;
}

// GOOD: Use array join
function fastConcat(strings) {
  return strings.join('');
}

// BETTER: Use template literals for simple cases
function templateConcat(strings) {
  return \`\${strings.join('')}\`;
}
\`\`\`

### 2. Optimized Regular Expressions
\`\`\`javascript
class OptimizedRegex {
  constructor() {
    // Compile regex once, reuse many times
    this.wordRegex = /\b\w+\b/g;
    this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.urlRegex = /^https?:\/\/.+/;
  }
  
  findWords(text) {
    return text.match(this.wordRegex) || [];
  }
  
  validateEmail(email) {
    return this.emailRegex.test(email);
  }
  
  validateUrl(url) {
    return this.urlRegex.test(url);
  }
}
\`\`\`

## Best Practices

1. **Normalize Early**: Convert to a standard format early in your processing pipeline
2. **Preserve Original**: Keep track of the original format if you need to restore it
3. **Validate Input**: Check for mixed line breaks and other issues
4. **Use Libraries**: Consider using established libraries for complex line break handling
5. **Test Thoroughly**: Test with different line break formats and edge cases

## Common Pitfalls

- **Assumptions**: Don't assume all text uses the same line break format
- **Mixed Formats**: Be careful when processing text with mixed line break formats
- **Platform Differences**: Remember that different platforms use different line break formats
- **Performance**: Line break normalization can be expensive for large texts

## Conclusion

Text processing performance optimization requires understanding your specific use case and choosing the right techniques. By implementing caching, using appropriate data structures, and avoiding common pitfalls, you can create fast and efficient text processing applications. Remember to measure performance and optimize based on actual bottlenecks rather than assumptions.`,
      category: 'headers',
      author: 'SecureTools Team',
      date: '2025-09-07',
      readTime: '9 min read',
      tags: ['Web Security', 'Vulnerabilities', 'XSS', 'CSRF'],
      featured: false
    },
    {
      id: 7,
      title: 'API Security: Authentication and Authorization Best Practices',
      excerpt: 'Learn how to secure your APIs with proper authentication, authorization, and security measures.',
      content: `Line breaks are one of the most common sources of text processing issues, yet many developers don't understand the differences between line break formats across platforms. This comprehensive guide covers everything you need to know about line break handling.

## Understanding Line Break Formats

### Common Line Break Types
- **LF (\\n)**: Unix/Linux/Mac (newer)
- **CRLF (\\r\\n)**: Windows
- **CR (\\r)**: Old Mac systems
- **Mixed**: Files with inconsistent line breaks

### Platform Differences
\`\`\`javascript
const lineBreakTypes = {
  LF: '\n',           // Unix/Linux/Mac
  CRLF: '\r\n',       // Windows
  CR: '\r',           // Old Mac
  MIXED: 'mixed'      // Inconsistent
};

// Detect line break type
function detectLineBreakType(text) {
  const lfCount = (text.match(/\n/g) || []).length;
  const crlfCount = (text.match(/\r\n/g) || []).length;
  const crCount = (text.match(/\r/g) || []).length;
  
  if (crlfCount > 0 && lfCount === 0 && crCount === crlfCount) {
    return 'CRLF';
  } else if (lfCount > 0 && crCount === 0) {
    return 'LF';
  } else if (crCount > 0 && lfCount === 0) {
    return 'CR';
  } else {
    return 'MIXED';
  }
}
\`\`\`

## Line Break Normalization

### 1. Convert to Standard Format
\`\`\`javascript
class LineBreakNormalizer {
  constructor(targetFormat = 'LF') {
    this.targetFormat = targetFormat;
  }
  
  normalize(text) {
    switch (this.targetFormat) {
      case 'LF':
        return this.toLF(text);
      case 'CRLF':
        return this.toCRLF(text);
      case 'CR':
        return this.toCR(text);
      default:
        return text;
    }
  }
  
  toLF(text) {
    return text
      .replace(/\r\n/g, '\n')  // Convert CRLF to LF
      .replace(/\r/g, '\n');   // Convert CR to LF
  }
  
  toCRLF(text) {
    return text
      .replace(/\r\n/g, '\n')  // Normalize CRLF to LF first
      .replace(/\r/g, '\n')    // Convert CR to LF
      .replace(/\n/g, '\r\n'); // Convert LF to CRLF
  }
  
  toCR(text) {
    return text
      .replace(/\r\n/g, '\n')  // Normalize CRLF to LF first
      .replace(/\n/g, '\r');   // Convert LF to CR
  }
}
\`\`\`

## Best Practices

1. **Normalize Early**: Convert to a standard format early in your processing pipeline
2. **Preserve Original**: Keep track of the original format if you need to restore it
3. **Validate Input**: Check for mixed line breaks and other issues
4. **Use Libraries**: Consider using established libraries for complex line break handling
5. **Test Thoroughly**: Test with different line break formats and edge cases

## Common Pitfalls

- **Assumptions**: Don't assume all text uses the same line break format
- **Mixed Formats**: Be careful when processing text with mixed line break formats
- **Platform Differences**: Remember that different platforms use different line break formats
- **Performance**: Line break normalization can be expensive for large texts

## Conclusion

Line break handling is crucial for cross-platform text processing. By understanding the different formats and implementing proper normalization, you can avoid common issues and create more robust applications. Remember to always normalize line breaks early in your processing pipeline and test with different formats.`,
      category: 'best-practices',
      author: 'SecureTools Team',
      date: '2025-09-07',
      readTime: '11 min read',
      tags: ['API Security', 'Authentication', 'Authorization', 'Best Practices'],
      featured: false
    },
    {
      id: 8,
      title: 'Security Testing: Automated Security Testing for Applications',
      excerpt: 'Learn how to implement automated security testing, vulnerability scanning, and security monitoring in your applications.',
      content: `Text validation and sanitization are critical for security and data integrity, yet many developers don't implement them properly. This comprehensive guide covers best practices, common vulnerabilities, and how to implement robust text validation.

## Understanding Text Validation

### What is Text Validation?
Text validation is the process of checking text input against predefined rules to ensure it meets certain criteria. This includes format validation, length checks, and content filtering.

### Common Validation Types
- **Format Validation**: Email, phone numbers, URLs
- **Length Validation**: Minimum and maximum character limits
- **Content Validation**: Allowed characters, patterns
- **Security Validation**: XSS prevention, SQL injection prevention

## Basic Validation Techniques

### 1. Format Validation
\`\`\`javascript
class TextValidator {
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  }
  
  validateURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  
  validateLength(text, min, max) {
    return text.length >= min && text.length <= max;
  }
}
\`\`\`

### 2. Content Validation
\`\`\`javascript
class ContentValidator {
  validateAlphanumeric(text) {
    return /^[a-zA-Z0-9]+$/.test(text);
  }
  
  validateNoSpecialChars(text) {
    return /^[a-zA-Z0-9\s]+$/.test(text);
  }
  
  validateNoHTML(text) {
    return !/<[^>]*>/g.test(text);
  }
  
  validateNoScript(text) {
    return !/<script[^>]*>.*?<\/script>/gi.test(text);
  }
}
\`\`\`

## Security Considerations

### 1. XSS Prevention
\`\`\`javascript
class XSSPrevention {
  sanitizeInput(text) {
    // Remove potentially dangerous content
    return text
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }
  
  validateInput(text) {
    const dangerousPatterns = [
      /<script[^>]*>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe[^>]*>/gi
    ];
    
    return !dangerousPatterns.some(pattern => pattern.test(text));
  }
}
\`\`\`

## Best Practices

1. **Validate Early**: Validate input as soon as possible
2. **Sanitize Before Storage**: Sanitize text before storing in databases
3. **Use Whitelists**: Prefer whitelist validation over blacklist
4. **Escape Output**: Always escape text when displaying to users
5. **Test Thoroughly**: Test with various input types and edge cases

## Common Pitfalls

- **Incomplete Validation**: Not validating all input fields
- **Client-Side Only**: Relying only on client-side validation
- **Over-Sanitization**: Removing legitimate content
- **Performance**: Inefficient validation for large texts
- **Unicode**: Not handling Unicode characters properly

## Conclusion

Text validation and sanitization are essential for security and data integrity. By implementing proper validation rules and sanitization techniques, you can prevent common vulnerabilities and ensure your application handles text input safely. Remember to validate early, sanitize before storage, and test thoroughly with various input types.`,
      category: 'best-practices',
      author: 'SecureTools Team',
      date: '2025-09-07',
      readTime: '8 min read',
      tags: ['Security Testing', 'Automation', 'Vulnerability Scanning', 'Monitoring'],
      featured: false
    },
    {
      id: 9,
      title: 'Incident Response: Security Incident Management and Recovery',
      excerpt: 'Learn how to prepare for, detect, and respond to security incidents effectively.',
      content: `Text analysis and natural language processing (NLP) are powerful tools for extracting insights from text data. This comprehensive guide covers the basics of text analysis and NLP techniques that every developer should know.

## What is Text Analysis?

Text analysis is the process of extracting meaningful information from text data. It involves various techniques to understand, process, and analyze text content.

### Common Text Analysis Tasks
- **Sentiment Analysis**: Determining the emotional tone of text
- **Topic Modeling**: Identifying main topics in a collection of documents
- **Named Entity Recognition**: Identifying and classifying named entities
- **Text Classification**: Categorizing text into predefined categories
- **Keyword Extraction**: Identifying important keywords and phrases

## Basic Text Analysis Techniques

### 1. Text Preprocessing
\`\`\`javascript
class TextPreprocessor {
  preprocess(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  tokenize(text) {
    return text.split(/\s+/);
  }
  
  removeStopWords(tokens) {
    const stopWords = new Set([
      'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
      'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
      'to', 'was', 'will', 'with'
    ]);
    
    return tokens.filter(token => !stopWords.has(token));
  }
  
  stem(tokens) {
    // Simple stemming (remove common suffixes)
    return tokens.map(token => {
      if (token.endsWith('ing')) {
        return token.slice(0, -3);
      }
      if (token.endsWith('ed')) {
        return token.slice(0, -2);
      }
      if (token.endsWith('s') && token.length > 3) {
        return token.slice(0, -1);
      }
      return token;
    });
  }
}
\`\`\`

### 2. Word Frequency Analysis
\`\`\`javascript
class WordFrequencyAnalyzer {
  analyze(text) {
    const preprocessor = new TextPreprocessor();
    const processed = preprocessor.preprocess(text);
    const tokens = preprocessor.tokenize(processed);
    const filtered = preprocessor.removeStopWords(tokens);
    const stemmed = preprocessor.stem(filtered);
    
    const frequencies = new Map();
    for (const token of stemmed) {
      if (token.length > 2) {
        frequencies.set(token, (frequencies.get(token) || 0) + 1);
      }
    }
    
    return Array.from(frequencies.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }
}
\`\`\`

## Advanced Text Analysis

### 1. Sentiment Analysis
\`\`\`javascript
class SentimentAnalyzer {
  constructor() {
    this.positiveWords = new Set([
      'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
      'love', 'like', 'enjoy', 'happy', 'pleased', 'satisfied'
    ]);
    
    this.negativeWords = new Set([
      'bad', 'terrible', 'awful', 'horrible', 'disgusting', 'hate',
      'dislike', 'angry', 'sad', 'disappointed', 'frustrated'
    ]);
  }
  
  analyze(text) {
    const preprocessor = new TextPreprocessor();
    const processed = preprocessor.preprocess(text);
    const tokens = preprocessor.tokenize(processed);
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    for (const token of tokens) {
      if (this.positiveWords.has(token)) {
        positiveScore++;
      } else if (this.negativeWords.has(token)) {
        negativeScore++;
      }
    }
    
    const totalScore = positiveScore + negativeScore;
    if (totalScore === 0) {
      return { sentiment: 'neutral', score: 0 };
    }
    
    const score = (positiveScore - negativeScore) / totalScore;
    let sentiment;
    
    if (score > 0.1) {
      sentiment = 'positive';
    } else if (score < -0.1) {
      sentiment = 'negative';
    } else {
      sentiment = 'neutral';
    }
    
    return { sentiment, score, positiveScore, negativeScore };
  }
}
\`\`\`

## Best Practices

1. **Preprocess Text**: Always clean and normalize text before analysis
2. **Remove Stop Words**: Filter out common words that don't add meaning
3. **Use Appropriate Metrics**: Choose the right similarity measures for your use case
4. **Validate Results**: Always validate your analysis results
5. **Consider Context**: Take into account the context and domain of your text

## Common Pitfalls

- **Overfitting**: Creating models that work too well on training data
- **Bias**: Not accounting for bias in your data or algorithms
- **Performance**: Inefficient algorithms for large datasets
- **Accuracy**: Not validating the accuracy of your analysis
- **Scalability**: Not considering scalability for production use

## Conclusion

Text analysis and NLP are powerful tools for extracting insights from text data. By understanding the basic techniques and implementing them properly, you can create more intelligent applications that can understand and process text effectively. Remember to preprocess your text, choose appropriate algorithms, and validate your results.`,
      category: 'best-practices',
      author: 'SecureTools Team',
      date: '2025-09-07',
      readTime: '13 min read',
      tags: ['Incident Response', 'Security Management', 'Recovery', 'Best Practices'],
      featured: false
    },
    {
      id: 11,
      title: 'Security Headers: Protecting Your Web Applications',
      excerpt: 'Learn about essential security headers like HSTS, CSP, and X-Frame-Options to protect your web applications from common attacks.',
      content: `Security headers are HTTP response headers that help protect web applications from various attacks. This comprehensive guide covers the most important security headers and how to implement them effectively.

## What are Security Headers?

Security headers are HTTP response headers that provide instructions to browsers on how to handle web content securely. They help protect against common web vulnerabilities like XSS, clickjacking, and man-in-the-middle attacks.

### Why Security Headers Matter
- **Attack Prevention**: Protect against common web vulnerabilities
- **Browser Security**: Instruct browsers on secure behavior
- **Compliance**: Meet security standards and regulations
- **User Protection**: Keep users safe from malicious content
- **SEO Benefits**: Some search engines consider security headers

## Essential Security Headers

### 1. Content Security Policy (CSP)
Prevents Cross-Site Scripting (XSS) attacks by controlling which resources can be loaded.

\`\`\`javascript
// Strict CSP policy
const cspPolicy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';";

// Set CSP header
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', cspPolicy);
  next();
});
\`\`\`

### 2. HTTP Strict Transport Security (HSTS)
Forces browsers to use HTTPS connections.

\`\`\`javascript
// HSTS header
const hstsHeader = "max-age=31536000; includeSubDomains; preload";

app.use((req, res, next) => {
  if (req.secure) {
    res.setHeader('Strict-Transport-Security', hstsHeader);
  }
  next();
});
\`\`\`

### 3. X-Frame-Options
Prevents clickjacking attacks by controlling iframe embedding.

\`\`\`javascript
// Prevent framing
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// Allow same-origin framing
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});
\`\`\`

### 4. X-Content-Type-Options
Prevents MIME type sniffing attacks.

\`\`\`javascript
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});
\`\`\`

### 5. Referrer-Policy
Controls how much referrer information is sent with requests.

\`\`\`javascript
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
\`\`\`

## Advanced Security Headers

### 1. Permissions-Policy
Controls browser features and APIs.

\`\`\`javascript
const permissionsPolicy = "camera=(), microphone=(), geolocation=(), payment=()";

app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', permissionsPolicy);
  next();
});
\`\`\`

### 2. Cross-Origin Policies
Control cross-origin resource sharing.

\`\`\`javascript
// CORS configuration
const corsOptions = {
  origin: ['https://yourdomain.com', 'https://app.yourdomain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
\`\`\`

## Security Header Implementation

### 1. Express.js Middleware
\`\`\`javascript
class SecurityHeaders {
  static middleware() {
    return (req, res, next) => {
      // CSP
      res.setHeader('Content-Security-Policy', 
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
      );
      
      // HSTS
      if (req.secure) {
        res.setHeader('Strict-Transport-Security', 
          'max-age=31536000; includeSubDomains; preload'
        );
      }
      
      // X-Frame-Options
      res.setHeader('X-Frame-Options', 'DENY');
      
      // X-Content-Type-Options
      res.setHeader('X-Content-Type-Options', 'nosniff');
      
      // Referrer-Policy
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      
      // Permissions-Policy
      res.setHeader('Permissions-Policy', 
        'camera=(), microphone=(), geolocation=(), payment=()'
      );
      
      next();
    };
  }
}
\`\`\`

### 2. Nginx Configuration
\`\`\`nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
}
\`\`\`

### 3. Apache Configuration
\`\`\`apache
<VirtualHost *:443>
    ServerName yourdomain.com
    
    # Security headers
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    Header always set X-Frame-Options "DENY"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"
</VirtualHost>
\`\`\`

## Security Header Testing

### 1. Automated Testing
\`\`\`javascript
class SecurityHeaderTester {
  async testHeaders(url) {
    const response = await fetch(url);
    const headers = response.headers;
    
    const tests = [
      { name: 'HSTS', header: 'strict-transport-security', required: true },
      { name: 'CSP', header: 'content-security-policy', required: true },
      { name: 'X-Frame-Options', header: 'x-frame-options', required: true },
      { name: 'X-Content-Type-Options', header: 'x-content-type-options', required: true },
      { name: 'Referrer-Policy', header: 'referrer-policy', required: true }
    ];
    
    const results = tests.map(test => ({
      name: test.name,
      present: headers.has(test.header),
      value: headers.get(test.header),
      status: headers.has(test.header) ? 'PASS' : 'FAIL'
    }));
    
    return results;
  }
}
\`\`\`

### 2. Security Score Calculation
\`\`\`javascript
class SecurityScoreCalculator {
  calculateScore(headers) {
    const weights = {
      'strict-transport-security': 20,
      'content-security-policy': 25,
      'x-frame-options': 15,
      'x-content-type-options': 10,
      'referrer-policy': 10,
      'permissions-policy': 10,
      'x-xss-protection': 5,
      'expect-ct': 5
    };
    
    let score = 0;
    let totalWeight = 0;
    
    for (const [header, weight] of Object.entries(weights)) {
      totalWeight += weight;
      if (headers.has(header)) {
        score += weight;
      }
    }
    
    return Math.round((score / totalWeight) * 100);
  }
}
\`\`\`

## Common Security Header Mistakes

### 1. Misconfiguration
- Too restrictive CSP policies
- Missing HSTS on HTTPS sites
- Incorrect CORS settings
- Overly permissive permissions

### 2. Implementation Issues
- Not testing header effectiveness
- Missing headers on some pages
- Inconsistent header values
- Not updating headers regularly

### 3. Performance Impact
- Large CSP policies
- Too many security checks
- Inefficient header processing
- Not caching header decisions

## Conclusion

Security headers are essential for protecting web applications from common attacks. By implementing the right combination of headers, testing their effectiveness, and maintaining them properly, you can significantly improve your application's security posture. Remember to start with the essential headers, test thoroughly, and gradually add more advanced protections as needed.`,
      category: 'headers',
      author: 'SecureTools Team',
      date: '2025-09-07',
      readTime: '8 min read',
      tags: ['Security Headers', 'Web Security', 'CSP', 'HSTS'],
      featured: false
    },
    {
      id: 10,
      title: 'Secure Coding: Defensive Programming Techniques',
      excerpt: 'Learn defensive programming techniques, input validation, error handling, and secure coding practices to build robust applications.',
      content: `Secure coding is the foundation of application security. This comprehensive guide covers defensive programming techniques, input validation, error handling, and secure coding practices that every developer should master.

## What is Secure Coding?

Secure coding is the practice of writing code that is resistant to vulnerabilities and attacks. It involves implementing security measures throughout the development process, not just as an afterthought.

### Why Secure Coding Matters
- **Prevents Vulnerabilities**: Stops security issues before they occur
- **Reduces Attack Surface**: Minimizes potential entry points for attackers
- **Saves Time and Money**: Fixing issues early is much cheaper than fixing them in production
- **Builds Trust**: Users trust applications that are built with security in mind
- **Compliance**: Meets security standards and regulatory requirements

## Defensive Programming Principles

### 1. Input Validation
Always validate and sanitize all input data.

\`\`\`javascript
class InputValidator {
  constructor() {
    this.patterns = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      phone: /^\+?[\d\s\-\(\)]+$/,
      alphanumeric: /^[a-zA-Z0-9]+$/,
      url: /^https?:\/\/.+/,
      uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    };
  }

  validateEmail(email) {
    if (!email || typeof email !== 'string') {
      throw new Error('Email is required and must be a string');
    }
    
    const trimmed = email.trim();
    if (trimmed.length === 0) {
      throw new Error('Email cannot be empty');
    }
    
    if (trimmed.length > 254) {
      throw new Error('Email is too long');
    }
    
    if (!this.patterns.email.test(trimmed)) {
      throw new Error('Invalid email format');
    }
    
    return trimmed.toLowerCase();
  }

  sanitizeString(input) {
    if (typeof input !== 'string') {
      return '';
    }
    
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .substring(0, 1000); // Limit length
  }
}
\`\`\`

### 2. Error Handling
Implement proper error handling without exposing sensitive information.

\`\`\`javascript
class SecureErrorHandler {
  constructor() {
    this.logger = new ErrorLogger();
  }

  handleError(error, context = {}) {
    // Log the error securely
    this.logger.logError(error, context);
    
    // Don't expose internal details to users
    if (error instanceof ValidationError) {
      return {
        success: false,
        message: error.message,
        code: 'VALIDATION_ERROR'
      };
    }
    
    // Generic error for unexpected issues
    return {
      success: false,
      message: 'An error occurred. Please try again.',
      code: 'INTERNAL_ERROR'
    };
  }
}
\`\`\`

### 3. SQL Injection Prevention
Use parameterized queries and proper escaping.

\`\`\`javascript
class SecureDatabase {
  constructor(connection) {
    this.connection = connection;
  }

  async safeQuery(query, params = []) {
    try {
      // Validate query structure
      this.validateQuery(query);
      
      // Validate parameters
      this.validateParams(params);
      
      // Execute with parameterized query
      const result = await this.connection.query(query, params);
      return result;
    } catch (error) {
      throw new DatabaseError('Query execution failed', error);
    }
  }

  containsSQLInjection(value) {
    const sqlPatterns = [
      /('|(\\')|(;)|(\\;)|(--)|(\\/\\*)|(\\*\\/))/i,
      /(union\s+select)/i,
      /(or\s+1\s*=\s*1)/i,
      /(and\s+1\s*=\s*1)/i
    ];
    
    return sqlPatterns.some(pattern => pattern.test(value));
  }
}
\`\`\`

## Secure Coding Best Practices

### 1. Authentication and Authorization
\`\`\`javascript
class SecureAuth {
  constructor() {
    this.sessions = new Map();
    this.maxLoginAttempts = 5;
    this.lockoutDuration = 15 * 60 * 1000; // 15 minutes
  }

  async authenticateUser(username, password) {
    // Rate limiting
    if (this.isAccountLocked(username)) {
      throw new AuthenticationError('Account is temporarily locked');
    }

    // Validate input
    if (!username || !password) {
      throw new ValidationError('Username and password are required');
    }

    try {
      // Get user from database
      const user = await this.getUserByUsername(username);
      if (!user) {
        this.recordFailedAttempt(username);
        throw new AuthenticationError('Invalid credentials');
      }

      // Verify password
      const isValidPassword = await this.verifyPassword(password, user.passwordHash);
      if (!isValidPassword) {
        this.recordFailedAttempt(username);
        throw new AuthenticationError('Invalid credentials');
      }

      // Reset failed attempts on successful login
      this.resetFailedAttempts(username);

      // Generate secure session
      const session = await this.createSession(user.id);
      
      return {
        success: true,
        sessionId: session.id,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      };
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw error;
      }
      throw new Error('Authentication failed');
    }
  }
}
\`\`\`

### 2. Data Encryption
\`\`\`javascript
class SecureDataHandler {
  constructor() {
    this.algorithm = 'AES-256-GCM';
    this.keyLength = 256;
  }

  async encryptSensitiveData(data, key) {
    try {
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encodedData = new TextEncoder().encode(JSON.stringify(data));
      
      const encryptedData = await crypto.subtle.encrypt(
        {
          name: this.algorithm,
          iv: iv
        },
        key,
        encodedData
      );

      return {
        data: new Uint8Array(encryptedData),
        iv: iv,
        algorithm: this.algorithm
      };
    } catch (error) {
      throw new Error('Encryption failed');
    }
  }
}
\`\`\`

## Common Secure Coding Mistakes

### 1. Input Validation Issues
- Not validating all input
- Trusting client-side validation only
- Not sanitizing output
- Using weak validation patterns

### 2. Authentication Problems
- Storing passwords in plain text
- Using weak password policies
- Not implementing proper session management
- Not handling failed login attempts

### 3. Authorization Failures
- Not checking permissions on every request
- Relying on client-side authorization
- Not implementing proper role-based access control
- Exposing sensitive data in error messages

## Conclusion

Secure coding is essential for building robust and trustworthy applications. By implementing defensive programming techniques, proper input validation, secure error handling, and following security best practices, you can significantly reduce the risk of vulnerabilities and attacks. Remember that security is not a one-time implementation but an ongoing process that requires continuous attention and improvement.`,
      category: 'best-practices',
      author: 'SecureTools Team',
      date: '2025-09-07',
      readTime: '14 min read',
      tags: ['Secure Coding', 'Defensive Programming', 'Input Validation', 'Best Practices'],
      featured: false
    },
    {
      id: 12,
      title: 'Security Monitoring: Real-time Threat Detection and Response',
      excerpt: 'Learn how to implement comprehensive security monitoring, threat detection, and incident response systems for your applications.',
      content: `Security monitoring is essential for maintaining the security posture of your applications and infrastructure. This comprehensive guide covers real-time threat detection, security monitoring best practices, and incident response strategies.

## What is Security Monitoring?

Security monitoring is the continuous process of collecting, analyzing, and responding to security events and threats in real-time. It involves monitoring various aspects of your system to detect potential security incidents before they cause significant damage.

### Why Security Monitoring Matters
- **Early Detection**: Identify threats before they escalate
- **Rapid Response**: Quick incident response and mitigation
- **Compliance**: Meet regulatory requirements for security monitoring
- **Risk Reduction**: Minimize the impact of security incidents
- **Continuous Improvement**: Learn from security events to improve defenses

## Types of Security Monitoring

### 1. Network Security Monitoring
Monitor network traffic for suspicious activities and potential threats.

\`\`\`javascript
class NetworkSecurityMonitor {
  constructor() {
    this.suspiciousPatterns = [
      /port.*scan/i,
      /brute.*force/i,
      /ddos.*attack/i,
      /malware.*detected/i
    ];
    this.alertThresholds = {
      failedLogins: 5,
      portScans: 3,
      suspiciousConnections: 10
    };
  }

  analyzeTraffic(trafficData) {
    const alerts = [];
    
    for (const event of trafficData) {
      // Check for suspicious patterns
      if (this.isSuspiciousEvent(event)) {
        alerts.push({
          type: 'suspicious_activity',
          severity: 'high',
          timestamp: event.timestamp,
          source: event.source,
          description: event.description
        });
      }
      
      // Check for brute force attempts
      if (this.isBruteForceAttempt(event)) {
        alerts.push({
          type: 'brute_force',
          severity: 'critical',
          timestamp: event.timestamp,
          source: event.source,
          description: 'Multiple failed login attempts detected'
        });
      }
    }
    
    return alerts;
  }

  isSuspiciousEvent(event) {
    return this.suspiciousPatterns.some(pattern => 
      pattern.test(event.description || '')
    );
  }

  isBruteForceAttempt(event) {
    return event.type === 'login_failure' && 
           event.attempts > this.alertThresholds.failedLogins;
  }
}
\`\`\`

### 2. Application Security Monitoring
Monitor application-level security events and vulnerabilities.

\`\`\`javascript
class ApplicationSecurityMonitor {
  constructor() {
    this.vulnerabilityScanners = [];
    this.securityEvents = [];
  }

  async scanForVulnerabilities(application) {
    const vulnerabilities = [];
    
    // SQL Injection detection
    const sqlInjectionVulns = await this.scanForSQLInjection(application);
    vulnerabilities.push(...sqlInjectionVulns);
    
    // XSS detection
    const xssVulns = await this.scanForXSS(application);
    vulnerabilities.push(...xssVulns);
    
    // Authentication bypass detection
    const authBypassVulns = await this.scanForAuthBypass(application);
    vulnerabilities.push(...authBypassVulns);
    
    return vulnerabilities;
  }

  async scanForSQLInjection(application) {
    const testPayloads = [
      "' OR '1'='1",
      "'; DROP TABLE users; --",
      "1' UNION SELECT * FROM users --"
    ];
    
    const vulnerabilities = [];
    
    for (const payload of testPayloads) {
      const response = await this.testPayload(application, payload);
      if (this.isSQLInjectionVulnerable(response)) {
        vulnerabilities.push({
          type: 'sql_injection',
          severity: 'critical',
          payload: payload,
          endpoint: response.endpoint,
          description: 'SQL injection vulnerability detected'
        });
      }
    }
    
    return vulnerabilities;
  }

  async scanForXSS(application) {
    const testPayloads = [
      "<script>alert('XSS')</script>",
      "javascript:alert('XSS')",
      "<img src=x onerror=alert('XSS')>"
    ];
    
    const vulnerabilities = [];
    
    for (const payload of testPayloads) {
      const response = await this.testPayload(application, payload);
      if (this.isXSSVulnerable(response)) {
        vulnerabilities.push({
          type: 'xss',
          severity: 'high',
          payload: payload,
          endpoint: response.endpoint,
          description: 'Cross-site scripting vulnerability detected'
        });
      }
    }
    
    return vulnerabilities;
  }
}
\`\`\`

## Security Monitoring Tools

### 1. Log Analysis
Analyze application and system logs for security events.

\`\`\`javascript
class SecurityLogAnalyzer {
  constructor() {
    this.logPatterns = {
      failedLogin: /Failed login attempt for user: (\w+)/,
      privilegeEscalation: /User (\w+) attempted privilege escalation/,
      suspiciousFileAccess: /Access denied to file: (.+)/,
      networkIntrusion: /Suspicious network activity from IP: ([\d.]+)/
    };
  }

  analyzeLogs(logs) {
    const securityEvents = [];
    
    for (const log of logs) {
      for (const [eventType, pattern] of Object.entries(this.logPatterns)) {
        const match = log.message.match(pattern);
        if (match) {
          securityEvents.push({
            type: eventType,
            timestamp: log.timestamp,
            severity: this.getSeverity(eventType),
            details: match[1],
            rawLog: log.message
          });
        }
      }
    }
    
    return securityEvents;
  }

  getSeverity(eventType) {
    const severityMap = {
      failedLogin: 'medium',
      privilegeEscalation: 'high',
      suspiciousFileAccess: 'medium',
      networkIntrusion: 'critical'
    };
    
    return severityMap[eventType] || 'low';
  }
}
\`\`\`

### 2. Real-time Alerting
Implement real-time alerting for critical security events.

\`\`\`javascript
class SecurityAlerting {
  constructor() {
    this.alertChannels = [];
    this.alertRules = [];
  }

  addAlertChannel(channel) {
    this.alertChannels.push(channel);
  }

  addAlertRule(rule) {
    this.alertRules.push(rule);
  }

  async processSecurityEvent(event) {
    for (const rule of this.alertRules) {
      if (rule.matches(event)) {
        await this.sendAlert(event, rule);
      }
    }
  }

  async sendAlert(event, rule) {
    const alert = {
      id: this.generateAlertId(),
      timestamp: new Date(),
      severity: event.severity,
      type: event.type,
      description: rule.description,
      event: event
    };

    for (const channel of this.alertChannels) {
      try {
        await channel.send(alert);
      } catch (error) {
        console.error('Failed to send alert:', error);
      }
    }
  }

  generateAlertId() {
    return 'alert_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
\`\`\`

## Security Monitoring Best Practices

### 1. Comprehensive Coverage
Monitor all critical components and entry points.

\`\`\`javascript
class ComprehensiveSecurityMonitor {
  constructor() {
    this.monitors = {
      network: new NetworkSecurityMonitor(),
      application: new ApplicationSecurityMonitor(),
      logs: new SecurityLogAnalyzer(),
      alerts: new SecurityAlerting()
    };
  }

  async startMonitoring() {
    // Start network monitoring
    await this.monitors.network.start();
    
    // Start application monitoring
    await this.monitors.application.start();
    
    // Start log analysis
    await this.monitors.logs.start();
    
    // Configure alerting
    this.setupAlerting();
  }

  setupAlerting() {
    // Add alert channels
    this.monitors.alerts.addAlertChannel(new EmailAlertChannel());
    this.monitors.alerts.addAlertChannel(new SlackAlertChannel());
    
    // Add alert rules
    this.monitors.alerts.addAlertRule({
      matches: (event) => event.severity === 'critical',
      description: 'Critical security event detected'
    });
    
    this.monitors.alerts.addAlertRule({
      matches: (event) => event.type === 'brute_force',
      description: 'Brute force attack detected'
    });
  }
}
\`\`\`

### 2. Incident Response
Implement automated incident response procedures.

\`\`\`javascript
class SecurityIncidentResponse {
  constructor() {
    this.responseProcedures = new Map();
    this.automatedActions = new Map();
  }

  addResponseProcedure(incidentType, procedure) {
    this.responseProcedures.set(incidentType, procedure);
  }

  addAutomatedAction(condition, action) {
    this.automatedActions.set(condition, action);
  }

  async handleSecurityIncident(incident) {
    // Execute automated actions
    for (const [condition, action] of this.automatedActions) {
      if (condition(incident)) {
        await action(incident);
      }
    }

    // Execute response procedure
    const procedure = this.responseProcedures.get(incident.type);
    if (procedure) {
      await procedure(incident);
    }
  }

  async blockSuspiciousIP(ip) {
    // Block IP in firewall
    await this.firewall.blockIP(ip);
    
    // Log the action
    console.log('Blocked suspicious IP: ' + ip);
  }

  async isolateCompromisedSystem(systemId) {
    // Isolate system from network
    await this.network.isolateSystem(systemId);
    
    // Notify security team
    await this.notifySecurityTeam(systemId);
  }
}
\`\`\`

## Conclusion

Security monitoring is a critical component of any comprehensive security strategy. By implementing proper monitoring tools, real-time alerting, and incident response procedures, you can significantly improve your ability to detect, respond to, and mitigate security threats. Remember to continuously update your monitoring rules and procedures based on new threats and lessons learned from security incidents.`,
      category: 'monitoring',
      author: 'SecureTools Team',
      date: '2025-09-07',
      readTime: '12 min read',
      tags: ['Security Monitoring', 'Threat Detection', 'Incident Response', 'Real-time Alerts'],
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', icon: Shield },
    { id: 'passwords', name: 'Password Security', icon: Key },
    { id: 'encryption', name: 'Encryption', icon: Lock },
    { id: '2fa', name: 'Two-Factor Auth', icon: Eye },
    { id: 'headers', name: 'Security Headers', icon: AlertTriangle },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'best-practices', name: 'Best Practices', icon: CheckCircle },
    { id: 'monitoring', name: 'Security Monitoring', icon: AlertTriangle }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <ToolLayout>
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3 sm:mb-4">
              SecureTools Blog
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Learn from our collection of security tips, tutorials, and best practices. Covering password security, encryption, two-factor authentication, and more to help you build secure applications.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">

        {/* Featured Posts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <article key={post.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-medium">{post.tags[0]}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedPost(post)}
                      className="text-primary hover:text-primary/80 flex items-center gap-1"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-foreground border-border hover:bg-secondary'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {selectedCategory === 'all' ? 'All Posts' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-medium">{post.tags[0]}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedPost(post)}
                      className="text-primary hover:text-primary/80 flex items-center gap-1"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Blog Post Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">{selectedPost.tags[0]}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{selectedPost.readTime}</span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <h1 className="text-3xl font-bold text-foreground mb-4">{selectedPost.title}</h1>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {selectedPost.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedPost.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <div 
                    className="whitespace-pre-wrap text-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: selectedPost.content
                        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto"><code class="text-sm">$2</code></pre>')
                        .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
                        .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-4 text-foreground">$1</h2>')
                        .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mt-6 mb-3 text-foreground">$1</h3>')
                        .replace(/^#### (.*$)/gm, '<h4 class="text-lg font-medium mt-4 mb-2 text-foreground">$1</h4>')
                        .replace(/^\- (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
                        .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                        .replace(/\n\n/g, '</p><p class="mb-4">')
                        .replace(/^(?!<[h|l])/gm, '<p class="mb-4">')
                        .replace(/<p class="mb-4"><\/p>/g, '')
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};
