#!/usr/bin/env node

/**
 * Auth0 Configuration Update Script
 * 
 * This script updates the Auth0 configuration file for different environments.
 * Usage: node scripts/update-auth0-config.js [environment]
 * 
 * Environment can be:
 * - dev (default)
 * - staging
 * - prod
 */

const fs = require('fs');
const path = require('path');

// Configuration for different environments
const configurations = {
  dev: {
    domain: 'dev-hackathon.auth0.com',
    clientId: 'your-dev-client-id',
    audience: 'https://api-dev.yourdomain.com',
  },
  staging: {
    domain: 'staging-hackathon.auth0.com',
    clientId: 'your-staging-client-id',
    audience: 'https://api-staging.yourdomain.com',
  },
  prod: {
    domain: 'hackathon.auth0.com',
    clientId: 'your-prod-client-id',
    audience: 'https://api.yourdomain.com',
  },
};

// Get environment from command line arguments
const environment = process.argv[2] || 'dev';

if (!configurations[environment]) {
  console.error(`Error: Unknown environment "${environment}"`);
  console.error('Available environments: dev, staging, prod');
  process.exit(1);
}

// Path to the configuration file
const configFilePath = path.resolve(__dirname, '../src/config/auth0-config.ts');

// Create the configuration content
const configContent = `/**
 * Auth0 Configuration for ${environment} environment
 * Generated on ${new Date().toISOString()}
 * 
 * DO NOT MODIFY THIS FILE DIRECTLY
 * Use the update-auth0-config.js script to regenerate it
 */

export const auth0Config = {
  domain: '${configurations[environment].domain}',
  clientId: '${configurations[environment].clientId}',
  audience: '${configurations[environment].audience}',
};
`;

// Ensure the config directory exists
const configDir = path.dirname(configFilePath);
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

// Write the configuration file
fs.writeFileSync(configFilePath, configContent);

console.log(`Auth0 configuration updated for ${environment} environment`);
console.log(`Configuration file: ${configFilePath}`); 