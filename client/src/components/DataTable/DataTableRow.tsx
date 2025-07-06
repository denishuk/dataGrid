import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumn } from './types';
import { cn } from '@/lib/utils';

interface DataTableRowProps<T> {
  row: T;
  columns: DataTableColumn<T>[];
  isSelected: boolean;
  showSelection: boolean;
  onRowSelect: (row: T) => void;
  onRowEdit?: (row: T) => void;
  onRowDelete?: (row: T) => void;
}

export function DataTableRow<T extends Record<string, any>>({
  row,
  columns,
  isSelected,
  showSelection,
  onRowSelect,
  onRowEdit,
  onRowDelete,
}: DataTableRowProps<T>) {
  const visibleColumns = columns.filter(col => !col.hidden);
  const pinnedLeftColumns = visibleColumns.filter(col => col.pinned === 'left');
  const unpinnedColumns = visibleColumns.filter(col => !col.pinned);
  const pinnedRightColumns = visibleColumns.filter(col => col.pinned === 'right');

  const renderCell = (column: DataTableColumn<T>, isPinned: boolean = false) => {
    const value = row[column.field];
    const displayValue = column.cellRenderer ? column.cellRenderer(value, row) : value;

    return (
      <td
        key={String(column.field)}
        className={cn(
          "px-4 py-3",
          isPinned && "sticky z-10",
          column.pinned === 'left' && "left-0 bg-primary-50 border-r border-primary-200",
          column.pinned === 'right' && "right-0 bg-primary-50 border-l border-primary-200"
        )}
        style={{
          minWidth: column.minWidth,
          maxWidth: column.maxWidth,
          width: column.width,
        }}
      >
        {displayValue}
      </td>
    );
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {showSelection && (
        <td className="px-4 py-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onRowSelect(row)}
          />
        </td>
      )}
      {pinnedLeftColumns.map(column => renderCell(column, true))}
      {unpinnedColumns.map(column => renderCell(column))}
      {pinnedRightColumns.map(column => renderCell(column, true))}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {onRowEdit && (
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-6 w-6"
              onClick={() => onRowEdit(row)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onRowDelete && (
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-6 w-6"
              onClick={() => onRowDelete(row)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}
