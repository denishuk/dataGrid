# Advanced DataTable Component - NPM Package Preparation

## Overview

This guide walks through preparing the Advanced DataTable component for publication on NPM. The component is a comprehensive React data grid with TypeScript support, featuring advanced functionality like pinned columns, inline editing, grouping, filtering, and export capabilities.

## Package Structure

```
advanced-react-datatable/
├── src/
│   ├── components/
│   │   └── DataTable/
│   │       ├── DataTable.tsx              # Main component
│   │       ├── data-table-action-bar.tsx  # Action bar with controls
│   │       ├── data-table-column-config.tsx # Column configuration
│   │       ├── data-table-column-config-modal.tsx # Modal wrapper
│   │       ├── data-table-column-filter.tsx # Column filters
│   │       ├── data-table-editable-cell.tsx # Inline editing
│   │       ├── data-table-filters.tsx     # Filter controls
│   │       ├── data-table-group-header.tsx # Group headers
│   │       ├── data-table-header.tsx      # Table header
│   │       ├── data-table-pagination.tsx  # Pagination
│   │       ├── data-table-row.tsx         # Table rows
│   │       ├── data-table-sticky-footer.tsx # Summary footer
│   │       ├── hooks/
│   │       │   └── use-data-table.ts      # Main hook
│   │       ├── types.ts                   # TypeScript types
│   │       └── index.tsx                  # Exports
│   ├── lib/
│   │   └── utils.ts                       # Utility functions
│   └── index.ts                           # Main export
├── dist/                                  # Built files
├── package.json
├── tsconfig.json
├── vite.config.ts                         # Build configuration
├── README.md                              # Documentation
└── LICENSE
```

## Key Features

### Core Functionality
- **Sorting**: Multi-column sorting with visual indicators
- **Filtering**: Column-specific filters with multiple operators
- **Grouping**: Multi-level grouping with automatic summaries
- **Pagination**: Configurable page sizes and navigation
- **Selection**: Single or multiple row selection modes

### Advanced Features
- **Pinned Columns**: Pin columns to left or right with visual separation
- **Inline Editing**: Double-click cells to edit with type-specific editors
- **Column Management**: Show/hide, reorder, and configure columns
- **Export**: CSV export with filtered/grouped data
- **Sticky Elements**: Sticky headers and optional summary footer
- **Responsive Design**: Mobile-friendly with adaptive layouts

### Technical Features
- **TypeScript**: Full type safety and IntelliSense support
- **Custom Renderers**: Override column headers and cell templates
- **Virtual Scrolling**: Handle large datasets efficiently
- **Accessibility**: ARIA compliant with keyboard navigation
- **Themeable**: Works with Tailwind CSS and custom themes

## Dependencies

### Peer Dependencies (Required by consuming application)
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "@types/react": "^18.0.0",
  "@types/react-dom": "^18.0.0"
}
```

### UI Dependencies (Required for styling)
```json
{
  "@radix-ui/react-accordion": "^1.1.2",
  "@radix-ui/react-checkbox": "^1.0.4",
  "@radix-ui/react-dialog": "^1.0.5",
  "@radix-ui/react-dropdown-menu": "^2.0.6",
  "@radix-ui/react-label": "^2.0.2",
  "@radix-ui/react-popover": "^1.0.7",
  "@radix-ui/react-scroll-area": "^1.0.5",
  "@radix-ui/react-select": "^2.0.0",
  "@radix-ui/react-separator": "^1.0.3",
  "@radix-ui/react-slot": "^1.0.2",
  "@radix-ui/react-switch": "^1.0.3",
  "@radix-ui/react-tabs": "^1.0.4",
  "@radix-ui/react-tooltip": "^1.0.7",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "lucide-react": "^0.400.0",
  "tailwind-merge": "^2.0.0"
}
```

### Build Dependencies
```json
{
  "@types/node": "^20.0.0",
  "@vitejs/plugin-react": "^4.0.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0",
  "tailwindcss": "^3.3.0",
  "typescript": "^5.0.0",
  "vite": "^5.0.0",
  "vite-plugin-dts": "^3.0.0"
}
```

## Installation Instructions

### 1. Install the Package
```bash
npm install advanced-react-datatable
# or
yarn add advanced-react-datatable
# or
pnpm add advanced-react-datatable
```

### 2. Install Required Peer Dependencies
```bash
npm install react react-dom @types/react @types/react-dom
```

### 3. Install UI Dependencies
```bash
npm install @radix-ui/react-accordion @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-tooltip class-variance-authority clsx lucide-react tailwind-merge
```

### 4. Configure Tailwind CSS
Add to your `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/advanced-react-datatable/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // Add any custom theme extensions
    }
  },
  plugins: []
}
```

## Usage Examples

### Basic Usage
```tsx
import { DataTable } from 'advanced-react-datatable';
import type { DataTableColumn } from 'advanced-react-datatable/types';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  active: boolean;
}

