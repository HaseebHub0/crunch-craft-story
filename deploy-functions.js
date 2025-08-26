#!/usr/bin/env node

/**
 * Deployment script for Netlify functions
 * Run this script to deploy your functions to Netlify
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Deploying Netlify functions...');

// Check if netlify CLI is installed
try {
  execSync('netlify --version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ Netlify CLI is not installed. Please install it first:');
  console.error('npm install -g netlify-cli');
  process.exit(1);
}

// Check if we're in a Netlify project
if (!fs.existsSync('.netlify')) {
  console.error('❌ Not a Netlify project. Please run "netlify init" first.');
  process.exit(1);
}

try {
  // Build the project first
  console.log('📦 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Deploy to Netlify
  console.log('🌐 Deploying to Netlify...');
  execSync('netlify deploy --prod --dir=dist', { stdio: 'inherit' });
  
  console.log('✅ Deployment completed successfully!');
  console.log('🔗 Your site should be live now.');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
