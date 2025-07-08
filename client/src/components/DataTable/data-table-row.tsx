import React, { useState } from 'react';

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
  showSelection,
  onRowSelect,
  onRowEdit,
  onRowDelete,
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

    // Handle checkbox selection column
    if (column.useSelection) {
      return (
        <td
          key={String(column.field)}
          className={cn(
            "px-4 py-2.5 text-center border-b border-gray-200",
            isPinned && "bg-white sticky z-10",
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
              checked={isSelected}
              onChange={() => onRowSelect(row)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
        </td>
      );
    }

    return (
      <td
        key={String(column.field)}
        className={cn(
          "px-4 py-2.5 border-b border-gray-200",
          isPinned && "bg-white sticky z-10",
          column.pinned === 'left' && "left-0 border-r",
          column.pinned === 'right' && "right-0 border-l",
          column.editable && "cursor-pointer hover:bg-gray-50"
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
      </td>
    );
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {pinnedLeftColumns.map(column => renderCell(column, true))}
      {unpinnedColumns.map(column => renderCell(column))}
      {pinnedRightColumns.map(column => renderCell(column, true))}
    </tr>
  );
}
