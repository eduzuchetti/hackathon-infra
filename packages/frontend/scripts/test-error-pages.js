#!/usr/bin/env node

/**
 * Error Pages Testing Server
 * 
 * This script creates a simple HTTP server to test error pages.
 * Usage: node scripts/test-error-pages.js
 * 
 * It will serve the 403.html and 404.html pages for testing.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3030;
const PUBLIC_DIR = path.join(__dirname, '../public');

const server = http.createServer((req, res) => {
  let filePath;
  
  if (req.url === '/403') {
    filePath = path.join(PUBLIC_DIR, '403.html');
    res.statusCode = 403;
  } else if (req.url === '/404') {
    filePath = path.join(PUBLIC_DIR, '404.html');
    res.statusCode = 404;
  } else if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error Pages Test</title>
          <style>
            body {
              font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 2rem;
              line-height: 1.5;
            }
            h1 { color: #333; }
            a {
              display: inline-block;
              margin: 1rem 1rem 1rem 0;
              padding: 0.5rem 1rem;
              background: #47A248;
              color: white;
              text-decoration: none;
              border-radius: 4px;
            }
            a:hover { background: #589636; }
          </style>
        </head>
        <body>
          <h1>Error Pages Test</h1>
          <p>Click the links below to test each error page:</p>
          <a href="/403">Test 403 Error Page</a>
          <a href="/404">Test 404 Error Page</a>
        </body>
      </html>
    `);
    return;
  } else {
    filePath = path.join(PUBLIC_DIR, '404.html');
    res.statusCode = 404;
  }
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.statusCode = 500;
      res.end('Error loading page');
      return;
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`
  🚀 Error pages testing server running!
  
  Open http://localhost:${PORT} in your browser
  
  Available test URLs:
  - http://localhost:${PORT}/403 (Forbidden)
  - http://localhost:${PORT}/404 (Not Found)
  
  Press Ctrl+C to stop the server
  `);
}); 