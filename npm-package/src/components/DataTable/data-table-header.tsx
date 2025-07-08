
import { ArrowDown, ArrowUp, ArrowUpDown, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { DataTableColumn, FilterConfig, SortConfig } from './types';
import { DataTableColumnFilter } from './data-table-column-filter';
import { cn } from '@/lib/utils';

interface DataTableHeaderProps<T> {
  columns: DataTableColumn<T>[];
  sorts: SortConfig[];
  filters: FilterConfig[];
  selectedRows: T[];
  totalRows: number;
  data: T[];
  onSort: (field: string) => void;
  onSelectAll: () => void;
  onFilterChange: (field: string, filter: FilterConfig | null) => void;
  showFilters?: boolean;
}

export function DataTableHeader<T>({
  columns,
  sorts,
  filters,
  selectedRows,
  totalRows,
  data,
  onSort,
  onSelectAll,
  onFilterChange,
  // showSelection,
  showFilters = true,
}: DataTableHeaderProps<T>) {
  const getSortIcon = (field: string) => {
    const sort = sorts?.find(s => s.field === field);
    if (!sort) return <ArrowUpDown className="h-4 w-4" />;
    return sort.direction === 'asc' ?
      <ArrowUp className="h-4 w-4 text-primary-500" /> :
      <ArrowDown className="h-4 w-4 text-primary-500" />;
  };

  const visibleColumns = columns.filter(col => !col.hidden);
  const pinnedLeftColumns = visibleColumns.filter(col => col.pinned === 'left');
  const unpinnedColumns = visibleColumns.filter(col => !col.pinned);
  const pinnedRightColumns = visibleColumns.filter(col => col.pinned === 'right');

  const renderHeaderCell = (column: DataTableColumn<T>, isPinned: boolean = false) => {
    const currentFilter = filters?.find(f => f.field === String(column.field));

    // Render checkbox header for selection column
    if (column.useSelection) {
      return (
        <th
          key={String(column.field)}
          className={cn(
            "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            "bg-gray-50 border-b border-gray-200",
            isPinned && "sticky z-20",
            column.pinned === 'left' && "left-0 border-r",
            column.pinned === 'right' && "right-0 border-l"
          )}
          style={{
            minWidth: column.minWidth || 50,
            maxWidth: column.maxWidth || 50,
            width: column.width || 50,
          }}
        >
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              checked={selectedRows.length === totalRows && totalRows > 0}
              onChange={onSelectAll}
              className={cn(
                "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600",
                "transition-all duration-150 ease-in-out",
                "hover:scale-110 focus:scale-110",
                selectedRows.length === totalRows && totalRows > 0 && "animate-pulse"
              )}
            />
          </div>
        </th>
      );
    }

    return (
      <th
        key={String(column.field)}
        className={cn(
          "px-4 py-3 text-left bg-gray-50 border-b border-gray-300",
          isPinned && "sticky z-20 bg-gray-50/95 backdrop-blur-sm",
          column.pinned === 'left' && "left-0 border-r border-gray-300 shadow-lg",
          column.pinned === 'right' && "right-0 border-l border-gray-300 shadow-lg"
        )}
        style={{
          minWidth: column.minWidth || (column.filterable ? '180px' : '120px'),
          maxWidth: column.maxWidth,
          width: column.width,
        }}
      >
        <div className="space-y-2">
          {/* Header Content */}
          <div className="flex items-center gap-2">
            {column.headerRenderer ? (
              column.headerRenderer(column)
            ) : (
              <>
                <span className="font-medium text-gray-900">{column.header}</span>
                {column.pinned && <Pin className="h-3 w-3 text-primary-500" />}
                {column.sortable && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "p-0 h-4 w-4",
                      "transition-all duration-200 ease-in-out",
                      "hover:scale-110 hover:bg-gray-100 hover:shadow-sm",
                      "active:scale-95",
                      "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                    )}
                    onClick={() => onSort(String(column.field))}
                  >
                    <div className="transition-transform duration-200 ease-in-out hover:rotate-[5deg]">
                      {getSortIcon(String(column.field))}
                    </div>
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Column Filter */}
          {showFilters && (
            <div className="w-full min-w-0">
              <DataTableColumnFilter
                column={column}
                filter={currentFilter}
                data={data}
                onFilterChange={(filter) => onFilterChange(String(column.field), filter)}
              />
            </div>
          )}
        </div>
      </th>
    );
  };

  return (
    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-20">
      <tr>
        {pinnedLeftColumns.map(column => renderHeaderCell(column, true))}
        {unpinnedColumns.map(column => renderHeaderCell(column))}
        {pinnedRightColumns.map(column => renderHeaderCell(column, true))}
      </tr>
    </thead>
  );
}
