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
mkdir -p src/hooks
cp -r ../client/src/components/DataTable/* src/components/DataTable/
cp -r ../client/src/components/ui/* src/components/ui/
cp -r ../client/src/lib src/
cp -r ../client/src/hooks src/

# Create index.ts file for exports
echo "📝 Creating index.ts..."
cat > src/index.ts << 'EOF'
export { DataTable } from './components/DataTable/DataTable';
export { useDataTable } from './components/DataTable/hooks/use-data-table';
export { cn } from './lib/utils';
export type {
  DataTableColumn,
  DataTableProps,
  FilterConfig,
  SortConfig,
  GroupConfig,
  GroupSummary
} from './components/DataTable/types';
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
    cat > dist/index.d.ts << 'EOF'
// Type definitions for advanced-react-datatable
import React from 'react';

export interface DataTableColumn<T = any> {
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
  useSelection?: boolean;
  aggregation?: 'count' | 'sum' | 'avg' | 'min' | 'max';
  cellRenderer?: (value: any, row: T) => React.ReactNode;
  headerRenderer?: (column: DataTableColumn<T>) => React.ReactNode;
  valueGetter?: (row: T) => any;
  options?: string[];
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: DataTableColumn<T>[];
  groupBy?: string | string[];
  virtualScrolling?: boolean;
  stickyHeader?: boolean;
  stickyFooter?: boolean;
  showFilters?: boolean;
  showColumnConfig?: boolean;
  pageSize?: number;
  className?: string;
  enablePdfExport?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  onExport?: (data: T[], format: 'csv' | 'pdf') => void;
  onColumnChange?: (columns: DataTableColumn<T>[]) => void;
  onCellEdit?: (row: T, field: keyof T, value: any) => void;
}

export interface FilterConfig {
  field: string;
  operator: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte' | 'in';
  value: any;
  type: 'text' | 'number' | 'date' | 'select' | 'boolean';
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

export interface GroupConfig {
  field: string;
  expanded: boolean;
}

export interface GroupSummary {
  field: string;
  count: number;
  sum?: number;
  avg?: number;
  min?: number;
  max?: number;
}

export function DataTable<T = any>(props: DataTableProps<T>): React.ReactElement;

export function useDataTable<T = any>(props: {
  data: T[];
  columns: DataTableColumn<T>[];
  pageSize?: number;
  groupBy?: string | string[];
}): {
  filteredData: T[];
  sortedData: T[];
  paginatedData: T[];
  filters: FilterConfig[];
  sorts: SortConfig[];
  currentPage: number;
  totalPages: number;
  addFilter: (filter: FilterConfig) => void;
  removeFilter: (field: string) => void;
  clearFilters: () => void;
  addSort: (field: string) => void;
  removeSort: (field: string) => void;
  clearSorts: () => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
};

export function cn(...inputs: any[]): string;
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