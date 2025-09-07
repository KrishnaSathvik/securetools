#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * 
 * Analyzes the production bundle to identify optimization opportunities.
 * Run with: node analyze-bundle.cjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Bundle analysis function
function analyzeBundle() {
  const distPath = path.join(__dirname, 'dist');
  const assetsPath = path.join(distPath, 'assets');
  
  console.log('🔍 Bundle Analysis Report\n');
  console.log('=' .repeat(50));
  
  // Check if dist folder exists
  if (!fs.existsSync(distPath)) {
    console.log('❌ Dist folder not found. Run "npm run build" first.');
    return;
  }
  
  // Get all files in dist/assets
  const files = fs.readdirSync(assetsPath);
  
  let totalSize = 0;
  const fileAnalysis = [];
  
  files.forEach(file => {
    const filePath = path.join(assetsPath, file);
    const stats = fs.statSync(filePath);
    const sizeInBytes = stats.size;
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);
    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
    
    totalSize += sizeInBytes;
    
    fileAnalysis.push({
      name: file,
      size: sizeInBytes,
      sizeKB: parseFloat(sizeInKB),
      sizeMB: parseFloat(sizeInMB),
      type: getFileType(file)
    });
  });
  
  // Sort by size (largest first)
  fileAnalysis.sort((a, b) => b.size - a.size);
  
  console.log('📊 File Size Analysis:');
  console.log('-'.repeat(50));
  
  fileAnalysis.forEach(file => {
    const sizeStr = file.sizeMB > 1 
      ? `${file.sizeMB} MB` 
      : `${file.sizeKB} KB`;
    
    const typeIcon = getTypeIcon(file.type);
    console.log(`${typeIcon} ${file.name.padEnd(30)} ${sizeStr.padStart(10)}`);
  });
  
  console.log('\n📈 Summary:');
  console.log('-'.repeat(50));
  console.log(`Total files: ${files.length}`);
  console.log(`Total size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total size (gzipped): ~${(totalSize * 0.3 / (1024 * 1024)).toFixed(2)} MB`);
  
  // Recommendations
  console.log('\n💡 Optimization Recommendations:');
  console.log('-'.repeat(50));
  
  const jsFiles = fileAnalysis.filter(f => f.type === 'js');
  const cssFiles = fileAnalysis.filter(f => f.type === 'css');
  
  if (jsFiles.length > 0) {
    const largestJS = jsFiles[0];
    if (largestJS.sizeMB > 0.5) {
      console.log(`⚠️  Largest JS file (${largestJS.name}) is ${largestJS.sizeMB} MB`);
      console.log('   Consider code splitting or lazy loading');
    }
  }
  
  if (cssFiles.length > 0) {
    const largestCSS = cssFiles[0];
    if (largestCSS.sizeKB > 100) {
      console.log(`⚠️  CSS file (${largestCSS.name}) is ${largestCSS.sizeKB} KB`);
      console.log('   Consider purging unused CSS or splitting styles');
    }
  }
  
  // Check for common optimization opportunities
  console.log('\n🔧 Quick Wins:');
  console.log('-'.repeat(50));
  console.log('✅ Enable gzip compression on your server');
  console.log('✅ Use a CDN for static assets');
  console.log('✅ Implement lazy loading for tool pages');
  console.log('✅ Consider service worker for caching');
  
  // Performance thresholds
  console.log('\n🎯 Performance Targets:');
  console.log('-'.repeat(50));
  console.log('📱 Mobile: < 1.5 MB total, < 500 KB per JS file');
  console.log('💻 Desktop: < 2.5 MB total, < 1 MB per JS file');
  console.log('⚡ First Load: < 200 KB critical CSS + JS');
  
  const totalMB = totalSize / (1024 * 1024);
  if (totalMB < 1.5) {
    console.log('\n🎉 Great! Your bundle is well-optimized for mobile.');
  } else if (totalMB < 2.5) {
    console.log('\n👍 Good bundle size for desktop, consider mobile optimization.');
  } else {
    console.log('\n⚠️  Bundle is large, consider aggressive optimization.');
  }
}

function getFileType(filename) {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.js': return 'js';
    case '.css': return 'css';
    case '.png': case '.jpg': case '.jpeg': case '.gif': case '.svg': return 'image';
    case '.woff': case '.woff2': case '.ttf': case '.eot': return 'font';
    default: return 'other';
  }
}

function getTypeIcon(type) {
  switch (type) {
    case 'js': return '📄';
    case 'css': return '🎨';
    case 'image': return '🖼️ ';
    case 'font': return '🔤';
    default: return '📁';
  }
}

// Run analysis
analyzeBundle();
