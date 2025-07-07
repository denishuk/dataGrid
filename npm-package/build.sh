#!/bin/bash

# Simple build script for NPM package preparation
echo "Building Advanced React DataTable package..."

# Create dist directory
mkdir -p dist

# Copy all source files to dist with proper structure
cp -r src/* dist/

# Copy package files
cp package.json dist/
cp README.md dist/
cp LICENSE dist/

echo "Package built successfully!"
echo "Files ready in dist/ directory"
echo ""
echo "To publish:"
echo "1. cd dist"
echo "2. npm publish"