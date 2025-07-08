# Advanced React DataTable

A comprehensive React data grid component with advanced features like pinned columns, inline editing, grouping, filtering, and export capabilities.

## Installation

```bash
npm install advanced-react-datatable
```

## Quick Start

```tsx
import { DataTable } from 'advanced-react-datatable';
// Styles are automatically imported, but you can also import them manually if needed:
// import 'advanced-react-datatable/dist/style.css';

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Marketing' },
];

const columns = [
  { field: 'name', header: 'Name', sortable: true, filterable: true },
  { field: 'email', header: 'Email', sortable: true, filterable: true },
  { field: 'department', header: 'Department', sortable: true, filterable: true, groupable: true },
  // Example with valueGetter for custom value extraction
  { 
    field: 'fullName', 
    header: 'Full Name', 
    sortable: true, 
    filterable: true,
    valueGetter: (row) => `${row.firstName} ${row.lastName}` // Custom value for sorting/filtering
  },
];

function App() {
  return (
    <DataTable
      data={data}
      columns={columns}
      pageSize={10}
      showFilters={true}
      selectionMode="multiple"
    />
  );
}
```

## Features

- **Advanced Filtering**: Column-specific filters with operators (contains, equals, etc.)
- **Multi-Level Grouping**: Group by multiple columns with hierarchical display
- **Pinned Columns**: Pin columns to left or right side
- **Inline Editing**: Double-click cells to edit values
- **Export**: CSV and PDF export capabilities
- **Responsive Design**: Mobile-friendly with horizontal scrolling
- **TypeScript**: Full type safety and IntelliSense support

## Styling

The component comes with built-in CSS styles that are automatically included when you import the component.

### Default Styles

**Important**: If styles are not applying correctly, you may need to manually import the CSS file:

```tsx
import 'advanced-react-datatable/dist/style.css';
```

### Custom Styling

You can customize the DataTable appearance by overriding the CSS classes:

```css
/* Override action bar color */
.datatable-action-bar {
  background-color: #your-color !important;
}

/* Override header styling */
.datatable-header th {
  background-color: #your-header-color !important;
  color: #your-text-color !important;
}

/* Override row hover effect */
.datatable-row:hover {
  background-color: #your-hover-color !important;
}

/* Override filter input styling */
.datatable-filter {
  border-color: #your-border-color !important;
}

/* Override pagination styling */
.datatable-pagination {
  background-color: #your-bg-color !important;
}
```

### Available CSS Classes

- `.datatable-container` - Main container
- `.datatable-action-bar` - Top action bar
- `.datatable-header` - Table header
- `.datatable-row` - Table rows
- `.datatable-filter` - Filter inputs
- `.datatable-pagination` - Pagination controls
- `.datatable-dropdown-menu` - Dropdown menus
- `.datatable-group-header` - Group headers

### Minimal Styling

For projects that prefer minimal styling, you can use your own CSS by not importing the default styles and creating your own based on the class names above.

## Column Configuration

### valueGetter Property

The `valueGetter` property allows you to define custom value extraction for sorting, filtering, and grouping:

```tsx
const columns = [
  {
    field: 'fullName',
    header: 'Full Name',
    sortable: true,
    filterable: true,
    groupable: true,
    valueGetter: (row) => `${row.firstName} ${row.lastName}`, // Custom value
  },
  {
    field: 'status',
    header: 'Status',
    sortable: true,
    filterable: true,
    valueGetter: (row) => row.active ? 'Active' : 'Inactive', // Boolean to string
  },
  {
    field: 'totalSales',
    header: 'Total Sales',
    sortable: true,
    type: 'number',
    valueGetter: (row) => row.sales.reduce((sum, sale) => sum + sale.amount, 0), // Calculated value
  },
];
```

**Priority**: `valueGetter` has higher priority than the `field` property. If `valueGetter` is defined, it will be used for sorting, filtering, and grouping operations.

### valueGetterOnGroup Property

The `valueGetterOnGroup` property allows you to customize how group headers are rendered:

```tsx
const columns = [
  {
    field: 'department',
    header: 'Department',
    groupable: true,
    valueGetterOnGroup: (groupRows, groupValue) => (
      <div className="flex items-center gap-2">
        <span className="font-bold">{groupValue}</span>
        <span className="text-sm text-gray-500">
          ({groupRows.length} employees, avg salary: ${
            groupRows.reduce((sum, row) => sum + row.salary, 0) / groupRows.length
          })
        </span>
      </div>
    )
  },
  {
    field: 'location',
    header: 'Location',
    groupable: true,
    valueGetterOnGroup: (groupRows, groupValue) => (
      <div className="flex items-center gap-2">
        <span className="font-medium">{groupValue}</span>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {groupRows.length} people
        </span>
      </div>
    )
  }
];
```

**Usage**: `valueGetterOnGroup` is called when rendering group headers and receives the array of rows in the group and the group value as parameters.

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
  cellRenderer?: (value: any, row: T) => React.ReactNode  // Custom cell renderer
  headerRenderer?: (column: DataTableColumn<T>) => React.ReactNode  // Custom header renderer
  valueGetter?: (row: T) => any                    // Custom value extraction for sorting/filtering
  valueGetterOnGroup?: (groupRows: T[], groupValue: string) => React.ReactNode  // Custom group header rendering
  options?: string[]                               // Options for select type columns
}
```

### Advanced Examples

#### Custom Cell Rendering

```tsx
const columns = [
  {
    field: 'status',
    header: 'Status',
    type: 'select',
    cellRenderer: (value, row) => (
      <span className={`badge ${value === 'active' ? 'badge-success' : 'badge-danger'}`}>
        {value}
      </span>
    )
  },
  {
    field: 'avatar',
    header: 'User',
    cellRenderer: (value, row) => (
      <div className="flex items-center gap-2">
        <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full" />
        <span>{row.name}</span>
      </div>
    )
  }
];
```

#### Pinned Columns

```tsx
const columns = [
  {
    field: 'id',
    header: 'ID',
    pinned: 'left',
    width: 80
  },
  {
    field: 'name',
    header: 'Name',
    pinned: 'left',
    minWidth: 200
  },
  {
    field: 'email',
    header: 'Email',
    filterable: true,
    sortable: true
  },
  {
    field: 'actions',
    header: 'Actions',
    pinned: 'right',
    width: 100,
    cellRenderer: (value, row) => (
      <button onClick={() => editRow(row)}>Edit</button>
    )
  }
];
```

#### Multi-Level Grouping

```tsx
<DataTable
  data={employees}
  columns={columns}
  groupBy={['department', 'location']}  // Group by department, then by location
  showFilters={true}
/>
```

#### Event Handling

```tsx
function MyComponent() {
  const handleRowSelect = (selectedRows) => {
    console.log('Selected rows:', selectedRows);
  };

  const handleCellEdit = (row, field, value) => {
    console.log(`Updated ${field} to ${value} for row:`, row);
    // Update your data source here
  };

  const handleExport = (data, format) => {
    if (format === 'csv') {
      // Handle CSV export
      const csvContent = convertToCSV(data);
      downloadFile(csvContent, 'data.csv');
    }
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      selectionMode="multiple"
      onRowSelect={handleRowSelect}
      onCellEdit={handleCellEdit}
      onExport={handleExport}
    />
  );
}
```

## Version

Current version: 1.8.0

## Support

For issues and questions, please visit our [GitHub repository](https://github.com/denishuk/dataGrid).