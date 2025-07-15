#!/bin/bash

# Simple build script for client-only DataTable package
echo "Building simplified client-only DataTable package..."

# Clean previous builds
rm -rf dist/

# Copy necessary files
cp package-simple.json package.json
cp vite.config.simple.ts vite.config.ts

# Build the package
npm run build

# Create README with installation instructions
cat > README.md << 'EOF'
# Advanced React DataTable

A comprehensive, customizable React DataTable component with advanced features including hierarchical grouping, pinned columns, sticky headers/footers, and export functionality.

## Features

- **Multi-level grouping** with drag-and-drop reordering
- **Pinned columns** (left/right) with shadow effects
- **Advanced filtering** with column-specific operators
- **Inline editing** with type-specific editors
- **Export functionality** (CSV and PDF)
- **Responsive design** with mobile support
- **TypeScript support** with full type safety
- **Tailwind CSS** styling with pure CSS implementation

## Installation

```bash
npm install advanced-react-datatable
```

## Usage

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

## CSS Import

Import the CSS file in your main application file:

```css
@import 'advanced-react-datatable/dist/style.css';
```

## TypeScript

The package includes full TypeScript definitions. Import types as needed:

```tsx
import { DataTableColumn, DataTableProps } from 'advanced-react-datatable'
```

## License

MIT
EOF

# Create CSS file with all necessary styles
cat > dist/style.css << 'EOF'
/* DataTable Core Styles */
.datatable-container {
  @apply relative overflow-hidden border border-gray-200 rounded-lg bg-white;
}

.datatable-grid {
  @apply grid overflow-hidden;
}

.datatable-header {
  @apply sticky top-0 z-10 bg-white border-b border-gray-200;
}

.datatable-body {
  @apply overflow-auto;
}

.datatable-row {
  @apply border-b border-gray-100 hover:bg-gray-50 transition-colors;
}

.datatable-cell {
  @apply px-3 py-2 text-sm text-gray-900 flex items-center min-h-[44px];
}

.datatable-pinned-left {
  @apply sticky left-0 z-20 bg-white shadow-sm;
}

.datatable-pinned-right {
  @apply sticky right-0 z-20 bg-white shadow-sm;
}

.datatable-filter {
  @apply px-3 py-2 border-b border-gray-200 bg-gray-50;
}

.datatable-footer {
  @apply sticky bottom-0 z-10 bg-white border-t border-gray-200;
}

.datatable-group-header {
  @apply bg-gray-100 border-b border-gray-200 font-medium;
}

.datatable-checkbox {
  @apply w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500;
}

.datatable-sort-icon {
  @apply ml-1 text-gray-400 transition-colors;
}

.datatable-filter-input {
  @apply px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.datatable-pagination {
  @apply flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200;
}

.datatable-export-button {
  @apply px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors;
}

.datatable-modal {
  @apply fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50;
}

.datatable-modal-content {
  @apply bg-white rounded-lg shadow-xl max-w-2xl w-full m-4 max-h-[90vh] overflow-auto;
}

.datatable-badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
}

.datatable-dropdown {
  @apply absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50;
}

.datatable-dropdown-item {
  @apply px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center;
}

/* Responsive styles */
@media (max-width: 768px) {
  .datatable-cell {
    @apply px-2 py-1 text-xs;
  }
  
  .datatable-pagination {
    @apply flex-col gap-2 py-2;
  }
}
EOF

echo "✅ Build complete! Package ready for distribution."
echo "📦 Files created:"
echo "  - dist/index.js (ES module)"
echo "  - dist/index.cjs (CommonJS)"
echo "  - dist/index.d.ts (TypeScript definitions)"
echo "  - dist/style.css (Standalone CSS)"
echo "  - README.md (Documentation)"

# Restore original files
git checkout package.json vite.config.ts 2>/dev/null || echo "No git repository found"