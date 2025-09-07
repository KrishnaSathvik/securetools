#!/usr/bin/env node

/**
 * Google Analytics 4 Setup Script for SecureTools
 * 
 * This script helps set up Google Analytics 4 for SecureTools
 * with security-focused event tracking and conversion goals.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔒 Setting up Google Analytics 4 for SecureTools...\n');

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
const envLocalPath = path.join(process.cwd(), '.env.local');

if (!fs.existsSync(envPath) && !fs.existsSync(envLocalPath)) {
  console.log('📝 Creating .env file for Google Analytics configuration...');
  
  const envContent = `# Google Analytics 4 Configuration
# Get your GA4 Measurement ID from Google Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Analytics 4 API Key (optional, for enhanced ecommerce)
VITE_GA_API_KEY=your_api_key_here

# Google Analytics 4 Client ID (optional, for custom dimensions)
VITE_GA_CLIENT_ID=your_client_id_here

# Environment
NODE_ENV=production
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file');
} else {
  console.log('✅ .env file already exists');
}

console.log('\n🎉 SEO setup completed for SecureTools!');
console.log('\n📋 Next steps:');
console.log('1. Update .env file with your Google Analytics 4 Measurement ID');
console.log('2. Configure Google Search Console');
console.log('3. Submit sitemap to Google');
console.log('4. Set up conversion goals in Google Analytics');
console.log('5. Monitor security tool usage analytics');
console.log('\n🔒 SecureTools is ready for SEO optimization!');