const columns: DataTableColumn<Employee>[] = [
  {
    field: 'name',
    header: 'Full Name',
    sortable: true,
    filterable: true,
    pinned: 'left'
  },
  {
    field: 'email',
    header: 'Email Address',
    sortable: true,
    filterable: true
  },
  {
    field: 'department',
    header: 'Department',
    sortable: true,
    filterable: true,
    groupable: true
  },
  {
    field: 'salary',
    header: 'Salary',
    type: 'number',
    sortable: true,
    filterable: true
  },
  {
    field: 'active',
    header: 'Status',
    type: 'boolean',
    sortable: true,
    filterable: true
  }
];

const employees: Employee[] = [
  // Your data here
];

function App() {
  return (
    <DataTable
      data={employees}
      columns={columns}
      pageSize={50}
      selectionMode="multiple"
      showFilters
      showColumnConfig
      onRowSelect={(selected) => console.log('Selected:', selected)}
      onExport={(data, format) => console.log('Export:', format, data)}
    />
  );
}
```

### Advanced Usage with Custom Renderers
```tsx
import { DataTable } from 'advanced-react-datatable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const columns: DataTableColumn<Employee>[] = [
  {
    field: 'name',
    header: 'Employee',
    cellRenderer: (value, row) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
          {row.name.charAt(0)}
        </div>
        <span className="font-medium">{value}</span>
      </div>
    )
  },
  {
    field: 'active',
    header: 'Status',
    cellRenderer: (value) => (
      <Badge variant={value ? 'default' : 'secondary'}>
        {value ? 'Active' : 'Inactive'}
      </Badge>
    )
  },
  {
    field: 'actions',
    header: 'Actions',
    sortable: false,
    filterable: false,
    cellRenderer: (_, row) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">Edit</Button>
        <Button size="sm" variant="outline">Delete</Button>
      </div>
    )
  }
];
```

### Grouping and Aggregation
```tsx
<DataTable
  data={employees}
  columns={columns}
  groupBy="department"
  pageSize={100}
  onGroupByChange={(field) => console.log('Group by:', field)}
/>
```

### Inline Editing
```tsx
<DataTable
  data={employees}
  columns={columns.map(col => ({ ...col, editable: col.field !== 'id' }))}
  onCellEdit={(row, field, value) => {
    console.log('Edit:', { row, field, value });
    // Update your data source
  }}
/>
```

## Publishing Steps

### 1. Prepare Package Files
```bash
# Create package structure
mkdir advanced-react-datatable
cd advanced-react-datatable

# Copy component files
cp -r ../client/src/components/DataTable ./src/components/
cp -r ../client/src/lib ./src/
```

### 2. Create package.json
```json
{
  "name": "advanced-react-datatable",
  "version": "1.0.0",
  "description": "A comprehensive React data grid component with advanced features",
  "main": "dist/index.js",
  "module": "dist/index.es.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "scripts": {
    "build": "vite build",
    "dev": "vite build --watch",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "keywords": [
    "react",
    "datatable",
    "datagrid",
    "table",
    "typescript",
    "tailwind",
    "radix-ui",
    "sorting",
    "filtering",
    "grouping",
    "pagination",
    "export"
  ],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourusername/advanced-react-datatable.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/advanced-react-datatable/issues"
  },
  "homepage": "https://github.com/yourusername/advanced-react-datatable#readme",
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-tooltip": "^1.0.7",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "lucide-react": "^0.400.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "vite-plugin-dts": "^3.0.0"
  }
}
```

### 3. Build Configuration
Create `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

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
      name: 'AdvancedReactDataTable',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
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

### 4. TypeScript Configuration
Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["dist", "node_modules"]
}
```

### 5. Build and Publish
```bash
# Build the package
npm run build

# Test the build
npm pack

# Publish to NPM
npm login
npm publish
```

## API Reference

### DataTable Props
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  groupBy?: string | string[];
  virtualScrolling?: boolean;
  selectionMode?: 'single' | 'multiple' | 'none';
  stickyHeader?: boolean;
  showFilters?: boolean;
  showColumnConfig?: boolean;
  pageSize?: number;
  className?: string;
  onRowSelect?: (selectedRows: T[]) => void;
  onExport?: (data: T[], format: 'csv') => void;
  onColumnChange?: (columns: DataTableColumn<T>[]) => void;
  onCellEdit?: (row: T, field: keyof T, value: any) => void;
}
```

### DataTableColumn Interface
```typescript
interface DataTableColumn<T> {
  field: keyof T;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  groupable?: boolean;
  pinned?: 'left' | 'right' | null;
  type?: 'text' | 'number' | 'date' | 'select' | 'boolean';
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  hidden?: boolean;
  editable?: boolean;
  cellRenderer?: (value: any, row: T) => React.ReactNode;
  headerRenderer?: (column: DataTableColumn<T>) => React.ReactNode;
  options?: string[];
}
```

## Styling Requirements

The component requires Tailwind CSS for styling. Make sure to include the package's classes in your Tailwind configuration:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/advanced-react-datatable/dist/**/*.{js,ts,jsx,tsx}"
  ],
  // ... rest of your config
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details.

## Changelog

### v1.0.0
- Initial release with comprehensive data table functionality
- Advanced features: pinning, grouping, filtering, sorting
- Inline editing capabilities
- Export functionality
- TypeScript support
- Responsive design
- Accessibility features