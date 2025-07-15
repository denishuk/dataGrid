#!/bin/bash

# Create a simple client-only package structure
echo "Creating simplified client-only DataTable package..."

# Create package directory
mkdir -p simple-package/src/components/DataTable
mkdir -p simple-package/src/components/ui
mkdir -p simple-package/src/lib
mkdir -p simple-package/src/data

# Copy DataTable components
cp -r client/src/components/DataTable/* simple-package/src/components/DataTable/
cp -r client/src/components/ui/* simple-package/src/components/ui/
cp client/src/lib/utils.ts simple-package/src/lib/
cp client/src/data/employees.ts simple-package/src/data/

# Create package.json
cat > simple-package/package.json << 'EOF'
{
  "name": "advanced-react-datatable",
  "version": "1.0.0",
  "description": "A comprehensive React DataTable component with advanced features",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "dependencies": {
    "@headlessui/react": "^2.2.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.453.0",
    "tailwind-merge": "^2.6.0"
  },
  "devDependencies": {
    "@rollup/plugin-node-resolve": "^15.2.3",
    "@rollup/plugin-commonjs": "^25.0.7",
    "@rollup/plugin-typescript": "^11.1.5",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "rollup": "^4.9.6",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "rollup-plugin-postcss": "^4.0.2",
    "typescript": "^5.3.3"
  }
}
EOF

# Create simple index.ts
cat > simple-package/src/index.ts << 'EOF'
// Main DataTable component export
export { DataTable } from './components/DataTable/DataTable'

// Hook exports
export { useDataTable } from './components/DataTable/hooks/use-data-table'

// Type exports
export type {
  DataTableColumn,
  DataTableProps,
  FilterConfig,
  SortConfig,
  GroupConfig,
  GroupSummary,
  DataTableSortOptions,
  DataTableSelectionOptions
} from './components/DataTable/types'

// Utility exports
export { cn } from './lib/utils'

// Sample data exports for demos
export { employees, employeeColumns } from './data/employees'
export type { Employee } from './data/employees'
EOF

# Create tsconfig.json
cat > simple-package/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "jsx": "react-jsx",
    "declaration": true,
    "outDir": "./dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.*"]
}
EOF

# Create README
cat > simple-package/README.md << 'EOF'
# Advanced React DataTable

A comprehensive, customizable React DataTable component with TypeScript support and advanced features.

## Features

- ✅ **Multi-level grouping** with drag-and-drop reordering
- ✅ **Pinned columns** (left/right) with shadow effects  
- ✅ **Advanced filtering** with column-specific operators
- ✅ **Inline editing** with type-specific editors
- ✅ **Export functionality** (CSV and PDF)
- ✅ **Responsive design** with mobile support
- ✅ **TypeScript support** with full type safety
- ✅ **Tailwind CSS** styling with pure CSS implementation
- ✅ **Hardcoded sample data** included for quick demos

## Installation

```bash
npm install advanced-react-datatable
```

## Basic Usage

```tsx
import { DataTable, employeeColumns, employees } from 'advanced-react-datatable'

function MyComponent() {
  return (
    <DataTable
      data={employees}
      columns={employeeColumns}
      stickyHeader={true}
      showFilters={true}
      pageSize={10}
    />
  )
}
```

## Custom Data

```tsx
import { DataTable, DataTableColumn } from 'advanced-react-datatable'

interface MyData {
  id: number
  name: string
  status: string
}

const columns: DataTableColumn<MyData>[] = [
  { field: 'id', header: 'ID', sortable: true },
  { field: 'name', header: 'Name', sortable: true, filterable: true },
  { field: 'status', header: 'Status', sortable: true, filterable: true }
]

const data: MyData[] = [
  { id: 1, name: 'John Doe', status: 'Active' },
  { id: 2, name: 'Jane Smith', status: 'Inactive' }
]

function MyComponent() {
  return (
    <DataTable
      data={data}
      columns={columns}
      stickyHeader={true}
      showFilters={true}
      pageSize={10}
    />
  )
}
```

## Features Documentation

### Column Configuration

```tsx
const columns: DataTableColumn<MyData>[] = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    filterable: true,
    groupable: true,
    editable: true,
    pinned: 'left', // 'left' | 'right' | null
    type: 'text', // 'text' | 'number' | 'date' | 'select' | 'boolean'
    width: 200,
    minWidth: 100,
    aggregation: 'count', // 'count' | 'sum' | 'avg' | 'min' | 'max'
    cellRenderer: (value, row) => <span>{value}</span>
  }
]
```

### Advanced Features

```tsx
<DataTable
  data={data}
  columns={columns}
  groupBy={['department', 'location']} // Multi-level grouping
  virtualScrolling={true} // For large datasets
  stickyHeader={true}
  stickyFooter={true}
  showFilters={true}
  showColumnConfig={true}
  enablePdfExport={true}
  pageSize={20}
  onRowSelect={(rows) => console.log('Selected:', rows)}
  onCellEdit={(row, field, value) => console.log('Edit:', row, field, value)}
  onExport={(data, format) => console.log('Export:', format)}
/>
```

## TypeScript Support

The package includes full TypeScript definitions:

```tsx
import { 
  DataTableColumn, 
  DataTableProps, 
  FilterConfig, 
  SortConfig 
} from 'advanced-react-datatable'
```

## Styling

The component uses Tailwind CSS classes. Make sure Tailwind is configured in your project.

## License

MIT
EOF

echo "✅ Simple package structure created in simple-package/"
echo "📁 Package contents:"
echo "  - src/components/DataTable/ (All DataTable components)"
echo "  - src/components/ui/ (UI components)"
echo "  - src/lib/utils.ts (Utility functions)"
echo "  - src/data/employees.ts (Sample data)"
echo "  - package.json (Simplified dependencies)"
echo "  - README.md (Documentation)"
echo "  - tsconfig.json (TypeScript configuration)"
echo ""
echo "To build the package:"
echo "  cd simple-package"
echo "  npm install"
echo "  npm run build"