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
