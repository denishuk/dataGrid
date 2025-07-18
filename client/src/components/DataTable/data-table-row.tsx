import { useState } from 'react';

import { DataTableColumn } from './types';
import { DataTableEditableCell } from './data-table-editable-cell';
import { cn } from '@/lib/utils';
import { DEFAULT_ROW_HEIGHT, INDENT_SIZE } from '@/components/DataTable/constants.ts';

interface DataTableRowProps<T> {
  row: T;
  level?: number;
  columns: DataTableColumn<T>[];
  isSelected: boolean;
  onRowSelect: (row: T) => void;
  onRowEdit?: (row: T) => void;
  onRowDelete?: (row: T) => void;
  onCellEdit?: (row: T, field: keyof T, value: any) => void;
}

export function DataTableRow<T extends Record<string, any>>({
  row,
  level,
  columns,
  isSelected,
  onRowSelect,
  // onRowEdit,
  // onRowDelete,
  onCellEdit,
}: DataTableRowProps<T>) {
  const [editingCell, setEditingCell] = useState<keyof T | null>(null);

  const visibleColumns = columns.filter(col => !col.hidden);
  const firstColumn = visibleColumns[0];
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
    const isFirstColumn = firstColumn.field === column.field;

    // Handle checkbox as part of column content (not separate column)
    if (column.useSelection) {
      return (
        <div
          key={String(column.field)}
          className={cn(
            `min-h-[${DEFAULT_ROW_HEIGHT}px]`,
            "px-4 py-2 flex items-center justify-start gap-3",
            "transition-all duration-200 ease-in-out",
            isPinned && "bg-white z-10 sticky border-gray-800/10 overflow-x-hidden",
            column.pinned === 'left' && "left-0 border-r",
            column.pinned === 'right' && "right-0 border-l"
          )}
          style={{
            paddingLeft: isFirstColumn && level ? `${level * INDENT_SIZE}px` : undefined,
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
            )}
          />
          <span className={cn("flex-1", isPinned ? "truncate" : "")}>
            {column.cellRenderer ? column.cellRenderer(value, row) : value}
          </span>
        </div>
      );
    }

    return (
      <div
        key={String(column.field)}
        className={cn(
          `min-h-[${DEFAULT_ROW_HEIGHT}px]`,
          "px-4 py-2 flex items-center justify-start",
          "transition-all duration-200 ease-in-out",
          isPinned && "bg-white sticky z-10 border-gray-800/10",
          column.pinned === 'left' && "left-0 border-r",
          column.pinned === 'right' && "right-0 border-l",
          column.editable && "cursor-pointer hover:bg-gray-50 hover:scale-[1.02]",
          editingCell === column.field && "bg-blue-50 ring-2 ring-indigo-500 ring-inset"
        )}
        style={{
          paddingLeft: isFirstColumn && level ? `${level * INDENT_SIZE}px` : undefined,
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
        'group relative grid',
        'transition-all duration-200 ease-in-out',
        isSelected && '*:bg-blue-50  transform',
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
