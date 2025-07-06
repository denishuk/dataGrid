import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumn } from './types';
import { DataTableEditableCell } from './data-table-editable-cell';
import { cn } from '@/lib/utils';

interface DataTableRowProps<T> {
  row: T;
  columns: DataTableColumn<T>[];
  isSelected: boolean;
  showSelection: boolean;
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
    const value = row[column.field];
    const isEditing = editingCell === column.field;

    return (
      <td
        key={String(column.field)}
        className={cn(
          "px-4 py-3",
          isPinned && "sticky z-10 bg-white/95 backdrop-blur-sm",
          column.pinned === 'left' && "left-0 border-r border-gray-300 shadow-lg",
          column.pinned === 'right' && "right-0 border-l border-gray-300 shadow-lg",
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
