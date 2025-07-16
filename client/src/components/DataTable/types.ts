export interface DataTableSortOptions {
  onSort: (field: string) => void;
  getSortIcon: (field: string) => React.ReactNode;
}

export interface DataTableSelectionOptions<T> {
  totalRows: number;
  onSelectAll: () => void;
  selectedRows: T[],
}

export interface DataTableColumn<T = any> {
  field: keyof T;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  groupable?: boolean;
  pinned?: 'left' | 'right' | null;
  type?: 'text' | 'number' | 'date' | 'select' | 'boolean';
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  hidden?: boolean;
  editable?: boolean;
  useSelection?: boolean; // Enable checkbox selection for this column
  aggregation?: 'count' | 'sum' | 'avg' | 'min' | 'max'; // Aggregation function for footer
  cellRenderer?: (value: any, row: T) => React.ReactNode;
  headerRenderer?: (column: DataTableColumn<T>, sortOptions: DataTableSortOptions, selectOptions?: DataTableSelectionOptions<T>) => React.ReactNode;
  valueGetter?: (row: T) => any; // Custom value extraction for sorting, filtering, grouping
  options?: string[]; // For select type
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: DataTableColumn<T>[];
  groupBy?: string | string[];
  virtualScrolling?: boolean;
  stickyHeader?: boolean;
  stickyFooter?: boolean; // Enable sticky footer
  showFilters?: boolean;
  showColumnConfig?: boolean;
  pageSize?: number;
  className?: string;
  enablePdfExport?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  onExport?: (data: T[], format: 'csv' | 'pdf') => void;
  onColumnChange?: (columns: DataTableColumn<T>[]) => void;
  onCellEdit?: (row: T, field: keyof T, value: any) => void;
}

export interface FilterConfig<T> {
  field: string;
  valueGetter?: (row: T) => any;
  operator: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte' | 'in';
  value: any;
  type: 'text' | 'number' | 'date' | 'select' | 'boolean';
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

export interface GroupConfig {
  field: string;
  expanded: boolean;
}

export interface GroupSummary {
  field: string;
  count: number;
  sum?: number;
  avg?: number;
  min?: number;
  max?: number;
}
