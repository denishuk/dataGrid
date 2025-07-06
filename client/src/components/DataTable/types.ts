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
  cellRenderer?: (value: any, row: T) => React.ReactNode;
  options?: string[]; // For select type
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: DataTableColumn<T>[];
  groupBy?: string;
  virtualScrolling?: boolean;
  selectionMode?: 'single' | 'multiple' | 'none';
  stickyHeader?: boolean;
  showFilters?: boolean;
  showColumnConfig?: boolean;
  pageSize?: number;
  className?: string;
  onRowSelect?: (selectedRows: T[]) => void;
  onExport?: (data: T[], format: 'csv' | 'json') => void;
  onColumnChange?: (columns: DataTableColumn<T>[]) => void;
}

export interface FilterConfig {
  field: string;
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
