#!/bin/bash

# SecureTools Documentation Generation Script
# This script temporarily moves test files and generates documentation

echo "🚀 Generating SecureTools Documentation..."

# Create backup directory
mkdir -p temp_test_files

# Move test files temporarily
echo "📁 Moving test files temporarily..."
find src -name "*.test.*" -exec mv {} {}.bak \;
mv src/test/setup.ts src/test/setup.ts.bak 2>/dev/null || true

# Generate documentation
echo "📚 Generating documentation..."
npm run docs:build

# Restore test files
echo "🔄 Restoring test files..."
find src -name "*.bak" -exec sh -c 'mv "$1" "${1%.bak}"' _ {} \;

echo "✅ Documentation generated successfully!"
echo "📖 Open docs/index.html in your browser to view the documentation"
echo "🌐 Or run: npm run docs:serve for live development server"
