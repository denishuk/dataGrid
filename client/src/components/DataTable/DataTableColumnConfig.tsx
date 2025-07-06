import React from 'react';
import { Button } from '@/components/ui/button';
import { GripVertical, Pin, Eye, EyeOff, X } from 'lucide-react';
import { DataTableColumn } from './types';
import { cn } from '@/lib/utils';

interface DataTableColumnConfigProps<T> {
  columns: DataTableColumn<T>[];
  onColumnChange: (columns: DataTableColumn<T>[]) => void;
}

export function DataTableColumnConfig<T>({ columns, onColumnChange }: DataTableColumnConfigProps<T>) {
  const handleTogglePin = (field: keyof T, pinPosition: 'left' | 'right' | null) => {
    const updatedColumns = columns.map(col => 
      col.field === field 
        ? { ...col, pinned: col.pinned === pinPosition ? null : pinPosition }
        : col
    );
    onColumnChange(updatedColumns);
  };

  const handleToggleVisibility = (field: keyof T) => {
    const updatedColumns = columns.map(col => 
      col.field === field 
        ? { ...col, hidden: !col.hidden }
        : col
    );
    onColumnChange(updatedColumns);
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const updatedColumns = [...columns];
    const [removed] = updatedColumns.splice(fromIndex, 1);
    updatedColumns.splice(toIndex, 0, removed);
    onColumnChange(updatedColumns);
  };

  const resetToDefault = () => {
    const defaultColumns = columns.map(col => ({
      ...col,
      pinned: null,
      hidden: false
    }));
    onColumnChange(defaultColumns);
  };

  return (
    <div className="p-4 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">Column Configuration</h3>
        <Button variant="ghost" size="sm" onClick={resetToDefault}>
          Reset to Default
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {columns.map((column, index) => (
          <div
            key={String(column.field)}
            className={cn(
              "flex items-center gap-2 px-3 py-1 border rounded-lg text-sm",
              column.pinned
                ? "bg-primary-50 border-primary-200"
                : "bg-white border-gray-300",
              column.hidden && "opacity-50"
            )}
          >
            <GripVertical className="h-3 w-3 text-gray-400 cursor-move" />
            <span className={cn(column.hidden && "line-through")}>
              {column.header}
            </span>
            
            {column.pinned && (
              <Pin className="h-3 w-3 text-primary-500" />
            )}
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-4 w-4"
                onClick={() => handleTogglePin(column.field, 'left')}
                title="Pin Left"
              >
                <Pin className="h-3 w-3" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-4 w-4"
                onClick={() => handleToggleVisibility(column.field)}
                title={column.hidden ? "Show Column" : "Hide Column"}
              >
                {column.hidden ? (
                  <EyeOff className="h-3 w-3" />
                ) : (
                  <Eye className="h-3 w-3" />
                )}
              </Button>
              
              {column.pinned && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-4 w-4"
                  onClick={() => handleTogglePin(column.field, null)}
                  title="Unpin"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
