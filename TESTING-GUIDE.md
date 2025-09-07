# Testing Guide for SecureTools

This guide covers testing setup and best practices for the SecureTools security-focused tool collection application.

## Overview

SecureTools is a React-based security tool application with multiple tools including password generator, text encryptor, security headers checker, two-factor authentication generator, random data generator, and password strength analyzer. This testing guide provides comprehensive coverage for all security components and utilities.

## What's Included

- **Vitest**: Fast unit testing framework optimized for Vite
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers for DOM assertions
- **@testing-library/user-event**: User interaction simulation
- **jsdom**: DOM environment for testing
- **@vitest/coverage-v8**: Code coverage reporting

## Configuration Files

- `vitest.config.ts` - Vitest configuration with React and TypeScript support
- `src/test/setup.ts` - Test setup, mocks, and global configurations
- `src/test/utils.tsx` - Custom testing utilities and render helpers

## Project Structure

```
src/
├── components/
│   ├── __tests__/
│   │   ├── Navigation.test.tsx
│   │   ├── ThemeToggle.test.tsx
│   │   └── ui/
│   │       ├── Button.test.tsx
│   │       ├── TextArea.test.tsx
│   │       └── CopyButton.test.tsx
│   └── ...
├── pages/
│   ├── __tests__/
│   │   ├── Index.test.tsx
│   │   ├── About.test.tsx
│   │   ├── Blog.test.tsx
│   │   └── tools/
│   │       ├── PasswordGenerator.test.tsx
│   │       ├── TextEncryptor.test.tsx
│   │       ├── SecurityHeadersChecker.test.tsx
│   │       ├── TwoFactorAuth.test.tsx
│   │       ├── RandomDataGenerator.test.tsx
│   │       └── PasswordStrengthAnalyzer.test.tsx
│   └── ...
├── lib/
│   ├── __tests__/
│   │   ├── utils.test.ts
│   │   ├── analytics.test.ts
│   │   └── text/
│   │       ├── case.test.ts
│   │       ├── counters.test.ts
│   │       └── cleanup.test.ts
│   └── ...
├── hooks/
│   ├── __tests__/
│   │   ├── useSEO.test.tsx
│   │   ├── useAnalytics.test.tsx
│   │   └── use-mobile.test.tsx
│   └── ...
└── test/
    ├── setup.ts
    ├── utils.tsx
    └── testData.ts
```

## Running Tests

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch",
    "test:security": "vitest run --reporter=verbose --coverage src/pages/tools/",
    "test:crypto": "vitest run --reporter=verbose src/lib/__tests__/crypto.test.ts"
  }
}
```

### Commands

- `npm run test` - Run tests in watch mode (default)
- `npm run test:run` - Run tests once and exit
- `npm run test:ui` - Run with Vitest UI (requires `@vitest/ui`)
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:watch` - Run tests in watch mode (explicit)
- `npm run test:security` - Run security tool tests with verbose output
- `npm run test:crypto` - Run cryptographic function tests

## Writing Tests

### Security Tool Testing

Tests are located in `__tests__` folders next to the components they test. Use this pattern:

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PasswordGenerator } from '../PasswordGenerator'

// Mock crypto for testing
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: vi.fn((arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256)
      }
      return arr
    })
  }
})

