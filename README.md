# Advanced DataTable Component

A comprehensive React data table component built with TypeScript, offering advanced functionality for complex data management and visualization.

## Features Overview

### 🚀 Core Features

- **Virtual Scrolling**: Handles thousands of rows efficiently with smooth performance
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **TypeScript Support**: Full type safety with comprehensive TypeScript integration
- **Server-Side Compatible**: Works with both client-side and server-side data

### 📊 Data Management

- **Advanced Sorting**: Multi-column sorting with customizable sort functions
- **Intelligent Filtering**: Column-specific filters with various operators (contains, equals, greater than, etc.)
- **Multi-Level Grouping**: Group data by multiple columns with automatic summaries
- **Data Export**: Export to CSV format with customizable column selection
- **Pagination**: Configurable page sizes with navigation controls

### 🎨 User Interface

- **Blue Action Bar**: Centralized control panel with all major actions
- **Column Configuration Modal**: Drag-and-drop column reordering with visibility controls
- **Sticky Header**: Always-visible column headers during scrolling
- **Sticky Footer**: Configurable summary row with calculations
- **Fullscreen Mode**: Expand table to fill entire viewport
- **Filter Indicators**: Visual badges showing active filters with quick clear options

### ✏️ Interactive Features

- **Inline Cell Editing**: Double-click any editable cell to modify values
- **Row Selection**: Single or multiple row selection modes
- **Column Pinning**: Pin important columns to left or right with visual shadows
- **Custom Renderers**: Override default cell and header templates
- **Hover Effects**: Interactive feedback for better user experience

### 🔧 Column Features

- **Pinning**: Pin columns to left or right sides with shadow indicators
- **Visibility Control**: Show/hide columns dynamically
- **Resizing**: Configurable min/max widths
- **Type-Specific Editing**: Different editors for text, number, select, and boolean types
- **Custom Formatting**: Apply custom cell renderers for specialized display

## Installation & Setup

```bash
npm install
npm run dev
```

## Usage Example

```tsx
import { DataTable, DataTableColumn } from '@/components/DataTable';
import { Employee } from '@shared/schema';

const columns: DataTableColumn<Employee>[] = [
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    filterable: true,
    editable: true,
    pinned: 'left',
  },
  {
    field: 'department',
    header: 'Department',
    type: 'select',
    options: ['Engineering', 'Marketing', 'Sales'],
    sortable: true,
    filterable: true,
    groupable: true,
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

function MyComponent() {
  const [selectedRows, setSelectedRows] = useState<Employee[]>([]);

  return (
    <DataTable
      data={employees}
      columns={columns}
      selectionMode="multiple"
      virtualScrolling={true}
      onRowSelect={setSelectedRows}
      onCellEdit={(row, field, value) => {
        // Handle cell edits
        console.log(`Updated ${field} to ${value} for ${row.name}`);
      }}
    />
  );
}
```

## Column Configuration

### Basic Column Properties

```tsx
interface DataTableColumn<T> {
  field: keyof T;              // Data field name
  header: string;              // Display header text
  sortable?: boolean;          // Enable sorting
  filterable?: boolean;        // Enable filtering
  groupable?: boolean;         // Enable grouping
  editable?: boolean;          // Enable inline editing
  hidden?: boolean;            // Hide column
  pinned?: 'left' | 'right';   // Pin column position
  type?: 'text' | 'number' | 'date' | 'select' | 'boolean';
  width?: number;              // Fixed width
  minWidth?: number;           // Minimum width
  maxWidth?: number;           // Maximum width
  options?: string[];          // Options for select type
}
```

### Advanced Column Features

```tsx
// Custom cell renderer
{
  field: 'status',
  header: 'Status',
  cellRenderer: (value, row) => (
    <Badge variant={value === 'Active' ? 'default' : 'secondary'}>
      {value}
    </Badge>
  ),
}

// Custom header renderer
{
  field: 'name',
  header: 'Employee Name',
  headerRenderer: (column) => (
    <div className="flex items-center gap-2">
      <UserIcon className="h-4 w-4" />
      <span>{column.header}</span>
    </div>
  ),
}
```

## Component Props

### DataTable Props

