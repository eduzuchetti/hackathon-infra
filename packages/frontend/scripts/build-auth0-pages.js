#!/usr/bin/env node

/**
 * Auth0 Pages Build Script
 * 
 * This script prepares custom Auth0 pages for deployment:
 * 1. Reads the HTML files from auth0-pages directory
 * 2. Minifies the HTML, CSS, and JavaScript
 * 3. Creates a zip file for each page type
 * 4. Prepares the files for Auth0 deployment
 */

const fs = require('fs');
const path = require('path');
const minify = require('html-minifier').minify;
const archiver = require('archiver');
const { execSync } = require('child_process');

// Ensure required directories exist
const AUTH0_PAGES_DIR = path.resolve(__dirname, '../auth0-pages');
const BUILD_DIR = path.resolve(__dirname, '../build-auth0');

// Create build directory if it doesn't exist
if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR, { recursive: true });
}

// Minify options
const minifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true
};

// Process HTML files
function processHtmlFile(filename) {
  console.log(`Processing ${filename}...`);
  
  const filePath = path.join(AUTH0_PAGES_DIR, filename);
  const outputPath = path.join(BUILD_DIR, filename);
  
  try {
    // Read the HTML file
    const html = fs.readFileSync(filePath, 'utf8');
    
    // Minify the HTML content
    const minifiedHtml = minify(html, minifyOptions);
    
    // Write the minified HTML to the build directory
    fs.writeFileSync(outputPath, minifiedHtml);
    
    console.log(`Minified ${filename} saved to ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error(`Error processing ${filename}: ${error.message}`);
    process.exit(1);
  }
}

// Create a zip file
function createZipFile(inputFile, outputZipName) {
  const outputPath = path.join(BUILD_DIR, outputZipName);
  const output = fs.createWriteStream(outputPath);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });
  
  output.on('close', () => {
    console.log(`${outputZipName} created (${archive.pointer()} bytes)`);
  });
  
  archive.on('error', (err) => {
    throw err;
  });
  
  archive.pipe(output);
  archive.file(inputFile, { name: path.basename(inputFile) });
  archive.finalize();
  
  return outputPath;
}

// Main function
async function main() {
  try {
    // Install required dependencies if not already installed
    try {
      require.resolve('html-minifier');
      require.resolve('archiver');
    } catch (error) {
      console.log('Installing required dependencies...');
      execSync('npm install --no-save html-minifier archiver', { stdio: 'inherit' });
    }
    
    // Get all HTML files in the auth0-pages directory
    const files = fs.readdirSync(AUTH0_PAGES_DIR).filter(file => file.endsWith('.html'));
    
    if (files.length === 0) {
      console.error('No HTML files found in the auth0-pages directory.');
      process.exit(1);
    }
    
    // Process each HTML file
    for (const file of files) {
      const processedFilePath = processHtmlFile(file);
      const pageName = path.basename(file, '.html');
      const zipFilePath = createZipFile(processedFilePath, `${pageName}.zip`);
      
      console.log(`Created ${zipFilePath}`);
    }
    
    console.log('\nAuth0 pages build completed successfully!');
    console.log(`\nFiles are ready in: ${BUILD_DIR}`);
    console.log('\nNext steps:');
    console.log('1. Upload these files to Auth0 via the Management API or Web Dashboard');
    console.log('2. Configure your Auth0 tenant to use these custom pages');
    
  } catch (error) {
    console.error(`Build failed: ${error.message}`);
    process.exit(1);
  }
}

// Run the main function
main(); 