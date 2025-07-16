import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  // root: 'client',
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true,
      rollupTypes: true,
      include: [
        'client/src/components/DataTable/**/*.ts',
        'client/src/components/DataTable/**/*.tsx',
        'client/src/components/ui/**/*.ts',
        'client/src/components/ui/**/*.tsx',
        'client/src/lib/utils.ts',
        'client/src/data/employees.ts'
      ]
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'client/src/components/DataTable/index.tsx'),
      name: 'AdvancedReactDataTable',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 5001,
    host: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'client/src'),
      '@/components': resolve(__dirname, 'client/src/components'),
      '@/lib': resolve(__dirname, 'client/src/lib'),
      '@/data': resolve(__dirname, 'client/src/data')
    }
  }
})