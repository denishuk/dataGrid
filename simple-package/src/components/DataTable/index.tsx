// Main DataTable component export
export { DataTable } from './DataTable'

// Hook exports
export { useDataTable } from './hooks/use-data-table'

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
} from './types'

// Utility exports
export { cn } from '../../lib/utils'

// Sample data exports for demos
export { employees, employeeColumns } from '../../data/employees'
export type { Employee } from '../../data/employees'