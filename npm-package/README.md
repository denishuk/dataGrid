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

**Important**: If styles are not applying correctly, you may need to manually import the CSS file:

```tsx
import 'advanced-react-datatable/dist/style.css';
```

The styles include:
- Clean, professional table design without borders
- Responsive layout for mobile devices  
- Hover effects and interactive states
- Proper spacing and typography
- Pinned column shadows and effects

## Version

Current version: 1.6.2

## Support

For issues and questions, please visit our [GitHub repository](https://github.com/your-repo/advanced-react-datatable).