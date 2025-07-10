# Advanced React DataTable

[![Tests](https://github.com/denishuk/dataGrid/actions/workflows/test.yml/badge.svg)](https://github.com/denishuk/dataGrid/actions/workflows/test.yml)
[![Coverage Status](https://codecov.io/gh/denishuk/dataGrid/branch/main/graph/badge.svg)](https://codecov.io/gh/denishuk/dataGrid)
[![npm version](https://badge.fury.io/js/advanced-react-datatable.svg)](https://badge.fury.io/js/advanced-react-datatable)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive React data grid component with advanced features like hierarchical multi-level grouping, pinned columns, inline editing, multiselect filters, and export capabilities.

![preview](preview.png)

## Features

- **Advanced Grouping**: Multi-level hierarchical grouping with drag-and-drop reordering
- **Pinned Columns**: Pin columns to left or right with modern grid layout and proper shadows
- **Inline Editing**: Double-click cells to edit values with type-specific editors
- **Multiselect Filters**: Checkbox-based filters for select and boolean columns
- **Export Functionality**: CSV and optional PDF export
- **Column Management**: Show/hide, reorder, and configure columns
- **Responsive Design**: Mobile-friendly with horizontal scrolling
- **TypeScript Support**: Full type safety with customizable column definitions
- **Sticky Headers/Footers**: Configurable sticky positioning for headers and footers
- **Selection System**: Tailwind-based checkbox selection tied to column definitions with `useSelection` property
- **Aggregation Functions**: Built-in aggregation functions (count, sum, avg, min, max) applied only when defined in column properties
- **Modern Grid Layout**: CSS Grid-based layout with proper column alignment and pinned column support
- **Pure Tailwind CSS**: No external CSS dependencies for maximum customization flexibility

## Installation

```bash
npm install advanced-react-datatable
```

## Quick Start

```tsx
import React from 'react'
import { DataTable } from 'advanced-react-datatable'

interface Employee {
  id: number
  name: string
  department: string
  salary: number
}

const employees: Employee[] = [
  { id: 1, name: 'John Doe', department: 'Engineering', salary: 85000 },
  { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 72000 }
]

const columns = [
  { field: 'name', header: 'Name', sortable: true, filterable: true },
  { field: 'department', header: 'Department', groupable: true },
  { field: 'salary', header: 'Salary', type: 'number', sortable: true }
]

function App() {
  return (
    <DataTable
      data={employees}
      columns={columns}
      showFilters={true}
      showColumnConfig={true}
      pageSize={10}
    />
  )
}
```

## Testing

This component includes comprehensive test coverage with:

- **Unit Tests**: All components and utilities are tested individually
- **Integration Tests**: Full DataTable functionality testing
- **Coverage Reports**: Detailed code coverage metrics
- **CI/CD**: Automated testing on every push and pull request

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

### Test Coverage

Current test coverage includes:
- ✅ Core DataTable component
- ✅ Filtering and sorting functionality
- ✅ Grouping and hierarchical display
- ✅ Pagination and data manipulation
- ✅ Column configuration and management
- ✅ Export functionality
- ✅ Utility functions and helpers

## API Reference

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | **Required** | Array of data objects to display |
| `columns` | `DataTableColumn<T>[]` | **Required** | Column definitions array |
| `groupBy` | `string \| string[]` | `undefined` | Fields to group by (supports multi-level grouping) |
| `virtualScrolling` | `boolean` | `false` | Enable virtual scrolling for large datasets |
| `selectionMode` | `'single' \| 'multiple' \| 'none'` | `'none'` | Row selection mode |
| `stickyHeader` | `boolean` | `true` | Keep header visible during scrolling |
| `showFilters` | `boolean` | `true` | Show column filters in header |
| `showColumnConfig` | `boolean` | `true` | Show column configuration modal |
| `pageSize` | `number` | `10` | Number of rows per page |
| `className` | `string` | `undefined` | Additional CSS classes for container |
| `enablePdfExport` | `boolean` | `false` | Enable PDF export button (requires PDF library) |
| `onRowSelect` | `(rows: T[]) => void` | `undefined` | Callback when rows are selected |
| `onExport` | `(data: T[], format: 'csv' \| 'pdf') => void` | `undefined` | Callback for export actions |
| `onColumnChange` | `(columns: DataTableColumn<T>[]) => void` | `undefined` | Callback when columns are reordered/configured |
| `onCellEdit` | `(row: T, field: keyof T, value: any) => void` | `undefined` | Callback when cell is edited |

### Column Definition

```tsx
interface DataTableColumn<T> {
  field: keyof T                                    // Field name from data object
  header: string                                    // Display name for column header
  sortable?: boolean                               // Enable sorting (default: false)
  filterable?: boolean                             // Enable filtering (default: false)
  groupable?: boolean                              // Enable grouping (default: false)
  pinned?: 'left' | 'right' | null                // Pin column to side (default: null)
  type?: 'text' | 'number' | 'date' | 'select' | 'boolean'  // Data type for filtering/editing
  width?: number                                   // Fixed column width in pixels
  minWidth?: number                                // Minimum column width in pixels
  maxWidth?: number                                // Maximum column width in pixels
  hidden?: boolean                                 // Hide column (default: false)
  editable?: boolean                               // Enable inline editing (default: false)
  useSelection?: boolean                           // Enable checkbox selection for this column
  aggregation?: 'count' | 'sum' | 'avg' | 'min' | 'max'  // Aggregation function for footer
  cellRenderer?: (value: any, row: T) => React.ReactNode  // Custom cell renderer
  headerRenderer?: (column: DataTableColumn<T>, sortOptions: DataTableSortOptions, selectOptions?: DataTableSelectionOptions<T>) => React.ReactNode  // Custom header renderer
  valueGetter?: (row: T) => any                    // Custom value extraction for sorting/filtering
  options?: string[]                               // Options for select type columns
}

// Supporting interfaces for headerRenderer
interface DataTableSortOptions {
  onSort: (field: string) => void
  getSortIcon: (field: string) => React.ReactNode
}

interface DataTableSelectionOptions<T> {
  totalRows: number
  onSelectAll: () => void
  selectedRows: T[]
}
```

### Filter Configuration

```tsx
interface FilterConfig {
  field: string                                    // Field to filter
  operator: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte' | 'in'
  value: any                                       // Filter value
  type: 'text' | 'number' | 'date' | 'select' | 'boolean'  // Filter type
}
```

### Sort Configuration

```tsx
interface SortConfig {
  field: string                                    // Field to sort by
  direction: 'asc' | 'desc'                       // Sort direction
}
```

### Group Configuration

```tsx
interface GroupConfig {
  field: string                                    // Field to group by
  expanded: boolean                                // Group expansion state
}
```

### Group Summary

```tsx
interface GroupSummary {
  field: string                                    // Field being summarized
  count: number                                    // Number of items in group
  sum?: number                                     // Sum of numeric values
  avg?: number                                     // Average of numeric values
  min?: number                                     // Minimum value
  max?: number                                     // Maximum value
}
```

## Styling

### Tailwind CSS Integration

To ensure all component styles are properly applied, import the component's Tailwind styles in your main CSS file:

```css
@source "../../node_modules/advanced-react-datatable";
```

This approach ensures all Tailwind CSS classes used by the component are available and won't be purged by your build process.

### Standalone CSS (Alternative)

If you prefer not to use Tailwind CSS or need standalone styles, you can import the pre-built CSS file:

```tsx
import 'advanced-react-datatable/dist/datatable.css'
```

This includes all component styles as a 16KB standalone CSS file that works independently of Tailwind CSS.

## Development

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/denishuk/dataGrid.git
cd dataGrid

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
```

### Building

```bash
# Build for production
npm run build

# Build NPM package
cd npm-package
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for your changes
5. Ensure all tests pass (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support the Project

If you find this DataTable component useful, please consider supporting its development:

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://www.paypal.com/donate/?hosted_button_id=V99JQD5H894BW)

### Donation Options

**PayPal**: [https://www.paypal.com/donate/?hosted_button_id=V99JQD5H894BW](https://www.paypal.com/donate/?hosted_button_id=V99JQD5H894BW)

**QR Code for Mobile Donations**:

<img src="donation-qr.png" alt="Donation QR Code" width="200" height="200">

Your contributions help maintain and improve this project. Every donation, no matter how small, is greatly appreciated and helps keep the project active and up-to-date.

## Support

- 🐛 [Report bugs](https://github.com/denishuk/dataGrid/issues)
- 💡 [Request features](https://github.com/denishuk/dataGrid/issues)
- 📖 [Documentation](https://github.com/denishuk/dataGrid/wiki)
- 💬 [Discussions](https://github.com/denishuk/dataGrid/discussions)