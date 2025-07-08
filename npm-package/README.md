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

## Version

Current version: 1.8.0

## Support

For issues and questions, please visit our [GitHub repository](https://github.com/denishuk/dataGrid).