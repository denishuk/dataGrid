import React, { useState } from 'react';
import { Edit, Trash2, MoreHorizontal, Eye, UserPlus } from 'lucide-react';
import { Button, Checkbox, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/headless-ui';
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
          "px-4 py-3 border-b border-gray-200",
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

  // Check if checkbox should be pinned based on first data column
  const firstDataColumn = visibleColumns[0];
  const checkboxShouldBeLeft = firstDataColumn?.pinned === 'left';

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {showSelection && !checkboxShouldBeLeft && (
        <td className="w-12 px-3 py-3 text-center border-b border-gray-200">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onRowSelect(row)}
          />
        </td>
      )}
      {pinnedLeftColumns.flatMap((column, index) => {
        const cells = [];
        
        // Render checkbox with first pinned left column
        if (showSelection && checkboxShouldBeLeft && index === 0) {
          cells.push(
            <td key={`checkbox-${String(column.field)}`} className={cn(
              "w-12 px-3 py-3 text-center bg-white/80 backdrop-blur-sm border-b border-gray-200",
              "sticky left-0 z-10"
            )}>
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onRowSelect(row)}
              />
            </td>
          );
        }
        
        cells.push(renderCell(column, true));
        return cells;
      })}
      {unpinnedColumns.map(column => renderCell(column))}
      {pinnedRightColumns.map(column => renderCell(column, true))}
    </tr>
  );
}
