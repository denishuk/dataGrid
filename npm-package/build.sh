#!/bin/bash

# Build script for advanced-react-datatable NPM package

echo "🔧 Building advanced-react-datatable package..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist src

# Copy DataTable components from main folder
echo "📁 Copying DataTable components from main folder..."
mkdir -p src/components/DataTable
mkdir -p src/components/ui
cp -r ../client/src/components/DataTable/* src/components/DataTable/
# Copy UI components excluding toast-related components
cp -r ../client/src/components/ui/* src/components/ui/
rm -f src/components/ui/toaster.tsx
rm -f src/components/ui/toast.tsx
cp -r ../client/src/lib src/
# Skip copying hooks folder - DataTable doesn't use toast or mobile hooks

# Create index.ts file for exports
echo "📝 Creating index.ts..."
TYPE_EXPORTS=$(node extract-types.js exports)
cat > src/index.ts << EOF
export { DataTable } from './components/DataTable/DataTable';
export { useDataTable } from './components/DataTable/hooks/use-data-table';
export { cn } from './lib/utils';
${TYPE_EXPORTS}
EOF

# Build the package using the working configuration
echo "📦 Building package with Vite..."
# Set environment to skip PostCSS processing
export NODE_ENV=production
npx vite build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Vite build successful!"
    
    # Copy TypeScript definitions
    echo "📝 Adding TypeScript definitions..."
    DEFINITIONS=$(node extract-types.js definitions)
    cat > dist/index.d.ts << EOF
// Type definitions for advanced-react-datatable
${DEFINITIONS}
EOF
    
    echo "✅ TypeScript definitions added!"
    
    # Test the package
    echo "🧪 Testing package imports..."
    node test-package.js
    
    if [ $? -eq 0 ]; then
        echo "✅ Package import test successful!"
        echo "📁 Final contents of dist folder:"
        ls -la dist/
        echo ""
        echo "📊 Bundle sizes:"
        echo "ES Module: $(du -h dist/index.es.js | cut -f1)"
        echo "CommonJS: $(du -h dist/index.cjs.js | cut -f1)"
        echo "TypeScript: $(du -h dist/index.d.ts | cut -f1)"
        
        # Clean up temporary src folder after successful build
        echo "🧹 Cleaning up temporary files..."
        rm -rf src
    else
        echo "❌ Package import test failed!"
        exit 1
    fi
    
else
    echo "❌ Vite build failed!"
    exit 1
fi

echo ""
echo "🎉 Build completed successfully!"
echo "📦 Package ready for publishing:"
echo "   npm publish"