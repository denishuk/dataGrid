# Advanced React DataTable

[![Tests](https://github.com/denishuk/dataGrid/actions/workflows/test.yml/badge.svg)](https://github.com/denishuk/dataGrid/actions/workflows/test.yml)
[![Coverage Status](https://codecov.io/gh/denishuk/dataGrid/branch/main/graph/badge.svg)](https://codecov.io/gh/denishuk/dataGrid)
[![npm version](https://badge.fury.io/js/advanced-react-datatable.svg)](https://badge.fury.io/js/advanced-react-datatable)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive React data grid component with advanced features like hierarchical multi-level grouping, pinned columns, inline editing, multiselect filters, and export capabilities.

## Features

- **Advanced Grouping**: Multi-level hierarchical grouping with drag-and-drop reordering
- **Pinned Columns**: Pin columns to left or right with proper shadow effects
- **Inline Editing**: Double-click cells to edit values with type-specific editors
- **Multiselect Filters**: Checkbox-based filters for select and boolean columns
- **Export Functionality**: CSV and optional PDF export
- **Column Management**: Show/hide, reorder, and configure columns
- **Responsive Design**: Mobile-friendly with horizontal scrolling
- **TypeScript Support**: Full type safety with customizable column definitions
- **Sticky Headers/Footers**: Persistent headers and configurable summary footers

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

| Prop | Type | Description |
|------|------|-------------|
| `data` | `T[]` | Array of data objects |
| `columns` | `DataTableColumn<T>[]` | Column definitions |
| `groupBy` | `string \| string[]` | Fields to group by |
| `selectionMode` | `'single' \| 'multiple' \| 'none'` | Row selection mode |
| `showFilters` | `boolean` | Show column filters |
| `showColumnConfig` | `boolean` | Show column configuration |
| `pageSize` | `number` | Number of rows per page |
| `enablePdfExport` | `boolean` | Enable PDF export button |
| `onRowSelect` | `(rows: T[]) => void` | Row selection callback |
| `onExport` | `(data: T[], format: string) => void` | Export callback |
| `onCellEdit` | `(row: T, field: keyof T, value: any) => void` | Cell edit callback |

### Column Definition

```tsx
interface DataTableColumn<T> {
  field: keyof T
  header: string
  sortable?: boolean
  filterable?: boolean
  groupable?: boolean
  pinned?: 'left' | 'right' | null
  type?: 'text' | 'number' | 'date' | 'select' | 'boolean'
  width?: number
  editable?: boolean
  cellRenderer?: (value: any, row: T) => React.ReactNode
  options?: string[] // For select type
}
```

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

## Support

- 🐛 [Report bugs](https://github.com/denishuk/dataGrid/issues)
- 💡 [Request features](https://github.com/denishuk/dataGrid/issues)
- 📖 [Documentation](https://github.com/denishuk/dataGrid/wiki)
- 💬 [Discussions](https://github.com/denishuk/dataGrid/discussions)