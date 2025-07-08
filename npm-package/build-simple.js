const { build } = require('vite');
const { resolve } = require('path');

async function buildPackage() {
  try {
    console.log('Building package...');
    
    const result = await build({
      configFile: resolve(__dirname, 'vite.config.ts'),
      build: {
        emptyOutDir: true,
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'AdvancedReactDataTable',
          formats: ['es', 'cjs'],
          fileName: (format) => `index.${format === 'es' ? 'es' : 'cjs'}.js`,
        },
        rollupOptions: {
          external: [
            'react', 
            'react-dom',
            '@headlessui/react',
            'class-variance-authority',
            'clsx',
            'lucide-react',
            'tailwind-merge'
          ],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
      },
    });
    
    console.log('Build completed successfully!');
    console.log(result);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildPackage();