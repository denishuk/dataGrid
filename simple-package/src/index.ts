// Main DataTable component export
export { DataTable } from './components/DataTable/DataTable'

// Hook exports
export { useDataTable } from './components/DataTable/hooks/use-data-table'

// Type exports
export type {
  DataTableColumn,
  DataTableProps,
  FilterConfig,
  SortConfig,
  GroupConfig,
  GroupSummary,
  DataTableSortOptions,
  DataTableSelectionOptions
} from './components/DataTable/types'

// Utility exports
export { cn } from './lib/utils'

// Sample data exports for demos
export { employees, employeeColumns } from './data/employees'
export type { Employee } from './data/employees'
