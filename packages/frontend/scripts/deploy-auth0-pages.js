#!/usr/bin/env node

/**
 * Auth0 Pages Deployment Script
 * 
 * This script uploads custom Auth0 pages to your Auth0 tenant using the Management API:
 * 1. Authenticates with Auth0 Management API
 * 2. Reads the minified HTML files
 * 3. Updates the Auth0 tenant settings to use custom pages
 * 
 * Required environment variables:
 * - AUTH0_DOMAIN: Your Auth0 domain (e.g., dev-abc123.auth0.com)
 * - AUTH0_CLIENT_ID: Client ID for a Machine-to-Machine app with management API permissions
 * - AUTH0_CLIENT_SECRET: Client secret for the above M2M app
 */

const fs = require('fs');
const path = require('path');
const { ManagementClient } = require('auth0');

// Check for required environment variables
const requiredEnvVars = ['AUTH0_DOMAIN', 'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  console.error('Please set these variables and try again.');
  process.exit(1);
}

// Auth0 settings
const domain = process.env.AUTH0_DOMAIN;
const clientId = process.env.AUTH0_CLIENT_ID;
const clientSecret = process.env.AUTH0_CLIENT_SECRET;

// Paths
const BUILD_DIR = path.resolve(__dirname, '../build-auth0');

// Initialize Auth0 Management client
async function initAuth0Client() {
  try {
    const auth0 = new ManagementClient({
      domain,
      clientId,
      clientSecret,
      scope: 'update:tenant_settings'
    });
    
    return auth0;
  } catch (error) {
    console.error('Failed to initialize Auth0 client:', error.message);
    process.exit(1);
  }
}

// Read HTML file content
function readHtmlFile(filename) {
  const filePath = path.join(BUILD_DIR, filename);
  
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filename}: ${error.message}`);
    process.exit(1);
  }
}

// Update Auth0 tenant settings with custom pages
async function updateAuth0TenantSettings(auth0, customPages) {
  try {
    console.log('Updating Auth0 tenant settings...');
    
    const params = { enabled_locales: ['en'] };
    
    // Set custom pages in tenant settings
    await auth0.updateTenantSettings({
      ...params,
      custom_login_page_on: true,
      custom_pages: customPages
    });
    
    console.log('Auth0 tenant settings updated successfully!');
  } catch (error) {
    console.error('Failed to update Auth0 tenant settings:', error.message);
    process.exit(1);
  }
}

// Main function
async function main() {
  try {
    // Install required dependencies if not already installed
    try {
      require.resolve('auth0');
    } catch (error) {
      console.log('Installing required dependencies...');
      const { execSync } = require('child_process');
      execSync('npm install --no-save auth0', { stdio: 'inherit' });
    }
    
    // Check if build-auth0 directory exists
    if (!fs.existsSync(BUILD_DIR)) {
      console.error(`Build directory ${BUILD_DIR} does not exist. Please run "npm run build:auth0-pages" first.`);
      process.exit(1);
    }
    
    // Check if login.html exists
    const loginHtmlPath = path.join(BUILD_DIR, 'login.html');
    if (!fs.existsSync(loginHtmlPath)) {
      console.error(`Login page (${loginHtmlPath}) not found. Please run "npm run build:auth0-pages" first.`);
      process.exit(1);
    }
    
    // Read the HTML content
    const loginHtml = readHtmlFile('login.html');
    
    // Initialize Auth0 client
    const auth0 = await initAuth0Client();
    
    // Define custom pages
    const customPages = {
      login: loginHtml,
      // Add more pages as needed:
      // password_reset: readHtmlFile('password_reset.html'),
      // guardian_multifactor: readHtmlFile('guardian_multifactor.html'),
      // error_page: readHtmlFile('error_page.html')
    };
    
    // Update Auth0 tenant settings
    await updateAuth0TenantSettings(auth0, customPages);
    
    console.log('\nDeployment completed successfully!');
    console.log(`\nYour custom Auth0 pages are now live on ${domain}`);
    
  } catch (error) {
    console.error(`Deployment failed: ${error.message}`);
    process.exit(1);
  }
}

// Run the main function
main(); 