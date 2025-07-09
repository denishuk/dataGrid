# DataTable with Standalone CSS Example

This example shows how to use the DataTable component with the standalone CSS file to avoid Tailwind CSS purging issues in external applications.

## Installation

```bash
npm install advanced-react-datatable
```

## Basic Usage with Standalone CSS

### Option 1: Import CSS in your bundler

```javascript
// App.js or your main component
import React from 'react';
import { DataTable } from 'advanced-react-datatable';
import 'advanced-react-datatable/dist/datatable.css'; // Import standalone CSS

const employees = [
  { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering', salary: 75000 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Marketing', salary: 65000 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', department: 'Sales', salary: 60000 }
];

const columns = [
  { field: 'name', header: 'Name', sortable: true, filterable: true },
  { field: 'email', header: 'Email', sortable: true, filterable: true },
  { field: 'department', header: 'Department', sortable: true, filterable: true, groupable: true },
  { field: 'salary', header: 'Salary', sortable: true, filterable: true, type: 'number' }
];

function App() {
  return (
    <div className="p-4">
      <h1>Employee Data</h1>
      <DataTable
        data={employees}
        columns={columns}
        pageSize={10}
        showFilters={true}
        showColumnConfig={true}
        virtualScrolling={false}
        stickyHeader={true}
        onRowSelect={(selectedRows) => console.log('Selected:', selectedRows)}
      />
    </div>
  );
}

export default App;
```

### Option 2: Include CSS in HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>DataTable Example</title>
  <link rel="stylesheet" href="node_modules/advanced-react-datatable/dist/datatable.css">
</head>
<body>
  <div id="root"></div>
  <script src="your-bundle.js"></script>
</body>
</html>
```

## Advanced Features Example

```javascript
import React, { useState } from 'react';
import { DataTable } from 'advanced-react-datatable';
import 'advanced-react-datatable/dist/datatable.css';

const advancedColumns = [
  {
    field: 'id',
    header: 'ID',
    width: 60,
    pinned: 'left',
    useSelection: true // Enable checkbox selection
  },
  {
    field: 'name',
    header: 'Full Name',
    sortable: true,
    filterable: true,
    editable: true,
    minWidth: 200
  },
  {
    field: 'email',
    header: 'Email Address',
    sortable: true,
    filterable: true,
    editable: true
  },
  {
    field: 'department',
    header: 'Department',
    sortable: true,
    filterable: true,
    groupable: true,
    type: 'select',
    options: ['Engineering', 'Marketing', 'Sales', 'HR']
  },
  {
    field: 'salary',
    header: 'Salary',
    sortable: true,
    filterable: true,
    type: 'number',
    aggregation: 'avg', // Show average in footer
    cellRenderer: (value) => `$${value.toLocaleString()}`
  },
  {
    field: 'active',
    header: 'Active',
    type: 'boolean',
    filterable: true
  },
  {
    field: 'actions',
    header: 'Actions',
    pinned: 'right',
    width: 100,
    cellRenderer: (_, row) => (
      <div className="flex gap-2">
        <button onClick={() => console.log('Edit', row)}>Edit</button>
        <button onClick={() => console.log('Delete', row)}>Delete</button>
      </div>
    )
  }
];

function AdvancedDataTableExample() {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering', salary: 75000, active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Marketing', salary: 65000, active: true },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', department: 'Sales', salary: 60000, active: false },
    // ... more data
  ]);

  const handleCellEdit = (row, field, value) => {
    const updatedData = data.map(item => 
      item.id === row.id ? { ...item, [field]: value } : item
    );
    setData(updatedData);
  };

  const handleExport = (exportData, format) => {
    if (format === 'csv') {
      // Implement CSV export
      const csv = exportData.map(row => 
        Object.values(row).join(',')
      ).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.csv';
      a.click();
    }
  };

  return (
    <div className="p-4">
      <h1>Advanced DataTable Example</h1>
      <DataTable
        data={data}
        columns={advancedColumns}
        groupBy={['department']} // Group by department
        pageSize={10}
        showFilters={true}
        showColumnConfig={true}
        virtualScrolling={true}
        stickyHeader={true}
        stickyFooter={true}
        enablePdfExport={true}
        onRowSelect={(selectedRows) => console.log('Selected:', selectedRows)}
        onCellEdit={handleCellEdit}
        onExport={handleExport}
        className="border rounded-lg"
      />
    </div>
  );
}

export default AdvancedDataTableExample;
```

## CSS Customization

You can override the default styles by adding your own CSS after importing the datatable CSS:

```css
/* Custom styles after importing datatable.css */
.datatable-action-bar {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
}

.datatable-row:hover {
  background-color: #f0f9ff;
}

.datatable-header-cell {
  background: #f8fafc;
  font-weight: 600;
}

.datatable-pagination {
  background: #f1f5f9;
}
```

## Bundle Size

The standalone CSS file is approximately:
- **Uncompressed**: 16KB
- **Gzipped**: 2.9KB

This provides complete styling for all DataTable features without requiring Tailwind CSS in your project.

## Browser Support

The standalone CSS supports:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Important Notes

1. **No Tailwind Required**: The standalone CSS file contains all necessary styles, so you don't need Tailwind CSS in your project
2. **CSS Prefix**: All classes are prefixed with `datatable-` to prevent conflicts
3. **Responsive Design**: Includes mobile-responsive styles
4. **Dark Mode**: Currently supports light mode only (dark mode support can be added if needed)
5. **Performance**: Optimized for fast rendering and smooth animations

## Troubleshooting

If styles are not applying correctly:

1. Make sure the CSS is imported before using the component
2. Check for CSS conflicts with existing styles
3. Ensure the CSS file is properly included in your build process
4. Use browser dev tools to verify the CSS classes are being applied

## Next Steps

- See the main README for complete API documentation
- Check the TypeScript definitions for prop types
- Look at the example directory for more complex use cases
- Visit the GitHub repository for updates and issue reporting