const { build } = require('vite');
const { resolve } = require('path');
const fs = require('fs');

async function buildPackage() {
  try {
    console.log('🚀 Building package with CSS...');
    
    // Copy DataTable components from main project
    console.log('📁 Copying DataTable components...');
    const sourcePath = resolve(__dirname, '..', 'client', 'src', 'components', 'DataTable');
    const targetPath = resolve(__dirname, 'src', 'components', 'DataTable');
    
    // Ensure target directory exists
    if (!fs.existsSync(resolve(__dirname, 'src', 'components'))) {
      fs.mkdirSync(resolve(__dirname, 'src', 'components'), { recursive: true });
    }
    
    // Copy DataTable directory
    fs.cpSync(sourcePath, targetPath, { recursive: true });
    
    // Copy UI components (only the ones needed by DataTable)
    const uiSourcePath = resolve(__dirname, '..', 'client', 'src', 'components', 'ui');
    const uiTargetPath = resolve(__dirname, 'src', 'components', 'ui');
    
    if (!fs.existsSync(uiTargetPath)) {
      fs.mkdirSync(uiTargetPath, { recursive: true });
    }
    
    // Copy specific UI components used by DataTable
    const uiComponents = [
      'button.tsx',
      'dropdown-menu.tsx',
      'input.tsx',
      'select.tsx',
      'badge.tsx',
      'dialog.tsx',
      'popover.tsx',
      'switch.tsx',
      'separator.tsx',
      'label.tsx'
    ];
    
    uiComponents.forEach(component => {
      const src = resolve(uiSourcePath, component);
      const dest = resolve(uiTargetPath, component);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
      }
    });
    
    // Copy utility functions
    const utilsSourcePath = resolve(__dirname, '..', 'client', 'src', 'lib', 'utils.ts');
    const utilsTargetPath = resolve(__dirname, 'src', 'lib', 'utils.ts');
    
    // Ensure lib directory exists
    if (!fs.existsSync(resolve(__dirname, 'src', 'lib'))) {
      fs.mkdirSync(resolve(__dirname, 'src', 'lib'), { recursive: true });
    }
    
    // Copy utils file
    fs.copyFileSync(utilsSourcePath, utilsTargetPath);
    
    console.log('✅ Components and utilities copied successfully');
    
    // Build the package
    console.log('🔨 Building package...');
    const result = await build({
      configFile: resolve(__dirname, 'vite.config.ts'),
    });
    
    // Copy CSS file to dist directory
    const cssSourcePath = resolve(__dirname, 'src', 'datatable.css');
    const cssTargetPath = resolve(__dirname, 'dist', 'datatable.css');
    
    if (fs.existsSync(cssSourcePath)) {
      fs.copyFileSync(cssSourcePath, cssTargetPath);
      console.log('✅ CSS file copied to dist directory');
    }
    
    // Create package.json entries for CSS
    const packageJsonPath = resolve(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Add CSS to package.json files array
    if (!packageJson.files) {
      packageJson.files = [];
    }
    
    if (!packageJson.files.includes('dist/datatable.css')) {
      packageJson.files.push('dist/datatable.css');
    }
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    
    console.log('✅ Build completed successfully!');
    console.log('📦 Package includes:');
    console.log('  - dist/index.es.js (ES modules)');
    console.log('  - dist/index.cjs.js (CommonJS)');
    console.log('  - dist/index.d.ts (TypeScript definitions)');
    console.log('  - dist/datatable.css (Standalone CSS)');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildPackage();