// Simple test to verify the package can be imported
try {
  console.log('Testing package import...');
  
  // Test CommonJS import
  const packageCjs = require('./dist/index.cjs.js');
  console.log('✅ CommonJS import successful');
  console.log('Available exports:', Object.keys(packageCjs));
  
  // Test if DataTable is available
  if (packageCjs.DataTable) {
    console.log('✅ DataTable component found');
  } else {
    console.log('❌ DataTable component not found');
  }
  
  console.log('Package test completed successfully!');
  
} catch (error) {
  console.error('❌ Package test failed:', error.message);
  process.exit(1);
}