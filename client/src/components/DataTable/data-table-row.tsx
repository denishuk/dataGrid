import { useState } from 'react';

import { DataTableColumn } from './types';
import { DataTableEditableCell } from './data-table-editable-cell';
import { cn } from '@/lib/utils';

interface DataTableRowProps<T> {
  row: T;
  columns: DataTableColumn<T>[];
  isSelected: boolean;
  onRowSelect: (row: T) => void;
  onRowEdit?: (row: T) => void;
  onRowDelete?: (row: T) => void;
  onCellEdit?: (row: T, field: keyof T, value: any) => void;
}

export function DataTableRow<T extends Record<string, any>>({
  row,
  columns,
  isSelected,
  onRowSelect,
  // onRowEdit,
  // onRowDelete,
  onCellEdit,
}: DataTableRowProps<T>) {
  const [editingCell, setEditingCell] = useState<keyof T | null>(null);

  const visibleColumns = columns.filter(col => !col.hidden);
  const pinnedLeftColumns = visibleColumns.filter(col => col.pinned === 'left');
  const unpinnedColumns = visibleColumns.filter(col => !col.pinned);
  const pinnedRightColumns = visibleColumns.filter(col => col.pinned === 'right');

  const handleCellDoubleClick = (column: DataTableColumn<T>) => {
    if (column.editable && onCellEdit) {
      setEditingCell(column.field);
    }
  };

  const handleCellSave = (field: keyof T, value: any) => {
    if (onCellEdit) {
      onCellEdit(row, field, value);
    }
    setEditingCell(null);
  };

  const handleCellCancel = () => {
    setEditingCell(null);
  };

  const renderCell = (column: DataTableColumn<T>, isPinned: boolean = false) => {
    const value = column.valueGetter ? column.valueGetter(row) : row[column.field];
    const isEditing = editingCell === column.field;

    // Handle checkbox as part of column content (not separate column)
    if (column.useSelection) {
      return (
        <div
          key={String(column.field)}
          className={cn(
            "px-4 py-2.5 border-b border-gray-200 flex items-center justify-start gap-3 min-h-[44px]",
            "transition-all duration-200 ease-in-out",
            isPinned && "bg-white sticky z-20",
            column.pinned === 'left' && "left-0 border-r shadow-lg",
            column.pinned === 'right' && "right-0 border-l shadow-lg"
          )}
          style={{
            minWidth: column.minWidth || 180,
            maxWidth: column.maxWidth,
            width: column.width,
          }}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={() => {
              onRowSelect(row);
            }}
            className={cn(
              "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600",
              "transition-all duration-150 ease-in-out",
              "hover:scale-110 focus:scale-110"
            )}
          />
          <span className="flex-1">
            {column.cellRenderer ? column.cellRenderer(value, row) : value}
          </span>
        </div>
      );
    }

    return (
      <div
        key={String(column.field)}
        className={cn(
          "px-4 py-2.5 border-b border-gray-200 flex items-center justify-start min-h-[44px]",
          "transition-all duration-200 ease-in-out",
          isPinned && "bg-white sticky z-20",
          column.pinned === 'left' && "left-0 border-r shadow-lg",
          column.pinned === 'right' && "right-0 border-l shadow-lg",
          column.editable && "cursor-pointer hover:bg-gray-50 hover:scale-[1.02]",
          editingCell === column.field && "bg-blue-50 ring-2 ring-indigo-500 ring-inset"
        )}
        style={{
          minWidth: column.minWidth,
          maxWidth: column.maxWidth,
          width: column.width,
        }}
        onDoubleClick={() => handleCellDoubleClick(column)}
      >
        {isEditing ? (
          <DataTableEditableCell
            value={value}
            row={row}
            column={column}
            onSave={(newValue) => handleCellSave(column.field, newValue)}
            onCancel={handleCellCancel}
          />
        ) : (
          column.cellRenderer ? column.cellRenderer(value, row) : value
        )}
      </div>
    );
  };

  // Generate grid columns template based on column widths
  const generateGridColumns = () => {
    const allColumns = [...pinnedLeftColumns, ...unpinnedColumns, ...pinnedRightColumns];
    return allColumns.map((column, index) => {
      // First column should expand to fill available space
      if (index === 0) {
        return 'minmax(200px, 1fr)';
      }
      const width = column.width || column.minWidth || (column.filterable ? 180 : 120);
      return `${width}px`;
    }).join(' ');
  };

  return (
    <div 
      className={cn(
        'group relative border-b border-gray-200 dark:border-gray-700 grid',
        'transition-all duration-200 ease-in-out',
        'hover:bg-gray-50 dark:hover:bg-gray-800/50',
        isSelected && 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-sm transform scale-[1.001]',
        'hover:shadow-md hover:z-10'
      )}
      style={{
        gridTemplateColumns: generateGridColumns(),
        minWidth: 'fit-content'
      }}
      onClick={() => onRowSelect(row)}
    >
      {pinnedLeftColumns.map(column => renderCell(column, true))}
      {unpinnedColumns.map(column => renderCell(column, false))}
      {pinnedRightColumns.map(column => renderCell(column, true))}
    </div>
  );
}
