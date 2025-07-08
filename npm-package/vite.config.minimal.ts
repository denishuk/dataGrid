import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    dts({
      insertTypesEntry: true,
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
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
        'react/jsx-runtime',
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
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
    minify: false, // Don't minify to avoid React internals issues
    target: 'es2015',
    sourcemap: false,
  },
});