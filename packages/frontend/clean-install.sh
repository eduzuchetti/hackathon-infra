#!/bin/bash

# Exit on error
set -e

echo "Cleaning node_modules..."
rm -rf node_modules
rm -rf package-lock.json
rm -rf build

echo "Clearing npm cache..."
npm cache clean --force

echo "Installing dependencies..."
npm install

echo "Installation complete!"
echo "You can now run 'npm start' to start the development server." 