# Advanced React DataTable

[![npm version](https://badge.fury.io/js/advanced-react-datatable.svg)](https://badge.fury.io/js/advanced-react-datatable)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive React data grid component with advanced features like hierarchical multi-level grouping, pinned columns, inline editing, multiselect filters, and export capabilities.

## 🚀 Features

- **Advanced Grouping**: Multi-level hierarchical grouping with drag-and-drop reordering
- **Pinned Columns**: Pin columns to left or right with proper shadow effects
- **Inline Editing**: Double-click cells to edit values with type-specific editors
- **Multiselect Filters**: Checkbox-based filters for select and boolean columns
- **Export Functionality**: CSV and optional PDF export
- **Column Management**: Show/hide, reorder, and configure columns
- **Responsive Design**: Mobile-friendly with horizontal scrolling
- **TypeScript Support**: Full type safety with customizable column definitions
- **Sticky Headers/Footers**: Persistent headers and configurable summary footers
- **Actions Column**: Professional dropdown menu for row operations

## 📦 Installation

```bash
npm install advanced-react-datatable
```

## 🔧 React Version Compatibility

This package supports:
- **React 18.x** ✅
- **React 19.x** ✅
- **Future React versions** ✅

## 🚀 Quick Start

```tsx
import React from 'react'
import { DataTable } from 'advanced-react-datatable'
import type { DataTableColumn } from 'advanced-react-datatable'

interface Employee {
  id: number
  name: string
  department: string
  salary: number
  active: boolean
}

const employees: Employee[] = [
  { id: 1, name: 'John Doe', department: 'Engineering', salary: 85000, active: true },
  { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 72000, active: true }
]

const columns: DataTableColumn<Employee>[] = [
  { 
    field: 'name', 
    header: 'Name', 
    sortable: true, 
    filterable: true,
    pinned: 'left'
  },
  { 
    field: 'department', 
    header: 'Department', 
    type: 'select',
    groupable: true,
    filterable: true 
  },
  { 
    field: 'salary', 
    header: 'Salary', 
    type: 'number', 
    sortable: true,
    cellRenderer: (value) => `$${value.toLocaleString()}`
  },
  {
    field: 'active',
    header: 'Active',
    type: 'boolean',
    filterable: true
  }
]

function App() {
  const handleCellEdit = (row: Employee, field: keyof Employee, value: any) => {
    console.log('Cell edited:', { row, field, value })
    // Update your data here
  }

  const handleExport = (data: Employee[], format: 'csv' | 'pdf') => {
    console.log('Export requested:', { format, data })
    // Handle export logic
  }

  return (
    <div className="p-6">
      <DataTable
        data={employees}
        columns={columns}
        showFilters={true}
        showColumnConfig={true}
        selectionMode="multiple"
        pageSize={25}
        enablePdfExport={true}
        onCellEdit={handleCellEdit}
        onExport={handleExport}
        groupBy={['department']}
      />
    </div>
  )
}

export default App
```

## 📚 API Reference

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | **required** | Array of data objects |
| `columns` | `DataTableColumn<T>[]` | **required** | Column definitions |
| `groupBy` | `string \| string[]` | `undefined` | Fields to group by |
| `selectionMode` | `'single' \| 'multiple' \| 'none'` | `'none'` | Row selection mode |
| `showFilters` | `boolean` | `false` | Show column filters |
| `showColumnConfig` | `boolean` | `false` | Show column configuration |
| `pageSize` | `number` | `10` | Number of rows per page |
| `enablePdfExport` | `boolean` | `false` | Enable PDF export button |
| `stickyHeader` | `boolean` | `true` | Make header sticky |
| `virtualScrolling` | `boolean` | `false` | Enable virtual scrolling |
| `className` | `string` | `undefined` | Additional CSS classes |

### Column Definition

```tsx
interface DataTableColumn<T> {
  field: keyof T                              // Field name from data object
  header: string                              // Display header text
  sortable?: boolean                          // Enable sorting
  filterable?: boolean                        // Enable filtering
  groupable?: boolean                         // Allow grouping by this column
  pinned?: 'left' | 'right' | null           // Pin column position
  type?: 'text' | 'number' | 'date' | 'select' | 'boolean'  // Data type
  width?: number                              // Fixed column width
  minWidth?: number                           // Minimum column width
  maxWidth?: number                           // Maximum column width
  hidden?: boolean                            // Hide column
  editable?: boolean                          // Enable inline editing
  cellRenderer?: (value: any, row: T) => React.ReactNode  // Custom cell content
  headerRenderer?: (column: DataTableColumn<T>) => React.ReactNode  // Custom header
  options?: string[]                          // Options for select type
}
```

### Event Callbacks

```tsx
// Row selection callback
onRowSelect?: (selectedRows: T[]) => void

// Export callback
onExport?: (data: T[], format: 'csv' | 'pdf') => void

// Cell edit callback
onCellEdit?: (row: T, field: keyof T, value: any) => void

// Column configuration change
onColumnChange?: (columns: DataTableColumn<T>[]) => void
```

## 🎨 Styling

The component uses Tailwind CSS and requires these peer dependencies:

```bash
npm install tailwindcss @tailwindcss/typography
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install lucide-react class-variance-authority clsx tailwind-merge
```

### Tailwind Configuration

Add to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/advanced-react-datatable/dist/**/*.js"
  ],
  theme: {
    extend: {
      // Your theme extensions
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
```

## 🔄 Advanced Features

### Multi-Level Grouping

```tsx
<DataTable
  data={data}
  columns={columns}
  groupBy={['department', 'location']}  // Hierarchical grouping
/>
```

### Custom Cell Renderers

```tsx
const columns = [
  {
    field: 'salary',
    header: 'Salary',
    cellRenderer: (value: number) => (
      <span className="font-bold text-green-600">
        ${value.toLocaleString()}
      </span>
    )
  }
]
```

### Pinned Columns

```tsx
const columns = [
  { field: 'name', header: 'Name', pinned: 'left' },
  { field: 'actions', header: 'Actions', pinned: 'right' }
]
```

### Export Functionality

```tsx
const handleExport = (data, format) => {
  if (format === 'csv') {
    // Handle CSV export
    const csv = convertToCSV(data)
    downloadFile(csv, 'data.csv', 'text/csv')
  } else if (format === 'pdf') {
    // Handle PDF export
    generatePDF(data)
  }
}

<DataTable
  data={data}
  columns={columns}
  enablePdfExport={true}
  onExport={handleExport}
/>
```

## 🎯 Examples

### Basic Data Grid
```tsx
<DataTable data={users} columns={userColumns} />
```

### Advanced Configuration
```tsx
<DataTable
  data={employees}
  columns={employeeColumns}
  showFilters={true}
  showColumnConfig={true}
  selectionMode="multiple"
  groupBy={['department']}
  pageSize={50}
  enablePdfExport={true}
  stickyHeader={true}
  onCellEdit={handleCellEdit}
  onRowSelect={handleRowSelection}
  onExport={handleExport}
  className="rounded-lg border"
/>
```

## 🛠️ Development

### Building from Source

```bash
git clone https://github.com/yourusername/advanced-react-datatable.git
cd advanced-react-datatable
npm install
npm run build
```

### Running Tests

```bash
npm test
npm run test:coverage
```

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed list of changes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for your changes
5. Ensure all tests pass (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 🐛 [Report bugs](https://github.com/yourusername/advanced-react-datatable/issues)
- 💡 [Request features](https://github.com/yourusername/advanced-react-datatable/issues)
- 📖 [Documentation](https://github.com/yourusername/advanced-react-datatable/wiki)
- 💬 [Discussions](https://github.com/yourusername/advanced-react-datatable/discussions)

## 🏆 Why Choose Advanced React DataTable?

- **Production Ready**: Thoroughly tested with comprehensive test coverage
- **TypeScript First**: Built with TypeScript for better developer experience
- **Highly Customizable**: Extensive configuration options for any use case
- **Performance Optimized**: Virtual scrolling and efficient rendering
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Mobile Friendly**: Responsive design that works on all devices
- **Modern Stack**: Built with latest React patterns and best practices