describe('PasswordGenerator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly with initial state', () => {
    render(<PasswordGenerator />)
    expect(screen.getByText('Password Generator')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('generates secure password with default settings', async () => {
    const user = userEvent.setup()
    render(<PasswordGenerator />)
    
    const generateButton = screen.getByText('Generate Password')
    await user.click(generateButton)
    
    await waitFor(() => {
      const passwordInput = screen.getByDisplayValue(/[A-Za-z0-9!@#$%^&*()_+\-=\[\]{}|;:,.<>?]+/)
      expect(passwordInput).toBeInTheDocument()
    })
  })

  it('validates password strength correctly', async () => {
    const user = userEvent.setup()
    render(<PasswordGenerator />)
    
    const lengthSlider = screen.getByRole('slider')
    await user.type(lengthSlider, '8')
    
    const generateButton = screen.getByText('Generate Password')
    await user.click(generateButton)
    
    await waitFor(() => {
      expect(screen.getByText(/Strength:/)).toBeInTheDocument()
    })
  })
})
```

### Cryptographic Function Testing

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { encryptText, decryptText, generateSecurePassword } from '../crypto'

// Mock Web Crypto API
const mockEncrypt = vi.fn()
const mockDecrypt = vi.fn()
const mockGenerateKey = vi.fn()

Object.defineProperty(global, 'crypto', {
  value: {
    subtle: {
      encrypt: mockEncrypt,
      decrypt: mockDecrypt,
      generateKey: mockGenerateKey,
      importKey: vi.fn(),
      deriveKey: vi.fn()
    },
    getRandomValues: vi.fn((arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256)
      }
      return arr
    })
  }
})

describe('Cryptographic Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('encrypts text with AES-256-GCM', async () => {
    const plaintext = 'Hello, World!'
    const password = 'test-password'
    
    mockEncrypt.mockResolvedValue(new ArrayBuffer(32))
    
    const result = await encryptText(plaintext, password)
    
    expect(result).toBeDefined()
    expect(result.data).toBeInstanceOf(Uint8Array)
    expect(result.iv).toBeInstanceOf(Uint8Array)
  })

  it('generates secure random passwords', () => {
    const password = generateSecurePassword(16, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
    
    expect(password).toHaveLength(16)
    expect(password).toMatch(/[A-Za-z0-9]+/)
  })

  it('validates password entropy calculation', () => {
    const entropy = calculateEntropy(16, 62) // 16 chars, 62 possible characters
    
    expect(entropy).toBeGreaterThan(90) // Should be around 95.27 bits
  })
})
```

### Security Tool Integration Testing

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { SecurityHeadersChecker } from '../SecurityHeadersChecker'

// Mock fetch for API calls
global.fetch = vi.fn()

describe('SecurityHeadersChecker', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('checks security headers for a given URL', async () => {
    const user = userEvent.setup()
    
    // Mock successful response with security headers
    const mockResponse = {
      headers: {
        'strict-transport-security': 'max-age=31536000',
        'content-security-policy': "default-src 'self'",
        'x-frame-options': 'DENY',
        'x-content-type-options': 'nosniff'
      }
    }
    
    fetch.mockResolvedValueOnce({
      ok: true,
      headers: new Map(Object.entries(mockResponse.headers))
    })
    
    render(<SecurityHeadersChecker />)
    
    const urlInput = screen.getByPlaceholderText('Enter website URL')
    const checkButton = screen.getByText('Check Headers')
    
    await user.type(urlInput, 'https://example.com')
    await user.click(checkButton)
    
    await waitFor(() => {
      expect(screen.getByText('Security Score:')).toBeInTheDocument()
      expect(screen.getByText('HSTS')).toBeInTheDocument()
      expect(screen.getByText('CSP')).toBeInTheDocument()
    })
  })

  it('handles network errors gracefully', async () => {
    const user = userEvent.setup()
    
    fetch.mockRejectedValueOnce(new Error('Network error'))
    
    render(<SecurityHeadersChecker />)
    
    const urlInput = screen.getByPlaceholderText('Enter website URL')
    const checkButton = screen.getByText('Check Headers')
    
    await user.type(urlInput, 'https://invalid-url.com')
    await user.click(checkButton)
    
    await waitFor(() => {
      expect(screen.getByText(/Error checking headers/)).toBeInTheDocument()
    })
  })
})
```

## Testing Patterns

### 1. Security Tools

Each security tool should be tested for:
- Initial render state
- Input validation and sanitization
- Cryptographic operations
- Security information display
- Error handling for invalid inputs
- Copy/download functionality
- Responsive behavior
- Security alerts and warnings

### 2. Cryptographic Functions

Test cryptographic functions for:
- Encryption/decryption operations
- Key generation and derivation
- Random number generation
- Hash functions
- Security of generated data
- Error handling for invalid inputs

### 3. Security Headers

Test security header functionality for:
- Header detection and parsing
- Security score calculation
- Missing header identification
- Recommendations generation
- Network error handling

### 4. Two-Factor Authentication

Test 2FA functionality for:
- TOTP secret generation
- QR code generation
- Time-based code validation
- Backup codes generation
- Security best practices display

## Mocks and Setup

Common mocks are set up in `src/test/setup.ts`:

```tsx
// Web Crypto API mock
Object.defineProperty(global, 'crypto', {
  value: {
    subtle: {
      encrypt: vi.fn(),
      decrypt: vi.fn(),
      generateKey: vi.fn(),
      importKey: vi.fn(),
      deriveKey: vi.fn(),
      digest: vi.fn()
    },
    getRandomValues: vi.fn((arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256)
      }
      return arr
    }),
    randomUUID: vi.fn(() => 'mock-uuid-1234')
  }
})