```tsx
interface DataTableProps<T> {
  data: T[];                                    // Data array
  columns: DataTableColumn<T>[];                // Column definitions
  groupBy?: string | string[];                  // Initial grouping
  virtualScrolling?: boolean;                   // Enable virtual scrolling
  selectionMode?: 'single' | 'multiple' | 'none'; // Row selection mode
  stickyHeader?: boolean;                       // Sticky header
  showFilters?: boolean;                        // Show column filters
  showColumnConfig?: boolean;                   // Show column config
  pageSize?: number;                           // Rows per page
  className?: string;                          // Custom CSS classes
  onRowSelect?: (selectedRows: T[]) => void;   // Selection callback
  onExport?: (data: T[], format: 'csv') => void; // Export callback
  onColumnChange?: (columns: DataTableColumn<T>[]) => void; // Column change callback
  onCellEdit?: (row: T, field: keyof T, value: any) => void; // Cell edit callback
}
```

## Styling & Theming

The component uses Tailwind CSS with a consistent design system:

- **Primary Colors**: Blue accent (#3B82F6)
- **Background**: Gray-50 for headers, white for content
- **Shadows**: Subtle shadows for pinned columns
- **Hover States**: Light gray hover effects
- **Typography**: Clean, readable fonts with proper contrast

### Custom CSS Classes

```css
/* Pinned column shadows */
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }

/* Backdrop blur for sticky elements */
.backdrop-blur-sm { backdrop-filter: blur(4px); }

/* Semi-transparent backgrounds */
.bg-white/95 { background-color: rgba(255, 255, 255, 0.95); }
```

## Advanced Features

### Filtering System

The component supports multiple filter types:

- **Text**: Contains, equals, starts with, ends with
- **Number**: Greater than, less than, equals, ranges
- **Select**: Dropdown with predefined options
- **Boolean**: True/false toggle
- **Date**: Date range selection (future enhancement)

### Grouping & Summaries

When grouping is enabled:

- Automatic group headers with expand/collapse
- Numeric columns show sum and average
- Count of items in each group
- Configurable summary calculations

### Export Functionality

- **CSV Export**: Full data export with proper escaping
- **Custom Export**: Hook for implementing additional formats
- **Filtered Data**: Only exports currently filtered data
- **Column Selection**: Respects hidden column settings

## Performance Optimizations

- **Virtual Scrolling**: Only renders visible rows
- **Memoization**: Prevents unnecessary re-renders
- **Efficient Filtering**: Optimized filter algorithms
- **Lazy Loading**: Components load only when needed
- **Debounced Input**: Prevents excessive filter operations

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Architecture

### File Structure

```
DataTable/
├── DataTable.tsx                    # Main component
├── data-table-action-bar.tsx       # Blue action bar
├── data-table-column-config.tsx    # Column configuration
├── data-table-column-config-modal.tsx # Modal wrapper
├── data-table-column-filter.tsx    # Column filters
├── data-table-editable-cell.tsx    # Inline editing
├── data-table-group-header.tsx     # Group headers
├── data-table-header.tsx           # Table header
├── data-table-pagination.tsx       # Pagination controls
├── data-table-row.tsx              # Table rows
├── data-table-sticky-footer.tsx    # Summary footer
├── hooks/
│   ├── use-data-table.ts           # Main data logic
│   └── use-virtualization.ts       # Virtual scrolling
├── utils/
│   ├── data-utils.ts               # Data operations
│   └── export-utils.ts             # Export functions
├── types.ts                        # TypeScript definitions
└── index.tsx                       # Public exports
```

### Dependencies

- **React 18+**: Core framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling system
- **Radix UI**: Accessible components
- **Lucide React**: Icon library
- **React Beautiful DnD**: Drag and drop
- **React Hook Form**: Form management

## Contributing

The component follows modern React patterns:

- Functional components with hooks
- TypeScript for type safety
- Modular architecture
- Reusable custom hooks
- Proper error boundaries
- Accessibility support

## Future Enhancements

- [ ] Date range filtering
- [ ] Multi-column sorting indicators
- [ ] Keyboard navigation
- [ ] Column resizing handles
- [ ] Print-friendly layouts
- [ ] Advanced search with operators
- [ ] Saved filter presets
- [ ] Column templates
- [ ] Data validation
- [ ] Undo/redo functionality

## License

MIT License - see LICENSE file for details.