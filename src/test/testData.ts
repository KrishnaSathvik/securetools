/**
 * Test Data for Security Tools
 * 
 * Contains mock data and test cases for various security tools
 */

export const securityTestData = {
  passwords: {
    weak: '123456',
    medium: 'Password123',
    strong: 'K9#mP2$vL8@nQ4!',
    veryStrong: 'Tr0ub4dor&3!',
    common: 'password',
    short: 'abc',
    long: 'ThisIsAVeryLongPasswordThatShouldBeStrong123!@#'
  },
  
  encryption: {
    plaintext: 'Hello, World! This is a test message.',
    password: 'test-password-123',
    salt: 'test-salt-456',
    iterations: 100000,
    algorithm: 'AES-GCM',
    keyLength: 256
  },
  
  totp: {
    secret: 'JBSWY3DPEHPK3PXP',
    issuer: 'SecureTools',
    account: 'test@example.com',
    algorithm: 'SHA1',
    digits: 6,
    period: 30
  },
  
  randomData: {
    lengths: [8, 16, 32, 64, 128],
    types: ['string', 'bytes', 'uuid', 'token'],
    formats: ['hex', 'base64', 'base32', 'alphanumeric']
  },
  
  securityHeaders: {
    good: {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': "default-src 'self'"
    },
    bad: {
      'X-Content-Type-Options': 'nosniff'
    },
    missing: {}
  },
  
  urls: {
    valid: [
      'https://www.example.com',
      'https://secure.example.com',
      'https://api.example.com/v1',
      'https://www.google.com'
    ],
    invalid: [
      'not-a-url',
      'ftp://insecure.com',
      'http://unsecure.com',
      'javascript:alert(1)'
    ]
  },
  
  textSamples: {
    short: 'Hello',
    medium: 'This is a medium length text sample for testing purposes.',
    long: 'This is a very long text sample that contains multiple sentences and paragraphs. It is designed to test the performance and functionality of various text processing tools. The text includes various characters, numbers, and symbols to ensure comprehensive testing coverage.',
    specialChars: 'Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?',
    unicode: 'Unicode: 你好世界 🌍 émojis 🚀',
    multiline: 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5'
  }
};

export const testCases = {
  passwordGeneration: {
    lengths: [8, 12, 16, 20, 24],
    characterSets: [
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      'abcdefghijklmnopqrstuvwxyz',
      '0123456789',
      '!@#$%^&*()_+-=[]{}|;:,.<>?'
    ],
    combinations: [
      'uppercase+lowercase',
      'uppercase+lowercase+numbers',
      'uppercase+lowercase+numbers+symbols',
      'all'
    ]
  },
  
  encryption: {
    algorithms: ['AES-256-GCM', 'AES-128-GCM', 'AES-256-CBC'],
    modes: ['GCM', 'CBC', 'CTR'],
    keyLengths: [128, 192, 256]
  },
  
  hashing: {
    algorithms: ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512', 'MD5'],
    inputs: [
      'hello',
      'Hello, World!',
      'The quick brown fox jumps over the lazy dog',
      '1234567890'
    ]
  }
};

export const expectedResults = {
  passwordStrength: {
    weak: { score: 0, strength: 'Very Weak', entropy: 0 },
    medium: { score: 40, strength: 'Medium', entropy: 30 },
    strong: { score: 80, strength: 'Strong', entropy: 60 },
    veryStrong: { score: 100, strength: 'Very Strong', entropy: 90 }
  },
  
  encryption: {
    success: { success: true, data: 'encrypted_data', iv: 'initialization_vector' },
    failure: { success: false, error: 'Encryption failed' }
  },
  
  securityHeaders: {
    excellent: { score: 100, grade: 'A+', missing: [] },
    good: { score: 80, grade: 'B', missing: ['CSP'] },
    poor: { score: 40, grade: 'D', missing: ['HSTS', 'CSP', 'X-Frame-Options'] }
  }
};