// MatchMedia mock for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// LocalStorage mock
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
})

// Clipboard API mock
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn(),
    readText: vi.fn(),
  },
  writable: true,
})

// Fetch mock for security header checks
global.fetch = vi.fn()

// QR Code library mock
vi.mock('qrcode.react', () => ({
  QRCodeSVG: vi.fn(() => 'Mock QR Code')
}))
```

## Test Data

Create test data files for consistent security testing:

```tsx
// src/test/testData.ts
export const securityTestData = {
  passwords: {
    weak: '123456',
    medium: 'Password123',
    strong: 'K9#mP2$vL8@nQ4!',
    veryStrong: 'Tr0ub4dor&3!'
  },
  encryption: {
    plaintext: 'Hello, Secure World!',
    password: 'test-password-123',
    expectedLength: 32
  },
  urls: {
    secure: 'https://example.com',
    insecure: 'http://example.com',
    invalid: 'not-a-url'
  },
  securityHeaders: {
    good: {
      'strict-transport-security': 'max-age=31536000',
      'content-security-policy': "default-src 'self'",
      'x-frame-options': 'DENY',
      'x-content-type-options': 'nosniff'
    },
    missing: {
      'content-type': 'text/html'
    }
  },
  totp: {
    secret: 'JBSWY3DPEHPK3PXP',
    expectedCode: '123456'
  }
}

