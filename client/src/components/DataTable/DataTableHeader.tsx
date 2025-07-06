import React from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumn, SortConfig } from './types';
import { cn } from '@/lib/utils';

interface DataTableHeaderProps<T> {
  columns: DataTableColumn<T>[];
  sorts: SortConfig[];
  selectedRows: T[];
  totalRows: number;
  onSort: (field: string) => void;
  onSelectAll: () => void;
  showSelection: boolean;
}

export function DataTableHeader<T>({
  columns,
  sorts,
  selectedRows,
  totalRows,
  onSort,
  onSelectAll,
  showSelection,
}: DataTableHeaderProps<T>) {
  const getSortIcon = (field: string) => {
    const sort = sorts.find(s => s.field === field);
    if (!sort) return <ArrowUpDown className="h-4 w-4" />;
    return sort.direction === 'asc' ? 
      <ArrowUp className="h-4 w-4 text-primary-500" /> : 
      <ArrowDown className="h-4 w-4 text-primary-500" />;
  };

  const visibleColumns = columns.filter(col => !col.hidden);
  const pinnedLeftColumns = visibleColumns.filter(col => col.pinned === 'left');
  const unpinnedColumns = visibleColumns.filter(col => !col.pinned);
  const pinnedRightColumns = visibleColumns.filter(col => col.pinned === 'right');

  const renderHeaderCell = (column: DataTableColumn<T>, isPinned: boolean = false) => (
    <th
      key={String(column.field)}
      className={cn(
        "px-4 py-3 text-left",
        isPinned && "sticky z-20",
        column.pinned === 'left' && "left-0 bg-primary-50 border-r border-primary-200",
        column.pinned === 'right' && "right-0 bg-primary-50 border-l border-primary-200"
      )}
      style={{
        minWidth: column.minWidth,
        maxWidth: column.maxWidth,
        width: column.width,
      }}
    >
      <div className="flex items-center gap-2">
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
      </div>
    </th>
  );

  return (
    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
      <tr>
        {showSelection && (
          <th className="px-4 py-3 text-left">
            <Checkbox
              checked={selectedRows.length === totalRows && totalRows > 0}
              onCheckedChange={onSelectAll}
            />
          </th>
        )}
        {pinnedLeftColumns.map(column => renderHeaderCell(column, true))}
        {unpinnedColumns.map(column => renderHeaderCell(column))}
        {pinnedRightColumns.map(column => renderHeaderCell(column, true))}
      </tr>
    </thead>
  );
}
