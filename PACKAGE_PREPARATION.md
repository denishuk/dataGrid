# NPM Package Preparation Guide

## Preparing the DataTable Component for NPM Publication

### 1. Package Structure

Create a new package structure for publication:

```
@your-org/advanced-datatable/
├── src/
│   ├── components/
│   │   └── DataTable/
│   │       ├── index.ts                 # Main export
│   │       ├── DataTable.tsx
│   │       ├── data-table-*.tsx        # All sub-components
│   │       ├── hooks/
│   │       ├── utils/
│   │       └── types.ts
│   └── index.ts                        # Package entry point
├── dist/                               # Built files
├── package.json
├── tsconfig.json
├── rollup.config.js                    # or vite.config.ts
├── README.md
└── LICENSE
```

### 2. Package.json Configuration

```json
{
  "name": "@your-org/advanced-datatable",
  "version": "1.0.0",
  "description": "A comprehensive React data table component with advanced functionality",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "src",
    "README.md"
  ],
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "prepare": "npm run build",
    "test": "jest",
    "lint": "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "keywords": [
    "react",
    "datatable",
    "table",
    "grid",
    "typescript",
    "ui",
    "component",
    "filtering",
    "sorting",
    "grouping",
    "virtual-scrolling"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-org/advanced-datatable.git"
  },
  "bugs": {
    "url": "https://github.com/your-org/advanced-datatable/issues"
  },
  "homepage": "https://github.com/your-org/advanced-datatable#readme",
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "dependencies": {
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "lucide-react": "^0.294.0",
    "react-beautiful-dnd": "^13.1.1",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@rollup/plugin-commonjs": "^25.0.7",
    "@rollup/plugin-node-resolve": "^15.2.3",
    "@rollup/plugin-typescript": "^11.1.5",
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@types/react-beautiful-dnd": "^13.1.6",
    "rollup": "^4.6.1",
    "rollup-plugin-dts": "^6.1.0",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "rollup-plugin-postcss": "^4.0.2",
    "typescript": "^5.3.2"
  }
}
```

### 3. Build Configuration (Rollup)

Create `rollup.config.js`:

```javascript
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        config: {
          path: './postcss.config.js',
        },
        extensions: ['.css'],
        minimize: true,
        inject: {
          insertAt: 'top',
        },
      }),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
```

### 4. TypeScript Configuration

Create dedicated `tsconfig.json` for the package:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "es6"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "jsx": "react-jsx",
    "declaration": true,
    "declarationDir": "dist/types",
    "outDir": "dist/esm"
  },
  "include": [
    "src"
  ],
  "exclude": [
    "dist",
    "node_modules"
  ]
}
```

### 5. Main Export File

Create `src/index.ts`:

```typescript
// Main component
export { DataTable } from './components/DataTable/DataTable';

// Types
export type {
  DataTableProps,
  DataTableColumn,
  FilterConfig,
  SortConfig,
  GroupConfig,
  GroupSummary,
} from './components/DataTable/types';

// Hooks (optional, for advanced users)
export { useDataTable } from './components/DataTable/hooks/use-data-table';
export { useVirtualization } from './components/DataTable/hooks/use-virtualization';

// Utilities (optional)
export * from './components/DataTable/utils/data-utils';
export * from './components/DataTable/utils/export-utils';
```

### 6. Component Index File

Create `src/components/DataTable/index.ts`:

```typescript
export { DataTable } from './DataTable';
export type * from './types';
```

### 7. Steps to Publish

1. **Copy the DataTable components** to the new package structure
2. **Remove internal dependencies** (like shared schema, query client)
3. **Create build configuration** files
4. **Build the package**:
   ```bash
   npm run build
   ```
5. **Test the build**:
   ```bash
   npm pack
   # Install the .tgz file in a test project
   ```
6. **Publish to NPM**:
   ```bash
   npm login
   npm publish --access public
   ```

### 8. Usage in Consumer Projects

After publication, users can install and use:

```bash
npm install @your-org/advanced-datatable
```

```tsx
import { DataTable, DataTableColumn } from '@your-org/advanced-datatable';
import type { Employee } from './types';

const columns: DataTableColumn<Employee>[] = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    filterable: true,
  },
  // ... more columns
];

function MyComponent() {
  return (
    <DataTable
      data={employees}
      columns={columns}
      selectionMode="multiple"
    />
  );
}
```

### 9. Additional Considerations

- **CSS Dependencies**: Ensure Tailwind CSS classes are included or provide CSS file
- **Peer Dependencies**: React and React-DOM should be peer dependencies
- **Documentation**: Include comprehensive API documentation
- **Examples**: Provide example usage and demos
- **Testing**: Add unit and integration tests
- **Versioning**: Follow semantic versioning (semver)
- **Changelog**: Maintain a CHANGELOG.md file

### 10. Alternative: Vite Build

If you prefer Vite instead of Rollup, create `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AdvancedDataTable',
      formats: ['es', 'umd'],
      fileName: (format) => `advanced-datatable.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
```

This guide provides a complete roadmap for packaging and publishing the DataTable component to NPM registry.