export const securityTestCases = {
  passwordStrength: [
    { password: '123456', expected: 'Very Weak' },
    { password: 'Password123', expected: 'Medium' },
    { password: 'K9#mP2$vL8@nQ4!', expected: 'Very Strong' }
  ],
  encryptionAlgorithms: ['AES-256-GCM', 'AES-128-GCM', 'ChaCha20-Poly1305'],
  securityHeaders: ['HSTS', 'CSP', 'X-Frame-Options', 'X-Content-Type-Options']
}
```

## Security-Specific Testing

### 1. Cryptographic Security

```tsx
describe('Cryptographic Security', () => {
  it('generates cryptographically secure random data', () => {
    const randomData = generateSecureRandom(32)
    expect(randomData).toHaveLength(32)
    
    // Check for randomness (basic test)
    const uniqueValues = new Set(randomData)
    expect(uniqueValues.size).toBeGreaterThan(16) // Should have good distribution
  })

  it('uses proper key derivation for encryption', async () => {
    const password = 'test-password'
    const salt = 'test-salt'
    
    const key = await deriveKey(password, salt, 100000)
    
    expect(key).toBeDefined()
    expect(key.algorithm.name).toBe('AES-GCM')
    expect(key.algorithm.length).toBe(256)
  })

  it('validates entropy calculations', () => {
    const entropy = calculatePasswordEntropy('Password123!')
    expect(entropy).toBeGreaterThan(50) // Should be around 65 bits
  })
})
```

### 2. Input Validation

```tsx
describe('Input Validation', () => {
  it('sanitizes user input for XSS prevention', () => {
    const maliciousInput = '<script>alert("xss")</script>'
    const sanitized = sanitizeInput(maliciousInput)
    
    expect(sanitized).not.toContain('<script>')
    expect(sanitized).not.toContain('alert')
  })

  it('validates URL format for security header checks', () => {
    expect(validateURL('https://example.com')).toBe(true)
    expect(validateURL('http://example.com')).toBe(true)
    expect(validateURL('not-a-url')).toBe(false)
    expect(validateURL('javascript:alert(1)')).toBe(false)
  })

  it('validates password requirements', () => {
    const validator = new PasswordValidator({
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSymbols: true
    })

    expect(validator.validate('Password123!')).toBe(true)
    expect(validator.validate('weak')).toBe(false)
    expect(validator.validate('NoNumbers!')).toBe(false)
  })
})
```

## Coverage Goals

Aim for the following coverage targets:
- **Statements**: 90%+
- **Branches**: 85%+
- **Functions**: 90%+
- **Lines**: 90%+
- **Security Functions**: 95%+ (critical for security tools)

## Best Practices

### 1. Security Testing
- Test all cryptographic functions thoroughly
- Validate input sanitization and XSS prevention
- Test error handling for security failures
- Verify secure random number generation
- Test password strength calculations

### 2. Component Testing
- Test user interactions, not implementation details
- Use `screen` queries for better accessibility
- Mock external dependencies (crypto, fetch, etc.)
- Test error states and security warnings
- Test responsive behavior

### 3. Cryptographic Testing
- Test with known test vectors when possible
- Verify entropy and randomness
- Test key derivation functions
- Validate encryption/decryption round trips
- Test error handling for invalid inputs

### 4. Performance Testing
- Test with large inputs for security tools
- Monitor memory usage in cryptographic operations
- Test timeout handling for network operations
- Use `vi.advanceTimersByTime()` for timer-based tests

## Debugging Tests

### Common Issues

1. **Crypto mocking**: Ensure Web Crypto API is properly mocked
2. **Async operations**: Use `await` and `waitFor` for async operations
3. **DOM updates**: Use `act()` for state updates that trigger DOM changes
4. **Mock cleanup**: Reset mocks between tests using `vi.clearAllMocks()`
5. **Network requests**: Mock fetch calls for security header checks

### Debugging Tools

- Use `screen.debug()` to see current DOM state
- Use `--reporter=verbose` for detailed test output
- Use Vitest UI for interactive debugging
- Use `console.log` in tests (removed in production)
- Use `vi.spyOn()` to debug function calls

## Continuous Integration

Add to your CI pipeline:

```yaml
# .github/workflows/test.yml
name: Security Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:coverage
      - run: npm run test:security
      - uses: codecov/codecov-action@v3
```

## Security Testing Checklist

- [ ] All cryptographic functions tested
- [ ] Input validation and sanitization tested
- [ ] XSS prevention verified
- [ ] Password strength calculations accurate
- [ ] Security headers properly validated
- [ ] Error handling for security failures
- [ ] Random number generation verified
- [ ] Key derivation functions tested
- [ ] Encryption/decryption round trips verified
- [ ] Network security checks tested

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Documentation](https://testing-library.com/)
- [Web Crypto API Testing](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [Security Testing Best Practices](https://owasp.org/www-project-web-security-testing-guide/)
- [Cryptographic Testing Guidelines](https://csrc.nist.gov/publications/detail/sp/800-140b/final)

---

**Happy Security Testing! 🔒🧪**

For questions or contributions to the testing setup, please refer to the project's contributing guidelines.