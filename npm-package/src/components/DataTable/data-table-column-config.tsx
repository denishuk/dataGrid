import React, { useState, useRef } from 'react';
import { Eye, EyeOff, GripVertical, Pin, PinOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { DataTableColumn } from './types';
import { cn } from '@/lib/utils';

interface DataTableColumnConfigProps<T> {
  columns: DataTableColumn<T>[];
  onColumnChange: (columns: DataTableColumn<T>[]) => void;
}

export function DataTableColumnConfig<T>({ columns, onColumnChange }: DataTableColumnConfigProps<T>) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (index: number) => (e: React.DragEvent) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
  };

  const handleDragOver = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOverIndex(index);
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null && draggedOverIndex !== null && draggedIndex !== draggedOverIndex) {
      const newColumns = Array.from(columns);
      const [reorderedColumn] = newColumns.splice(draggedIndex, 1);
      newColumns.splice(draggedOverIndex, 0, reorderedColumn);
      onColumnChange(newColumns);
    }

    setDraggedIndex(null);
    setDraggedOverIndex(null);
  };

  const handleDragLeave = () => {
    setDraggedOverIndex(null);
  };

  const toggleVisibility = (index: number) => {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], hidden: !newColumns[index].hidden };
    onColumnChange(newColumns);
  };

  const togglePin = (index: number, side: 'left' | 'right' | null) => {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], pinned: side };
    onColumnChange(newColumns);
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        Drag and drop to reorder columns. Use the controls to show/hide and pin columns.
      </div>

      <div className="space-y-2">
        {columns.map((column, index) => (
          <div
            key={String(column.field)}
            draggable
            onDragStart={handleDragStart(index)}
            onDragOver={handleDragOver(index)}
            onDragEnd={handleDragEnd}
            onDragLeave={handleDragLeave}
            className={cn(
              "flex items-center gap-3 p-3 bg-white ring-1 ring-gray-900/15 rounded-lg transition-all duration-200",
              draggedIndex === index && "opacity-50 scale-95",
              draggedOverIndex === index && draggedIndex !== index && "border-blue-300 bg-blue-50 transform translate-y-1",
              column.hidden && "opacity-50"
            )}
          >
            <div className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded cursor-grab active:cursor-grabbing">
              <GripVertical className="h-4 w-4" />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{column.header}</span>
                {column.pinned && (
                  <Badge variant="secondary" className="text-xs">
                    Pinned {column.pinned}
                  </Badge>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Field: {String(column.field)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Pin Controls */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePin(index, column.pinned === 'left' ? null : 'left')}
                  className={cn(
                    "h-8 w-8 p-0",
                    column.pinned === 'left' && "bg-blue-100 text-blue-600"
                  )}
                  title="Pin Left"
                >
                  <Pin className="h-3 w-3 rotate-[-90deg]" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePin(index, column.pinned === 'right' ? null : 'right')}
                  className={cn(
                    "h-8 w-8 p-0",
                    column.pinned === 'right' && "bg-blue-100 text-blue-600"
                  )}
                  title="Pin Right"
                >
                  <Pin className="h-3 w-3 rotate-90" />
                </Button>
              </div>

              {/* Visibility Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleVisibility(index)}
                className="h-8 w-8 p-0"
                title={column.hidden ? "Show Column" : "Hide Column"}
              >
                {column.hidden ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}