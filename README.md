# Advanced DataTable Component

A comprehensive React data grid component with advanced functionality similar to ag-grid, featuring grouping, filtering, sorting, column pinning, inline editing, and responsive design using TypeScript and Tailwind CSS.

## Features

### Core Functionality
- ✅ **Virtual Scrolling** - Efficiently handles thousands of rows with smooth scrolling performance
- ✅ **Column Pinning** - Pin important columns to the left or right side of the table
- ✅ **Advanced Sorting** - Multi-column sorting with visual indicators
- ✅ **Inline Column Filters** - Filter controls directly under each column header
- ✅ **Multi-Level Grouping** - Group data by multiple columns with expandable rows
- ✅ **Numeric Summaries** - Automatic sum calculations for grouped numeric data
- ✅ **Row Selection** - Single and multiple row selection with checkbox controls
- ✅ **Responsive Design** - Mobile-friendly layout that adapts to different screen sizes

### Advanced Features
- ✅ **Inline Cell Editing** - Double-click any editable cell to modify values
- ✅ **Custom Header Renderers** - Override column header templates with custom content
- ✅ **Custom Cell Renderers** - Apply custom formatting and styling to cell content
- ✅ **Sticky Headers** - Keep headers visible while scrolling through large datasets
- ✅ **Configurable Sticky Footer** - Optional footer with column summaries
- ✅ **Column Management** - Show/hide columns, reorder, and configure visibility
- ✅ **Export Functionality** - Export data to CSV format
- ✅ **Fullscreen Mode** - Expand the table to fill the entire screen
- ✅ **Blue Action Bar** - Centralized controls for filters, grouping, and configuration

### User Interface
- ✅ **Filter Indicators** - Visual badges showing active filters with clear options
- ✅ **Column Configuration Modal** - Modal dialog for managing column settings
- ✅ **Pagination Controls** - Navigate through large datasets with customizable page sizes
- ✅ **Keyboard Navigation** - Full keyboard accessibility support
- ✅ **Loading States** - Visual feedback during data operations
- ✅ **Error Handling** - Graceful handling of data and operation errors

### Technical Features
- ✅ **TypeScript Support** - Full type safety with customizable interfaces
- ✅ **Performance Optimized** - Efficient rendering with React optimizations
- ✅ **Accessibility** - ARIA labels and keyboard navigation support
- ✅ **Customizable** - Extensive configuration options for all features
- ✅ **Memory Efficient** - Optimized for large datasets with minimal memory usage

## Usage

### Basic Example

```tsx
import { DataTable } from '@/components/DataTable';

const columns = [
  { field: 'name', header: 'Name', sortable: true, filterable: true },
  { field: 'email', header: 'Email', sortable: true, filterable: true },
  { field: 'department', header: 'Department', groupable: true, filterable: true },
  { field: 'salary', header: 'Salary', type: 'number', sortable: true },
];

function MyComponent() {
  return (
    <DataTable
      data={employees}
      columns={columns}
      virtualScrolling={true}
      selectionMode="multiple"
      stickyHeader={true}
      onRowSelect={(selectedRows) => console.log(selectedRows)}
      onExport={(data, format) => console.log('Export:', format)}
    />
  );
}
```

### Advanced Configuration

```tsx
const advancedColumns = [
  {
    field: 'name',
    header: 'Employee Name',
    sortable: true,
    filterable: true,
    pinned: 'left',
    width: 200,
    editable: true,
    headerRenderer: (column) => (
      <div className="flex items-center gap-2">
        <User className="h-4 w-4" />
        {column.header}
      </div>
    ),
    cellRenderer: (value, row) => (
      <div className="font-medium text-blue-600">{value}</div>
    ),
  },
  {
    field: 'salary',
    header: 'Salary',
    type: 'number',
    sortable: true,
    filterable: true,
    cellRenderer: (value) => `$${value.toLocaleString()}`,
  },
];

<DataTable
  data={employees}
  columns={advancedColumns}
  groupBy="department"
  virtualScrolling={true}
  selectionMode="multiple"
  stickyHeader={true}
  showColumnConfig={true}
  pageSize={50}
  onCellEdit={(row, field, value) => updateEmployee(row.id, field, value)}
/>
```

## Column Configuration

### Column Types
- `text` - Standard text display (default)
- `number` - Numeric values with appropriate formatting
- `date` - Date values with date picker for editing
- `select` - Dropdown selection with predefined options
- `boolean` - Checkbox for true/false values

### Column Properties
- `field` - Data field name (required)
- `header` - Display name for the column (required)
- `sortable` - Enable sorting for this column
- `filterable` - Enable filtering for this column
- `groupable` - Allow grouping by this column
- `editable` - Enable inline editing for this column
- `pinned` - Pin column to 'left' or 'right'
- `width` - Fixed width in pixels
- `minWidth` - Minimum width in pixels
- `maxWidth` - Maximum width in pixels
- `hidden` - Hide column from display
- `type` - Column data type for appropriate editors
- `cellRenderer` - Custom cell rendering function
- `headerRenderer` - Custom header rendering function

## API Reference

### DataTable Props
- `data` - Array of data objects to display
- `columns` - Array of column configurations
- `groupBy` - Initial grouping field(s)
- `virtualScrolling` - Enable virtual scrolling for performance
- `selectionMode` - Row selection mode: 'single', 'multiple', or 'none'
- `stickyHeader` - Keep header visible during scrolling
- `showFilters` - Display column filters
- `showColumnConfig` - Show column configuration controls
- `pageSize` - Number of rows per page
- `className` - Additional CSS classes
- `onRowSelect` - Callback for row selection changes
- `onExport` - Callback for export operations
- `onColumnChange` - Callback for column configuration changes
- `onCellEdit` - Callback for cell value changes

### Event Handlers
- `onRowSelect(selectedRows)` - Fired when row selection changes
- `onExport(data, format)` - Fired when export is requested
- `onColumnChange(columns)` - Fired when column configuration changes
- `onCellEdit(row, field, value)` - Fired when cell value is edited

## Performance Considerations

### Large Datasets
- Enable `virtualScrolling` for datasets over 100 rows
- Use appropriate `pageSize` for optimal performance
- Consider server-side filtering and sorting for very large datasets

### Memory Usage
- Virtual scrolling reduces DOM nodes for better performance
- Pagination limits the number of rendered rows
- Efficient re-rendering through React optimization techniques

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Dependencies

- React 18+
- TypeScript 4.5+
- Tailwind CSS 3+
- Radix UI components
- Lucide React icons

## License

MIT License - see LICENSE file for details