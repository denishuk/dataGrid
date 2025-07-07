import React from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumn, SortConfig, FilterConfig } from './types';
import { DataTableColumnFilter } from './data-table-column-filter';
import { cn } from '@/lib/utils';

interface DataTableHeaderProps<T> {
  columns: DataTableColumn<T>[];
  sorts: SortConfig[];
  filters: FilterConfig[];
  selectedRows: T[];
  totalRows: number;
  onSort: (field: string) => void;
  onSelectAll: () => void;
  onFilterChange: (field: string, filter: FilterConfig | null) => void;
  showSelection: boolean;
  showFilters?: boolean;
}

export function DataTableHeader<T>({
  columns,
  sorts,
  filters,
  selectedRows,
  totalRows,
  onSort,
  onSelectAll,
  onFilterChange,
  showSelection,
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
          minWidth: column.minWidth,
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
                    className="p-0 h-4 w-4"
                    onClick={() => onSort(String(column.field))}
                  >
                    {getSortIcon(String(column.field))}
                  </Button>
                )}
              </>
            )}
          </div>
          
          {/* Column Filter */}
          {showFilters && (
            <div className="w-full">
              <DataTableColumnFilter
                column={column}
                filter={currentFilter}
                onFilterChange={(filter) => onFilterChange(String(column.field), filter)}
              />
            </div>
          )}
        </div>
      </th>
    );
  };

  // Check if checkbox should be pinned based on first data column
  const firstDataColumn = visibleColumns[0];
  const checkboxShouldBeLeft = firstDataColumn?.pinned === 'left';
  
  return (
    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-20">
      <tr>
        {showSelection && !checkboxShouldBeLeft && (
          <th className="w-12 px-3 py-3 text-center bg-gray-50 border-b border-gray-300">
            <Checkbox
              checked={selectedRows.length === totalRows && totalRows > 0}
              onCheckedChange={onSelectAll}
            />
          </th>
        )}
        {pinnedLeftColumns.map((column, index) => (
          <React.Fragment key={`pinned-left-${String(column.field)}`}>
            {/* Render checkbox with first pinned left column */}
            {showSelection && checkboxShouldBeLeft && index === 0 && (
              <th className={cn(
                "w-12 px-3 py-3 text-center bg-gray-50/80 backdrop-blur-sm border-b border-gray-300",
                "sticky left-0 z-20"
              )}>
                <Checkbox
                  checked={selectedRows.length === totalRows && totalRows > 0}
                  onCheckedChange={onSelectAll}
                />
              </th>
            )}
            {renderHeaderCell(column, true)}
          </React.Fragment>
        ))}
        {unpinnedColumns.map(column => renderHeaderCell(column))}
        {pinnedRightColumns.map(column => renderHeaderCell(column, true))}
      </tr>
    </thead>
  );
}
